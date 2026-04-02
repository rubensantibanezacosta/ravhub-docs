---
title: Enterprise · Helm Chart
description: Current availability status of RavHub Enterprise for Helm Chart deployments.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Enterprise · Helm Chart"
  lead="Current RavHub Enterprise availability for Helm"
/>

## Current status

- `RavHub Enterprise` is not publicly released yet
- there is no public chart or image currently available for Enterprise deployment on Kubernetes
- the current public Beta is focused on `RavHub Core`

## What this means

- if you want to deploy RavHub on Kubernetes today, the available edition is `RavHub Core`
- Enterprise still appears in the docs so you can understand its planned scope and current status
- when Enterprise is published, this page will be replaced with the actual Helm deployment guide

## What is planned for Enterprise

- license-based activation
- advanced storage backends such as `s3`, `gcs`, and `azure`
- a deployment path for installations that need advanced capabilities

## What to do today

- use [Core · Helm Chart](./core-helm-chart) if you want to deploy RavHub now
- use [Core · Bare Docker](./core-bare-docker) if you prefer a non-Kubernetes setup
- read [Core vs Enterprise](../product/core-vs-enterprise) to understand the difference in current availability

## Next step

Continue with [Core · Helm Chart](./core-helm-chart) or review [Enterprise · Bare Docker](./enterprise-bare-docker) for the same status outside Kubernetes.
