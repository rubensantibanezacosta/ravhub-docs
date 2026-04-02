---
title: Core vs Enterprise
description: What is available today in RavHub Beta, what the current state of Core and Enterprise is, and what changes between both editions.
---

<DocHeader
  icon="enterprise"
  logo-src="/logo.svg"
  logo-alt="RavHub"
  title="Core vs Enterprise"
  lead="What is available today in RavHub Beta, what changes between Core and Enterprise, and how to read their current status."
/>

## Current status

- The current public Beta is focused on `RavHub Core`
- `RavHub Enterprise` is not publicly released yet
- If you want to try RavHub today, the deployable edition is Core

## RavHub Core

`RavHub Core` is the base community edition.

### What it includes

- base installation without license activation
- `filesystem` storage
- deployment path available today in the public Beta

### When to choose Core

- when you want to start with the base installation
- when you do not need enterprise capabilities
- when you want to validate the product before expanding functionality

## RavHub Enterprise

`RavHub Enterprise` is the planned edition for additional capabilities unlocked by license.

### What it adds

- activation through `LICENSE_KEY`
- support for `filesystem`, `s3`, `gcs`, or `azure` as default storage backend
- a deployment path intended for installations that need advanced capabilities

### Current Enterprise status

- it is not publicly released yet
- there is no public image available for general deployment
- the Enterprise pages in this documentation describe status, not current public availability

### When to choose Enterprise

- when you want to understand the planned advanced edition
- when you need to review the expected scope of Enterprise
- when you are waiting for future availability

## Fast decision

### Choose Core if

- you want a base installation
- you want to validate the product first
- you want to use the public Beta available today

### Choose Enterprise if

- you want to review the planned advanced edition
- you need to understand the future capability set
- you can wait for public availability

## Most important practical difference

| Area | Core | Enterprise |
| --- | --- | --- |
| Current status | available in Beta | not published yet |
| License | not required | planned to activate the edition |
| Default storage backend | `filesystem` | planned: `filesystem`, `s3`, `gcs`, or `azure` |
| Public image | `registry.ravhub.app/ravhub-core:0.1.0` | not publicly available yet |

## Next step

Open one of these deployment guides:

- [Core · Bare Docker](../deploy/core-bare-docker)
- [Core · Helm Chart](../deploy/core-helm-chart)
- [Enterprise · Bare Docker](../deploy/enterprise-bare-docker)
- [Enterprise · Helm Chart](../deploy/enterprise-helm-chart)
