---
title: Core · Helm Chart
description: Deploy RavHub Core on Kubernetes with Helm, persistence, ingress, and recommended values.
---

<DocHeader
  icon="charts"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core · Helm Chart"
  lead="Deploy RavHub Core with Helm"
/>

## When to choose this path

Use this guide if you already operate on Kubernetes and want to manage RavHub with `Helm`.

## Prerequisites

- a working Kubernetes cluster
- Helm available
- a compatible `StorageClass` or PVC strategy
- image pull credentials for `registry.ravhub.app` if your registry requires them

## Image and edition selection

- registry: `registry.ravhub.app`
- Core repository: `ravhub-core`
- recommended tag: `0.1.0`
- Core mode in the chart: `license.enabled=false`

## Exact steps

### 1. Create the namespace

```bash
kubectl create namespace ravhub
```

### 2. Create the pull secret if needed

```bash
kubectl create secret docker-registry ravhub-registry \
  --namespace ravhub \
  --docker-server=registry.ravhub.app \
  --docker-username=YOUR_USER \
  --docker-password=YOUR_PASSWORD
```

### 3. Prepare a values file

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

postgresql:
  enabled: true
  auth:
    username: postgres
    password: change-this-db-password
    database: ravhub

redis:
  enabled: false

env:
  LOG_FORMAT: json
```

### 4. Install the release

```bash
helm install ravhub ./ravhub-charts/ravhub \
  --namespace ravhub \
  -f values-core.yaml
```

### 5. Verify the deployment

```bash
helm ls -n ravhub
kubectl get pods -n ravhub
kubectl get ingress -n ravhub
```

## Key values to review

### Image and license

| Field | Typical value | Why it matters |
| --- | --- | --- |
| `image.tag` | `0.1.0` | Pins the exact release you deploy. |
| `imagePullSecrets` | `ravhub-registry` | Required when the registry is protected. |
| `license.enabled` | `false` | Keeps the release in Core mode. |

### Access and ingress

| Field | Typical value | Why it matters |
| --- | --- | --- |
| `service.type` | `ClusterIP` | Common default behind an ingress controller. |
| `ingress.enabled` | `true` | Publishes the web entry point. |
| `ingress.hosts` | `packages.example.com` | Defines the public host clients will use. |
| `ingress.tls` | configured or empty | Controls TLS at ingress level. |

### Storage and database

| Field | Typical value | Why it matters |
| --- | --- | --- |
| `storage.type` | `filesystem` | Core must stay on `filesystem`. |
| `persistence.size` | `50Gi` | Defines artifact storage capacity. |
| `postgresql.enabled` | `true` | Starts the embedded PostgreSQL subchart. |
| `redis.enabled` | `false` | Fine for a single replica baseline deployment. |

## Rules and dependencies

- `license.enabled=false` keeps the release in Core mode.
- If `postgresql.enabled=false`, you must provide external database settings.
- If `storage.type` is not `filesystem`, the deployment no longer matches Core.
- If you increase `replicaCount` above `1`, shared storage and Redis become strongly recommended.

## How to validate it

- all pods are `Running` or `Completed`
- the ingress exposes the expected host
- the UI opens on the configured domain
- the instance starts as Core, not Enterprise

## Common issues

### The chart installs but the UI does not open

Check `ingress.enabled`, `ingress.className`, and `ingress.hosts`.

### Pods restart because of authentication problems

Check `auth.jwt.secret`.

### The PVC does not bind

Check `persistence.size`, `persistence.storageClass`, and cluster storage support.

### The release behaves like Enterprise

Check that `license.enabled` is still `false`.

## Next step

Continue with [Client usage](../clients/usage).
