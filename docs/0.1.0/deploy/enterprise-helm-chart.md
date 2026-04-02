---
title: Enterprise · Helm Chart
description: Estado de disponibilidad de RavHub Enterprise para despliegues con Helm Chart en la versión 0.1.0.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Enterprise · Helm Chart"
  lead="Disponibilidad de RavHub Enterprise para Helm en 0.1.0"
/>

## Estado en 0.1.0

- `RavHub Enterprise` todavía no estaba publicado para uso general en `0.1.0`
- no había chart ni imagen pública disponible para despliegue Enterprise en Kubernetes
- la Beta pública de `0.1.0` estaba centrada en `RavHub Core`

## Qué significaba esto en 0.1.0

- si querías desplegar RavHub en Kubernetes en esa versión, la edición disponible era `RavHub Core`
- Enterprise ya formaba parte del alcance planeado del producto, pero no de su disponibilidad pública
- esta página conserva ese estado para dejar claro qué se podía desplegar realmente en `0.1.0`

## Qué se esperaba de Enterprise

- activación mediante licencia
- soporte para `s3`, `gcs` y `azure`
- un despliegue orientado a instalaciones con necesidades avanzadas

## Qué hacer en 0.1.0

- usa [Core · Helm Chart](./core-helm-chart) si en `0.1.0` ibas a desplegar RavHub en Kubernetes
- usa [Core · Bare Docker](./core-bare-docker) si en esa versión preferías una instalación fuera de Kubernetes
- revisa [Core vs Enterprise](../product/core-vs-enterprise) para entender el estado exacto de ambas ediciones en esa release

## Próximo paso

Continúa con [Core · Helm Chart](./core-helm-chart) o revisa [Enterprise · Bare Docker](./enterprise-bare-docker) para ver el mismo estado fuera de Kubernetes.
