---
title: Enterprise · Helm Chart
description: Estado actual de disponibilidad de RavHub Enterprise para despliegues con Helm Chart.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Enterprise · Helm Chart"
  lead="Disponibilidad actual de RavHub Enterprise para Helm"
/>

## Estado actual

- `RavHub Enterprise` todavía no está publicado para uso general
- no hay chart ni imagen pública disponible para despliegue Enterprise en Kubernetes
- la Beta pública actual está centrada en `RavHub Core`

## Qué significa esto

- si hoy quieres desplegar RavHub en Kubernetes, la edición disponible es `RavHub Core`
- Enterprise sigue apareciendo en la documentación para explicar su dirección funcional y su estado actual
- cuando Enterprise se publique, esta página pasará a contener la guía real de despliegue con Helm

## Qué está previsto para Enterprise

- activación mediante licencia
- soporte para backends avanzados como `s3`, `gcs` y `azure`
- despliegue orientado a instalaciones que necesiten capacidades avanzadas

## Qué hacer hoy

- usa [Core · Helm Chart](./core-helm-chart) si vas a desplegar RavHub ahora
- usa [Core · Bare Docker](./core-bare-docker) si prefieres una instalación fuera de Kubernetes
- revisa [Core vs Enterprise](../product/core-vs-enterprise) para ver qué está disponible hoy en Beta

## Próximo paso

Continúa con [Core · Helm Chart](./core-helm-chart) o revisa [Enterprise · Bare Docker](./enterprise-bare-docker) para ver el mismo estado fuera de Kubernetes.