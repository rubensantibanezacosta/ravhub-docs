---
title: Core · Bare Docker
description: Guía para desplegar RavHub Core con Docker, PostgreSQL y almacenamiento filesystem usando la imagen publicada.
---

<DocHeader
  icon="operation"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core · Bare Docker"
  lead="Despliegue de RavHub Core con Docker"
/>

## Cuándo elegir esta opción

Usa esta guía si quieres una instalación simple sobre Docker, fuera de Kubernetes.

## Prerrequisitos

- Docker disponible en el host
- acceso a `registry.ravhub.app`
- PostgreSQL accesible desde el contenedor de RavHub
- persistencia para artefactos si vas a usar almacenamiento local

## Imagen que debes usar

- `docker pull registry.ravhub.app/ravhub-core:0.1.0`

## Variables de entorno

### Frontend

| Variable | Obligatoria | Opciones | Para qué sirve |
| --- | --- | --- | --- |
| `FRONTEND_PORT` | Opcional | entero, por defecto `80` | Puerto interno del frontend servido por la imagen. |

### Base de datos

| Variable | Obligatoria | Opciones | Para qué sirve |
| --- | --- | --- | --- |
| `POSTGRES_HOST` | Sí | hostname o IP | Host del servidor PostgreSQL. |
| `POSTGRES_PORT` | Sí | entero, normalmente `5432` | Puerto de PostgreSQL. |
| `POSTGRES_USER` | Sí | texto | Usuario con permisos sobre la base de datos de RavHub. |
| `POSTGRES_PASSWORD` | Sí | texto | Contraseña del usuario de PostgreSQL. |
| `POSTGRES_DB` | Sí | texto | Nombre de la base de datos de RavHub. |

### Almacenamiento

| Variable | Obligatoria | Opciones | Para qué sirve |
| --- | --- | --- | --- |
| `STORAGE_TYPE` | Sí | `filesystem` | Backend por defecto para artefactos. En Core debe ser `filesystem`. |
| `STORAGE_PATH` | Sí | ruta absoluta, por ejemplo `/data/storage` | Ruta persistente donde RavHub guarda artefactos locales. |

### Seguridad y logs

| Variable | Obligatoria | Opciones | Para qué sirve |
| --- | --- | --- | --- |
| `JWT_SECRET` | Sí | cadena larga y aleatoria | Se usa para firmar tokens. Si cambia, las sesiones existentes dejan de ser válidas. |
| `LOG_FORMAT` | Opcional | `json` o cualquier otro valor | Si vale `json`, los logs salen estructurados. Si no, usa logging estándar. |

### Configuración recomendada

- expón el puerto HTTP de la instancia y el rango Docker que vayan a consumir tus clientes
- publica un dominio y los puertos Docker que vayan a consumir tus clientes

## Pasos exactos

### 1. Crear una red Docker

```bash
docker network create ravhub
```

### 2. Levantar PostgreSQL

```bash
docker run -d \
  --name ravhub-postgres \
  --network ravhub \
  -e POSTGRES_USER=ravhub \
  -e POSTGRES_PASSWORD=change-this-password \
  -e POSTGRES_DB=ravhub \
  -v ravhub-postgres:/var/lib/postgresql/data \
  postgres:15-alpine
```

### 3. Descargar la imagen Core

```bash
docker pull registry.ravhub.app/ravhub-core:0.1.0
```

### 4. Arrancar RavHub Core

```bash
docker run -d \
  --name ravhub-core \
  --network ravhub \
  -p 8080:80 \
  -p 5001-5100:5001-5100 \
  -e FRONTEND_PORT=80 \
  -e STORAGE_TYPE=filesystem \
  -e STORAGE_PATH=/data/storage \
  -e POSTGRES_HOST=ravhub-postgres \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=ravhub \
  -e POSTGRES_PASSWORD=change-this-password \
  -e POSTGRES_DB=ravhub \
  -e JWT_SECRET=change-this-jwt-secret \
  -e LOG_FORMAT=json \
  -v ravhub-storage:/data/storage \
  registry.ravhub.app/ravhub-core:0.1.0
```

### 5. Alternativa recomendada con Docker Compose

`docker run` viene bien para validar rápido. Si quieres una definición repetible, usa `docker-compose.yml`.

```yaml
services:
  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ravhub
      POSTGRES_PASSWORD: change-this-password
      POSTGRES_DB: ravhub
    volumes:
      - ravhub-postgres:/var/lib/postgresql/data

  ravhub:
    image: registry.ravhub.app/ravhub-core:0.1.0
    restart: unless-stopped
    depends_on:
      - postgres
    ports:
      - "8080:80"
      - "5001-5100:5001-5100"
    environment:
      FRONTEND_PORT: 80
      STORAGE_TYPE: filesystem
      STORAGE_PATH: /data/storage
      POSTGRES_HOST: postgres
      POSTGRES_PORT: 5432
      POSTGRES_USER: ravhub
      POSTGRES_PASSWORD: change-this-password
      POSTGRES_DB: ravhub
      JWT_SECRET: change-this-jwt-secret
      LOG_FORMAT: json
    volumes:
      - ravhub-storage:/data/storage

volumes:
  ravhub-postgres:
  ravhub-storage:
```

Arranque:

```bash
docker compose up -d
```

### 6. Abrir la instancia

- UI: `http://localhost:8080`
- API: `http://localhost:8080/api`

## Persistencia

- PostgreSQL queda en el volumen `ravhub-postgres`
- los artefactos del backend `filesystem` quedan en `ravhub-storage`
- si eliminas el contenedor sin estos volúmenes, perderás el estado

## Ejemplo con fichero `.env`

Si prefieres separar secretos y configuración del `docker-compose.yml`, usa algo como esto:

```dotenv
POSTGRES_USER=ravhub
POSTGRES_PASSWORD=change-this-password
POSTGRES_DB=ravhub
JWT_SECRET=change-this-jwt-secret
```

## Configuración importante

### Backend de almacenamiento

En Core debes usar `STORAGE_TYPE=filesystem`. Los backends `s3`, `gcs` y `azure` son de Enterprise.

### Publicación de puertos

- `8080:80` expone la UI y el proxy HTTP
- `5001-5100:5001-5100` expone el rango para repos Docker

## Cómo validar que funciona

- `docker ps` muestra `ravhub-core` en estado `Up`
- `http://localhost:8080` carga la UI
- puedes iniciar sesión o completar el arranque inicial
- los endpoints y comandos Docker que ve el usuario usan el dominio y puertos publicados correctos

## Errores frecuentes

### La UI no abre

Revisa el mapeo `-p 8080:80` y que el contenedor no esté reiniciando por error de base de datos.

### El contenedor reinicia al arrancar

Revisa `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` y `JWT_SECRET`.

### Los comandos Docker que enseña RavHub apuntan a otro dominio

Revisa el dominio publicado, el proxy inverso y los puertos expuestos para Docker.

### Los artefactos desaparecen tras recrear el contenedor

Revisa que `ravhub-storage` esté montado sobre `/data/storage`.

## Siguiente paso

Continúa con [Uso desde clientes](../clients/usage).