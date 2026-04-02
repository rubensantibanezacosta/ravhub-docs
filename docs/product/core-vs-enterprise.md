---
title: Core vs Enterprise
description: Qué está disponible hoy en RavHub Beta, cuál es el estado de Core y Enterprise y qué cambia entre ambas ediciones.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core vs Enterprise"
  lead="Qué está disponible hoy en RavHub Beta, qué cambia entre Core y Enterprise y cómo interpretar su estado actual."
/>

## Estado actual

- La Beta pública actual está orientada a `RavHub Core`
- `RavHub Enterprise` todavía no está publicada para uso general
- Si vas a probar RavHub hoy, la edición que puedes desplegar es Core

## RavHub Core

`RavHub Core` es la edición base comunitaria.

### Qué incluye

- instalación base sin licencia
- almacenamiento `filesystem`
- despliegue disponible hoy en la Beta pública

### Cuándo elegir Core

- Cuando quieres empezar con la instalación base
- Cuando no necesitas capacidades enterprise
- Cuando quieres validar el producto antes de escalar funcionalidad

## RavHub Enterprise

`RavHub Enterprise` es la edición planificada para capacidades adicionales habilitadas por licencia.

### Qué añade

- activación mediante `LICENSE_KEY`
- posibilidad de usar `filesystem`, `s3`, `gcs` o `azure` como backend por defecto
- un camino de despliegue pensado para instalaciones que necesiten capacidades Enterprise

### Estado actual de Enterprise

- todavía no hay una publicación general de la edición Enterprise
- no hay imagen pública publicada para despliegue general
- las páginas de Enterprise en esta documentación reflejan su estado, no una disponibilidad inmediata

### Cuándo elegir Enterprise

- cuando quieras evaluar la dirección del producto
- cuando necesites conocer qué capacidades se están preparando
- cuando estés esperando su disponibilidad futura

## Cómo elegir rápido

### Elige Core si

- quieres una instalación base
- quieres validar el producto primero
- quieres probar la Beta pública disponible hoy

### Elige Enterprise si

- quieres revisar la edición prevista a futuro
- necesitas conocer el alcance planeado de la edición avanzada
- puedes esperar a su publicación

## Diferencia práctica más importante

| Área | Core | Enterprise |
| --- | --- | --- |
| Estado actual | disponible en Beta | no publicada todavía |
| Licencia | no necesaria | prevista para activar la edición |
| Backend de almacenamiento por defecto | `filesystem` | previsto: `filesystem`, `s3`, `gcs` o `azure` |
| Imagen pública | `registry.ravhub.app/ravhub-core:0.1.0` | aún no disponible públicamente |

## Qué no cambia

En ambas ediciones, la documentación pública debe seguir el mismo patrón:

- elegir método de despliegue
- instalar
- validar acceso
- usar RavHub desde clientes

## Siguiente paso

Ve a una de estas guías:

- [Core · Bare Docker](../deploy/core-bare-docker)
- [Core · Helm Chart](../deploy/core-helm-chart)
- [Enterprise · Bare Docker](../deploy/enterprise-bare-docker)
- [Enterprise · Helm Chart](../deploy/enterprise-helm-chart)