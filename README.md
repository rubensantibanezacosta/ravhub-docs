# RavHub Docs

Sitio público de documentación de RavHub construido con VitePress.

## Alcance

Este proyecto documenta el producto público actual:

- overview de RavHub
- estado actual de Core y Enterprise
- despliegue disponible de Core
- uso desde clientes

## Idiomas y versiones

- español como locale principal
- inglés bajo `/en/`
- versionado manual para `0.1.0`

## Comandos

- `pnpm install`
- `pnpm docs:dev`
- `pnpm docs:build`
- `pnpm docs:preview`

## Docker

El proyecto incluye [Dockerfile](Dockerfile) para construir una imagen de producción que genera el sitio y lo sirve con `vitepress preview` en el puerto `4173`.

En el compose raíz del parent repo, las docs se publican por defecto en el puerto `3002` del host.

## Estructura

- `docs/` contenido de documentación
- `docs/.vitepress/` configuración del sitio
