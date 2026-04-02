---
title: Core · Bare Docker
description: Deploy RavHub Core with Docker, PostgreSQL, and filesystem storage using the published image.
---

<DocHeader
  icon="operation"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core · Bare Docker"
  lead="Deploy RavHub Core with Docker"
/>

## When to choose this path

Use this guide if you want a simple Docker-based installation outside Kubernetes.

## Prerequisites

- Docker available on the host
- access to `registry.ravhub.app`
- PostgreSQL reachable from the RavHub container
- persistent storage if you plan to keep local artifacts

## Image to use

- `docker pull registry.ravhub.app/ravhub-core:0.1.0`

## Environment variables

### Frontend

| Variable | Required | Options | Purpose |
| --- | --- | --- | --- |
| `FRONTEND_PORT` | Optional | integer, default `80` | Internal frontend port served by the image. |

### Database

| Variable | Required | Options | Purpose |
| --- | --- | --- | --- |
| `POSTGRES_HOST` | Yes | hostname or IP | PostgreSQL host. |
| `POSTGRES_PORT` | Yes | integer, usually `5432` | PostgreSQL port. |
| `POSTGRES_USER` | Yes | text | PostgreSQL user with access to the RavHub database. |
| `POSTGRES_PASSWORD` | Yes | text | PostgreSQL password. |
| `POSTGRES_DB` | Yes | text | RavHub database name. |

### Storage

| Variable | Required | Options | Purpose |
| --- | --- | --- | --- |
| `STORAGE_TYPE` | Yes | `filesystem` | Default artifact backend. Core must use `filesystem`. |
| `STORAGE_PATH` | Yes | absolute path such as `/data/storage` | Persistent path for local artifacts. |

### Security and logs

| Variable | Required | Options | Purpose |
| --- | --- | --- | --- |
| `JWT_SECRET` | Yes | long random string | Signs tokens and sessions. |
| `LOG_FORMAT` | Optional | `json` or any other value | Uses structured logs when set to `json`. |

## Exact steps

### 1. Create a Docker network

```bash
docker network create ravhub
```

### 2. Start PostgreSQL

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

### 3. Pull the Core image

```bash
docker pull registry.ravhub.app/ravhub-core:0.1.0
```

### 4. Start RavHub Core

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

### 5. Recommended Docker Compose alternative

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

Start it with:

```bash
docker compose up -d
```

### 6. Open the instance

- UI: `http://localhost:8080`
- API: `http://localhost:8080/api`

## Persistence

- PostgreSQL data stays in `ravhub-postgres`
- local artifacts stay in `ravhub-storage`
- recreating containers without these volumes loses state

## Important notes

### Storage backend

Core must use `STORAGE_TYPE=filesystem`. The `s3`, `gcs`, and `azure` backends are Enterprise-only.

### Published ports

- `8080:80` exposes the UI and HTTP proxy
- `5001-5100:5001-5100` exposes the Docker repository range

## How to validate it

- `docker ps` shows `ravhub-core` as `Up`
- `http://localhost:8080` loads the UI
- the first login or initialization flow works
- generated client commands use the correct public host and ports

## Common issues

### The UI does not open

Check `-p 8080:80` and verify the container is not restarting because of a database error.

### The container keeps restarting

Check `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `JWT_SECRET`.

### Docker commands point to the wrong host

Check the published domain, reverse proxy, and the Docker port range.

### Artifacts disappear after recreating the container

Check that `ravhub-storage` is mounted on `/data/storage`.

## Next step

Continue with [Client usage](../clients/usage).
