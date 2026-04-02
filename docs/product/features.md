---
title: Features
description: Resumen de las capacidades visibles de RavHub Beta para instalación, uso diario y consumo desde clientes reales.
---

<DocHeader
  icon="product"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Features"
  lead="Resumen de capacidades visibles del producto desde el punto de vista de instalación y uso diario."
/>

## Features principales

- Soporte para varios tipos de repositorio: `hosted`, `proxy` y `group`
- UI web para explorar repositorios, paquetes y versiones
- Generación de comandos de cliente desde la propia interfaz
- Despliegue de `RavHub Core` en Docker o en Kubernetes con Helm Chart
- Persistencia de artefactos
- Validación básica de salud de la instancia

## Estado actual de la Beta

- La Beta pública actual está centrada en `RavHub Core`
- `RavHub Enterprise` todavía no está publicada para uso general
- La documentación pública mantiene la referencia a Enterprise para explicar el roadmap de edición y su estado

## Ecosistemas y clientes

La documentación pública debe cubrir el uso de RavHub con estos clientes:

- NPM / pnpm
- Maven / Gradle
- PyPI / pip / twine
- NuGet
- Composer
- Cargo
- Docker
- Helm

## Features de despliegue

- Instalación de Core en bare Docker
- Instalación de Core con Helm Chart
- Estado actual de la edición Core
- Estado actual de la edición Enterprise

## Qué debe ver el usuario tras instalar

- UI accesible
- repositorios visibles
- comandos de cliente utilizables
- comportamiento consistente entre publicación y consumo

## Siguiente paso

Continúa con [Core vs Enterprise](./core-vs-enterprise).