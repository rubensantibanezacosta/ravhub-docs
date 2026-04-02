---
title: Uso desde clientes
description: Cómo consumir y publicar artefactos en RavHub desde npm, pnpm, Maven, pip, Docker, Helm y otros clientes.
---

<DocHeader
  icon="pointer"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Uso desde clientes"
  lead="Qué hacer después de instalar RavHub y cómo consumirlo desde herramientas reales, usando las URLs que verán tus usuarios finales."
/>

## Regla base

Antes de usar cualquier cliente, identifica estos dos datos:

- `BASE_URL`: por ejemplo `https://packages.example.com`
- `REPO`: el nombre del repositorio en RavHub, por ejemplo `npm-hosted`

Muchos clientes parten de este patrón:

`BASE_URL/repository/REPO`

Después, algunos ecosistemas añaden un sufijo específico como `/simple`, `/index.json`, `/index` o un puerto Docker dedicado.

Si el repositorio es privado, usa las credenciales de acceso que te entregue RavHub.

## Login y acceso a repos privados

No todos los clientes hacen login igual. Algunos usan un comando de login y otros esperan credenciales guardadas en un fichero de configuración.

- `npm` / `pnpm`: puedes usar `npm login --registry BASE_URL/repository/REPO` o dejar las credenciales en `.npmrc`.
- Maven / Gradle: normalmente no hay login interactivo; las credenciales se guardan en `settings.xml`, `gradle.properties` o en la configuración del repositorio.
- `pip` / `twine`: `pip` suele usar configuración persistida y `twine` pide credenciales al publicar o las toma de `.pypirc`.
- NuGet: suele registrarse el feed con credenciales usando `dotnet nuget add source` o el gestor de sources de NuGet.
- Composer: no suele haber login interactivo; lo normal es guardar `http-basic` en la configuración de Composer.
- Cargo: normalmente usa configuración persistida del registry; no suele trabajar con un login interactivo clásico.
- Docker: usa `docker login HOST_PUBLICO:PUERTO_ASIGNADO`.
- Helm: si el repositorio está protegido, añade el repo con `--username` y `--password`.

## NPM / pnpm

URL base del registry:

`BASE_URL/repository/REPO`

Instalar:

```bash
npm install my-package@1.0.0 --registry BASE_URL/repository/REPO
pnpm add my-package@1.0.0 --registry BASE_URL/repository/REPO
```

Publicar:

```bash
npm publish --registry BASE_URL/repository/REPO
pnpm publish --registry BASE_URL/repository/REPO
```

Configuración persistente:

```ini
registry=BASE_URL/repository/REPO
always-auth=true
```

Login si el repositorio es privado:

```bash
npm login --registry BASE_URL/repository/REPO
pnpm login --registry BASE_URL/repository/REPO
```

## Maven / Gradle

URL del repositorio:

`BASE_URL/repository/REPO/`

Maven `pom.xml`:

```xml
<repositories>
  <repository>
    <id>ravhub</id>
    <url>BASE_URL/repository/REPO/</url>
  </repository>
</repositories>
```

Gradle Kotlin DSL:

```kotlin
repositories {
  maven("BASE_URL/repository/REPO/")
}
```

Acceso privado:

- Maven suele guardar usuario y contraseña en `settings.xml`
- Gradle suele usar `credentials {}` o propiedades externas

## PyPI / pip / twine

URLs típicas:

- instalación: `BASE_URL/repository/REPO/simple`
- subida: `BASE_URL/repository/REPO/`

Instalar:

```bash
pip install requests==2.32.0 --index-url BASE_URL/repository/REPO/simple
```

Publicar:

```bash
twine upload --repository-url BASE_URL/repository/REPO/ dist/*
```

Configuración `pip.conf`:

```ini
[global]
index-url = BASE_URL/repository/REPO/simple
```

Configuración típica para publicar:

```ini
[distutils]
index-servers = ravhub

[ravhub]
repository = BASE_URL/repository/REPO/
username = YOUR_USERNAME
password = YOUR_PASSWORD
```

## NuGet

URL del feed:

`BASE_URL/repository/REPO/index.json`

Registrar source:

```bash
dotnet nuget add source BASE_URL/repository/REPO/index.json --name ravhub
```

Registrar source con credenciales:

```bash
dotnet nuget add source BASE_URL/repository/REPO/index.json --name ravhub --username YOUR_USERNAME --password YOUR_PASSWORD --store-password-in-clear-text
```

Instalar paquete:

```bash
dotnet add package Newtonsoft.Json --version 13.0.3 --source ravhub
nuget install Newtonsoft.Json -Source BASE_URL/repository/REPO/index.json
```

## Composer

URL del repositorio:

`BASE_URL/repository/REPO`

Configurar e instalar:

```bash
composer config repositories."REPO" composer BASE_URL/repository/REPO
composer config --auth http-basic.HOST_PUBLICO YOUR_USERNAME YOUR_PASSWORD
composer require vendor/package:1.2.3
```

## Cargo

URL del índice:

`sparse+BASE_URL/repository/REPO/index`

Configurar `.cargo/config.toml`:

```toml
[registries.REPO]
index = "sparse+BASE_URL/repository/REPO/index"
```

Instalar:

```bash
cargo add serde@1.0.0 --registry REPO
```

## Docker

Docker no usa `BASE_URL/repository/REPO`. Usa el host público y el puerto que tenga asignado el repositorio.

Patrón:

`HOST_PUBLICO:PUERTO_ASIGNADO/IMAGEN:TAG`

Ejemplo:

```bash
docker login packages.example.com:5001 -u YOUR_USERNAME
docker pull packages.example.com:5001/nginx:latest
docker tag myapp:latest packages.example.com:5001/myapp:1.0.0
docker push packages.example.com:5001/myapp:1.0.0
```

## Helm

URL del repositorio Helm:

`BASE_URL/repository/REPO`

Consumir charts:

```bash
helm repo add REPO BASE_URL/repository/REPO
helm repo update
helm install my-release REPO/my-chart --version 1.0.0
```

Si el repo Helm es privado:

```bash
helm repo add REPO BASE_URL/repository/REPO --username YOUR_USERNAME --password YOUR_PASSWORD
helm repo update
```

## Cómo validar que funciona

La validación mínima siempre es esta:

- el cliente resuelve la URL
- el cliente autentica si corresponde
- puedes instalar o publicar al menos un artefacto
- el artefacto aparece en la UI de RavHub

## Errores frecuentes

### El cliente apunta a una URL incorrecta

Revisa `BASE_URL`, el dominio publicado o el puerto asignado al repositorio Docker.

### El repositorio existe, pero el comando falla

Revisa permisos, autenticación y tipo de repositorio.

### El paquete aparece en la UI, pero el cliente no lo consume

Revisa la URL exacta del repositorio y el formato que espera ese ecosistema: `/simple`, `/index.json`, `/index` o puerto Docker dedicado.

## Siguiente paso

Si aún no has desplegado RavHub, vuelve a [Core vs Enterprise](../product/core-vs-enterprise) y elige la guía de despliegue que corresponda.
