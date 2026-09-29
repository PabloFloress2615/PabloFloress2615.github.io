---
title: 'Observability platform for 3,000+ VMs in a hybrid cloud'
summary: 'Closed a total metrics blind spot on a VMware platform serving enterprise clients in seven countries, with an HA Kubernetes cluster running Prometheus and Grafana.'
clientDescriptor: 'A multi-country managed service provider'
order: 2
stack:
  - Prometheus
  - Grafana
  - Grafana Alloy
  - Kubernetes
  - VMware
  - Ansible
diagram:
  file: 'hybrid-observability'
  alt: 'A managed VMware platform of more than 3,000 virtual machines across seven countries, spanning six operating system families — CentOS, RHEL, Rocky, Ubuntu, SUSE and Windows Server — each running a Grafana Alloy agent installed by a per-distribution script. Metrics are scraped into a highly available Kubernetes cluster spanning two datacentres, where Prometheus stores them and Grafana serves them. Output is isolated per client: each gets its own dashboards and an alerting profile whose thresholds match that client contracted SLA rather than a platform-wide default.'
  caption: 'Collection, storage and delivery. Client isolation happens at the dashboard and alerting layer, not by filtering one shared view.'
---

## Context

A VMware-based hybrid platform served enterprise clients across seven countries.
More than 3,000 virtual machines were in production with no metrics collection
at all — a total observability blind spot.

## Challenge

Instrument a fleet that size across a heterogeneous operating system estate,
without a monitoring agent standard to build on, and keep each client's data
separated from every other client's.

## Decisions & trade-offs

**A highly available Kubernetes cluster spanning two datacenters** hosts
Prometheus and Grafana, so the monitoring platform does not share a failure
domain with any single site it observes.

**Grafana Alloy as the collection agent**, with install scripts written per
distribution so the same rollout works across the whole estate: CentOS, RHEL,
Rocky Linux, Ubuntu, SUSE and Windows Server. Cross-distribution packaging was
the bulk of the work — a fleet this heterogeneous has no single install path.

**Per-client isolation at the dashboard and alerting layer.** Each client gets
isolated dashboards and an alerting profile mapped to the SLA that client
actually contracted, rather than one shared dashboard filtered by tag. Clients
see only their own estate, and alert thresholds match their commercial terms
instead of a platform-wide default.

## Results

- Metrics coverage established across **3,000+ VMs** that previously reported
  nothing.
- Every client onboarded with isolated dashboards and alerting mapped to their
  contracted SLA.
- Agent installation reproducible across six operating system families.

> **TODO:** add post-rollout operational outcomes if you want to quantify the
> impact (for example incident detection or MTTR figures) — only once you have
> real numbers to cite.

## Tech stack

Prometheus · Grafana · Grafana Alloy · Kubernetes (HA, dual-datacenter) ·
VMware · CentOS / RHEL / Rocky / Ubuntu / SUSE / Windows Server
