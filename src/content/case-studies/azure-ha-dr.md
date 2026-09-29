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
  file: 'azure-ha-dr'
  alt: 'User traffic reaches Azure Front Door Premium, which applies WAF rules and terminates TLS, then forwards over Private Link to zone-redundant App Service instances in two regions: East US 2 as the active primary and South Central US as a warm standby. Each App Service reaches a SQL Managed Instance Business Critical over a private endpoint. The two databases form a cross-region Auto-Failover Group replicating with 1 to 5 seconds of lag, behind a stable listener endpoint that keeps the connection string unchanged through a failover. Front Door reroutes on health probe in under 90 seconds.'
  caption: 'Traffic path and failover boundaries. The listener endpoint is what keeps the application unaware of a database failover.'
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
