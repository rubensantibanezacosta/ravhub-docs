---
title: Enterprise · Bare Docker
description: Estado actual de disponibilidad de RavHub Enterprise para despliegues Bare Docker.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Enterprise · Bare Docker"
  lead="Disponibilidad actual de RavHub Enterprise para Docker"
/>

## Estado actual

- `RavHub Enterprise` todavía no está publicado para uso general
- no hay una imagen pública disponible para despliegue Bare Docker
- la Beta pública actual está centrada en `RavHub Core`

## Qué significa esto

- si hoy quieres probar RavHub, la ruta disponible es `RavHub Core`
- Enterprise sigue apareciendo en la documentación para explicar su dirección funcional y su estado
- cuando la edición Enterprise se publique, esta página pasará a contener la guía real de despliegue

## Qué está previsto para Enterprise

- activación mediante licencia
- backends de almacenamiento avanzados como `s3`, `gcs` y `azure`
- despliegue específico para instalaciones que necesiten capacidades avanzadas

## Qué hacer hoy

- usa [Core · Bare Docker](./core-bare-docker) si quieres desplegar RavHub hoy mismo
- usa [Core · Helm Chart](./core-helm-chart) si prefieres Kubernetes
- revisa [Core vs Enterprise](../product/core-vs-enterprise) para entender la diferencia de estado entre ambas ediciones

## Próximo paso

Continúa con [Core · Bare Docker](./core-bare-docker) o revisa [Enterprise · Helm Chart](./enterprise-helm-chart) para ver el mismo estado en Kubernetes.