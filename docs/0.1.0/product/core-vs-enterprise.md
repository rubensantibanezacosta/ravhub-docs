---
title: Core vs Enterprise
description: Qué estaba disponible en RavHub 0.1.0, cuál era el estado de Core y Enterprise y qué cambiaba entre ambas ediciones.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core vs Enterprise"
  lead="Qué estaba disponible en RavHub 0.1.0, qué cambiaba entre Core y Enterprise y cómo interpretar su estado en esa versión."
/>

## Estado en 0.1.0

- la Beta pública de `0.1.0` estaba orientada a `RavHub Core`
- `RavHub Enterprise` todavía no estaba publicada para uso general
- si ibas a probar RavHub en `0.1.0`, la edición desplegable era Core

## RavHub Core

`RavHub Core` es la edición base comunitaria.

### Qué incluye

- instalación base sin licencia
- almacenamiento `filesystem`
- despliegue disponible en la Beta pública de `0.1.0`

### Cuándo elegir Core

- Cuando quieres empezar con la instalación base
- Cuando no necesitas capacidades enterprise
- Cuando quieres validar el producto antes de escalar funcionalidad

## RavHub Enterprise

`RavHub Enterprise` era la edición prevista para capacidades adicionales habilitadas por licencia.

### Qué añade

- activación mediante `LICENSE_KEY`
- posibilidad de usar `filesystem`, `s3`, `gcs` o `azure` como backend por defecto
- un camino de despliegue pensado para instalaciones que necesiten capacidades avanzadas

### Estado de Enterprise en 0.1.0

- todavía no había publicación general de la edición Enterprise
- no había imagen pública disponible para despliegue general
- las páginas de Enterprise en esta documentación reflejan ese estado, no una disponibilidad inmediata

### Cuándo elegir Enterprise

- cuando querías entender la edición prevista a futuro
- cuando necesitabas revisar el alcance planeado de la edición avanzada
- cuando podías esperar a su publicación

## Cómo elegir rápido

### Elige Core si

- quieres una instalación base
- quieres validar el producto primero
- quieres usar la Beta pública disponible en `0.1.0`

### Elige Enterprise si

- quieres revisar la edición prevista a futuro
- necesitas conocer el alcance planeado de la edición avanzada
- puedes esperar a su publicación

## Diferencia práctica más importante

| Área | Core | Enterprise |
| --- | --- | --- |
| Estado en 0.1.0 | disponible en Beta | no publicada todavía |
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
