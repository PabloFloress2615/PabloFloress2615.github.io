---
title: 'Azure HA/DR architecture for a .NET app with private SQL Managed Instance'
summary: 'A zone-redundant, cross-region high availability and disaster recovery design on Azure, validated end to end with a scaled-down Terraform demo.'
clientDescriptor: 'Enterprise .NET application'
order: 1
stack:
  - Azure Front Door Premium
  - Azure WAF
  - Private Link
  - Azure App Service
  - SQL Managed Instance
  - Terraform
diagram:
  src: '/images/azure-ha-dr.png'
  alt: 'Architecture diagram: Azure Front Door Premium with WAF fronting zone-redundant App Service instances in East US 2 and South Central US, each connected over Private Link to a SQL Managed Instance pair in a cross-region Auto-Failover Group.'
  caption: 'TODO: replace with the final architecture diagram (public/images/azure-ha-dr.png is a placeholder).'
  width: 1200
  height: 675
---

## Context

A two-tier .NET application backed by SQL Server needed a high availability and
disaster recovery architecture on Azure, with the database reachable only over
private networking.

> **TODO:** add the business context — the availability target that drove the
> design, and the constraints inherited from the existing platform.

## Challenge

Design an architecture that survives both a zone failure and a full region
failure, keeps the database off the public internet, and does so without
requiring application changes at failover time.

## Decisions & trade-offs

**Azure Front Door Premium with WAF and Private Link** as the global entry
point. Front Door terminates traffic at the edge, applies WAF rules, and reaches
the origin over Private Link so the application tier is never publicly exposed.

**Zone-redundant App Service** for the application tier, so a single availability
zone loss is absorbed inside the primary region without a cross-region failover.

**SQL Managed Instance Business Critical** with a cross-region **Auto-Failover
Group**, replicating from East US 2 to South Central US. The failover group
provides a stable listener endpoint, which is what makes the failover
transparent to the application.

**Warm-standby DR** (East US 2 → South Central US) rather than active-active:
the secondary region runs provisioned but idle capacity, trading a small
recovery delay for substantially lower steady-state cost.

Two trade-offs worth naming explicitly:

- **App Service over AKS.** For a two-tier application, AKS would have added a
  cluster to patch, upgrade and monitor without a matching benefit. App Service
  meant lower operational toil and better TCO.
- **Front Door over Application Gateway + Traffic Manager.** Traffic Manager
  fails over via DNS, so recovery is bounded by client-side TTL caching that no
  operator controls. Front Door fails over on health probe at the edge, which
  removes the DNS TTL wait from the recovery path entirely.

## Results

Validated with a scaled-down Terraform demo of the full topology:

- Front Door rerouted traffic to the secondary region in **under 90 seconds**.
- Database replication lag measured at **1–5 seconds**.
- Database failover completed with **no connection-string changes** — the
  Auto-Failover Group listener absorbed the switch.

## Tech stack

Azure Front Door Premium · Azure WAF · Private Link · Azure App Service
(zone-redundant) · Azure SQL Managed Instance Business Critical ·
Auto-Failover Groups · Terraform
