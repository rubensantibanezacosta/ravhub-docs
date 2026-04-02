---
title: Client usage
description: How to consume and publish artifacts in RavHub from npm, pnpm, Maven, pip, Docker, Helm, and other standard clients.
---

<DocHeader
  icon="pointer"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Client usage"
  lead="What to do after deploying RavHub and how to use it from real client tools with the URLs your end users will actually see."
/>

## Base rule

Before using any client, identify these two values:

- `BASE_URL`, for example `https://packages.example.com`
- `REPO`, the RavHub repository name, for example `npm-hosted`

Most ecosystems start from this pattern:

`BASE_URL/repository/REPO`

Some ecosystems then append a suffix such as `/simple`, `/index.json`, `/index`, or use a dedicated Docker port.

## Private repositories

If the repository is private, use the credentials provided by RavHub.

- `npm` and `pnpm` can use `login` or `.npmrc`
- Maven and Gradle usually store credentials in `settings.xml` or project properties
- `pip` and `twine` normally use persisted configuration files
- Docker uses `docker login HOST:PORT`
- Helm can use `--username` and `--password`

## Common client patterns

### NPM and pnpm

```bash
npm install my-package@1.0.0 --registry BASE_URL/repository/REPO
pnpm add my-package@1.0.0 --registry BASE_URL/repository/REPO
```

### Maven and Gradle

Repository URL:

`BASE_URL/repository/REPO/`

### PyPI

Install URL:

`BASE_URL/repository/REPO/simple`

### NuGet

Feed URL:

`BASE_URL/repository/REPO/index.json`

### Cargo

Sparse index URL:

`sparse+BASE_URL/repository/REPO/index`

### Docker

Docker uses the public host and the assigned repository port:

`HOST_PUBLIC:ASSIGNED_PORT/IMAGE:TAG`

### Helm

Repository URL:

`BASE_URL/repository/REPO`

## Full reference

The complete step-by-step client reference is currently maintained in Spanish:

- [Uso desde clientes](/clients/usage)

## Next step

If you still have not deployed RavHub, go back to [Core vs Enterprise](../product/core-vs-enterprise).
