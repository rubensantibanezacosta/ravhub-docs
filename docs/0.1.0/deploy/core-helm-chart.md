---
title: Core · Helm Chart
description: Guía para desplegar RavHub Core en Kubernetes con Helm, persistencia, ingress y valores recomendados.
---

<DocHeader
  icon="charts"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core · Helm Chart"
  lead="Despliegue de RavHub Core con Helm"
/>

## Cuándo elegir esta opción

Usa esta guía si ya operas sobre Kubernetes y quieres gestionar RavHub con `Helm`.

## Prerrequisitos

- cluster Kubernetes disponible
- Helm operativo
- una `StorageClass` o PVC compatible
- credenciales de pull para `registry.ravhub.app` si tu registro las requiere

## Imagen y selección de edición

- registro: `registry.ravhub.app`
- edición Core: `ravhub-core`
- tag recomendado en esta guía: `0.1.0`
- edición Core por chart: `license.enabled=false`

## Pasos exactos

### 1. Crear el namespace

```bash
kubectl create namespace ravhub
```

### 2. Crear el secret de pull si lo necesitas

```bash
kubectl create secret docker-registry ravhub-registry \
  --namespace ravhub \
  --docker-server=registry.ravhub.app \
  --docker-username=YOUR_USER \
  --docker-password=YOUR_PASSWORD
```

### 3. Preparar un fichero de values

```yaml
replicaCount: 1

image:
  registry: registry.ravhub.app
  repository: ravhub-core
  enterpriseRepository: ravhub-enterprise
  pullPolicy: IfNotPresent
  tag: 0.1.0

imagePullSecrets:
  - name: ravhub-registry

service:
  type: ClusterIP
  port: 80
  targetPort: 80
  apiPort: 3000
  annotations: {}

auth:
  jwt:
    secret: change-this-jwt-secret
    expiresIn: 1h
    refreshExpiresIn: 7d

license:
  enabled: false
  key: ""

docker:
  ports:
    enabled: true
    startPort: 5001
    endPort: 5100

ingress:
  enabled: true
  className: nginx
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: "0"
    nginx.ingress.kubernetes.io/proxy-request-buffering: "off"
    nginx.ingress.kubernetes.io/proxy-buffering: "off"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  hosts:
    - host: packages.example.com
      paths:
        - path: /api(/|$)(.*)
          pathType: ImplementationSpecific
        - path: /()(.*)
          pathType: ImplementationSpecific
  tls: []

persistence:
  enabled: true
  storageClass: ""
  accessMode: ReadWriteOnce
  size: 50Gi
  mountPath: /data/storage

storage:
  type: filesystem
  filesystem:
    path: /data/storage
  s3:
    bucket: ""
    region: us-east-1
    accessKey: ""
    secretKey: ""
  gcs:
    bucket: ""
    projectId: ""
  azure:
    container: ""
    connectionString: ""

postgresql:
  enabled: true
  primary:
    persistence:
      enabled: true
      size: 8Gi
  auth:
    username: postgres
    password: change-this-db-password
    database: ravhub

externalDatabase:
  host: ""
  port: 5432
  user: postgres
  database: ravhub
  password: ""
  existingSecret: ""

redis:
  enabled: false
  architecture: standalone
  auth:
    enabled: true
    password: ""
  master:
    persistence:
      enabled: false
      size: 1Gi

externalRedis:
  host: ""
  port: 6379
  password: ""
  db: 0
  existingSecret: ""

env:
  LOG_FORMAT: json

resources:
  limits:
    cpu: 2000m
    memory: 2Gi
  requests:
    cpu: 500m
    memory: 1Gi

serviceAccount:
  create: true
  annotations: {}
  name: ""

podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"
  prometheus.io/path: "/metrics"

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}
```

### 3.1 Qué puedes dejar tal cual

- `license.enabled=false`
- `storage.type=filesystem`
- `postgresql.enabled=true`
- `redis.enabled=false`
- `service.type=ClusterIP`

### 3.2 Qué deberías revisar siempre

- `image.tag`
- `imagePullSecrets`
- `auth.jwt.secret`
- `ingress.hosts`
- `persistence.size`
- `resources`

### 4. Instalar el release

```bash
helm install ravhub ./ravhub-charts/ravhub \
  --namespace ravhub \
  -f values-core.yaml
```

### 5. Verificar el despliegue

```bash
helm ls -n ravhub
kubectl get pods -n ravhub
kubectl get ingress -n ravhub
```

## Tabla de values

### Edición e imagen

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `replicaCount` | integer | `1` | `1+` | Número de pods. Si subes de `1`, usa Redis y storage compartido. |
| `image.registry` | string | `registry.ravhub.app` | registry OCI | Registry de las imágenes RavHub. |
| `image.repository` | string | `ravhub-core` | nombre de repo | Imagen usada cuando `license.enabled=false`. |
| `image.enterpriseRepository` | string | `ravhub-enterprise` | nombre de repo | Reservado para Enterprise. En Core no se usa. |
| `image.pullPolicy` | string | `IfNotPresent` | `IfNotPresent`, `Always`, `Never` | Política de pull de Kubernetes. |
| `image.tag` | string | `latest` | tag OCI | Versión exacta a desplegar. Recomendable fijarla. |
| `imagePullSecrets` | array | `[]` | lista de secrets | Secrets de pull para `registry.ravhub.app`. |
| `license.enabled` | boolean | `false` | `true`, `false` | Debe quedarse en `false` para Core. |
| `license.key` | string | `""` | clave de licencia | No se usa en Core. |

### Service e ingress

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `service.type` | string | `ClusterIP` | `ClusterIP`, `NodePort`, `LoadBalancer` | Tipo de Service principal. |
| `service.port` | integer | `80` | puerto TCP | Puerto HTTP del Service. |
| `service.targetPort` | integer | `80` | puerto TCP | Puerto HTTP del contenedor al que apunta el Service. |
| `service.apiPort` | integer | `3000` | puerto TCP | Puerto de la API interna expuesto por el Service. |
| `service.annotations` | map | `{}` | annotations de Service | Útil para LB cloud o integración con red. |
| `ingress.enabled` | boolean | `true` | `true`, `false` | Activa o desactiva el Ingress. |
| `ingress.className` | string | `nginx` | clase de ingress | Clase de Ingress Controller. |
| `ingress.annotations` | map | varias de NGINX | annotations | Incluye por defecto `proxy-body-size: 0` y ajustes para uploads. |
| `ingress.hosts` | array | `ravhub.local` | lista de hosts/path rules | Host y paths públicos de la UI y API. |
| `ingress.hosts[].paths[].path` | string | `/api(/|$)(.*)` y `/()(.*)` | path regex | Rutas expuestas por el Ingress. |
| `ingress.hosts[].paths[].pathType` | string | `ImplementationSpecific` | `ImplementationSpecific`, `Prefix`, `Exact` | Tipo de path en Kubernetes. |
| `ingress.tls` | array | `[]` | lista de `secretName` y `hosts` | Entradas TLS del Ingress. Si está vacío, no se publica TLS desde el chart. |

### JWT y autenticación

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `auth.jwt.secret` | string | `""` | texto | Si lo dejas vacío, el chart genera uno y lo conserva en el secret del release. |
| `auth.jwt.expiresIn` | string | `1h` | duración JWT | Caducidad del access token. |
| `auth.jwt.refreshExpiresIn` | string | `7d` | duración JWT | Caducidad del refresh token. |

### Docker registry embebido

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `docker.ports.enabled` | boolean | `true` | `true`, `false` | Expone el rango dinámico para repos Docker. |
| `docker.ports.startPort` | integer | `5001` | puerto TCP | Inicio del rango Docker. |
| `docker.ports.endPort` | integer | `5100` | puerto TCP | Fin del rango Docker. |

### Persistencia y storage

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `persistence.enabled` | boolean | `true` | `true`, `false` | Activa el PVC de artefactos. |
| `persistence.storageClass` | string | `""` | nombre de class | Si se deja vacío, Kubernetes usa la default. |
| `persistence.accessMode` | string | `ReadWriteOnce` | `ReadWriteOnce`, `ReadWriteMany`, etc. | Modo de acceso del PVC. |
| `persistence.size` | string | `50Gi` | tamaño Kubernetes | Tamaño del volumen de artefactos. |
| `persistence.mountPath` | string | `/data/storage` | ruta absoluta | Mount path que RavHub usa como `STORAGE_PATH`. |
| `storage.type` | string | `filesystem` | `filesystem`, `s3`, `gcs`, `azure` | En Core debe quedarse en `filesystem`. |
| `storage.filesystem.path` | string | `/data/storage` | ruta absoluta | Ruta lógica del backend filesystem. |
| `storage.s3.*` | object | vacíos | valores S3 | No válido en Core; requiere Enterprise. |
| `storage.gcs.*` | object | vacíos | valores GCS | No válido en Core; requiere Enterprise. |
| `storage.azure.*` | object | vacíos | valores Azure | No válido en Core; requiere Enterprise. |

### PostgreSQL

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `postgresql.enabled` | boolean | `true` | `true`, `false` | Despliega PostgreSQL integrado con subchart Bitnami. |
| `postgresql.primary.persistence.enabled` | boolean | `true` | `true`, `false` | Persistencia del PostgreSQL embebido. |
| `postgresql.primary.persistence.size` | string | `8Gi` | tamaño Kubernetes | Tamaño del volumen del PostgreSQL embebido. |
| `postgresql.auth.username` | string | `postgres` | texto | Usuario del PostgreSQL embebido. |
| `postgresql.auth.database` | string | `ravhub` | texto | Base de datos del PostgreSQL embebido. |
| `postgresql.auth.password` | string | `""` | texto | Si lo dejas vacío, el subchart o secret resuelve el valor. |
| `externalDatabase.host` | string | `""` | hostname | Obligatorio cuando `postgresql.enabled=false`. |
| `externalDatabase.port` | integer | `5432` | puerto TCP | Puerto del PostgreSQL externo. |
| `externalDatabase.user` | string | `postgres` | texto | Usuario del PostgreSQL externo. |
| `externalDatabase.database` | string | `ravhub` | texto | Base de datos del PostgreSQL externo. |
| `externalDatabase.password` | string | `""` | texto | Obligatorio si no usas `existingSecret`. |
| `externalDatabase.existingSecret` | string | `""` | nombre de secret | Si lo defines, el chart lee la clave `password`. |

### Redis

| Campo | Tipo | Default | Opciones | Uso |
| --- | --- | --- | --- | --- |
| `redis.enabled` | boolean | `false` | `true`, `false` | Despliega Redis embebido. |
