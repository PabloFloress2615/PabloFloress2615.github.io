---
title: 'Production EKS security hardening after a penetration test'
summary: 'Turned a penetration test report into a prioritized remediation plan, then enforced the fixes at admission so they cannot regress.'
clientDescriptor: 'Production Kubernetes platform'
order: 3
stack:
  - Amazon EKS
  - NetworkPolicies
  - Kubernetes RBAC
  - OPA Gatekeeper
diagram:
  file: 'eks-hardening'
  alt: 'A deploy request from kubectl or a CI pipeline reaches an OPA Gatekeeper validating admission webhook before anything is persisted. Compliant workloads are admitted; those carrying a hostPath mount, an over-broad role or no NetworkPolicy are rejected at that gate. Inside the production EKS cluster, east-west traffic is deny by default: the web namespace may reach api, and api may reach data, while a direct web-to-data path is blocked. The audit findings were closed as a prioritised set — least-privilege RBAC, hostPath mounts removed, and NetworkPolicies replacing default-allow pod networking.'
  caption: 'Admission control is the durable half of the work: a remediated cluster that cannot be un-remediated by the next apply.'
---

## Context

A production Amazon EKS cluster was assessed by an external penetration test.
The resulting report listed findings across network exposure, access control and
workload configuration.

## Challenge

Convert an audit document into work that could actually be sequenced and shipped
against a running production cluster — and make sure the fixes stayed fixed once
the engagement was over.

## Decisions & trade-offs

**Prioritized remediation plan first.** The audit report was translated into an
ordered backlog rather than worked through top to bottom, so the highest-risk
findings were closed first.

**NetworkPolicies for east-west segmentation.** Default-allow pod networking
means any compromised workload can reach every other workload. Explicit
NetworkPolicies replaced that with deliberate, reviewable paths between
namespaces.

**Least-privilege RBAC.** Over-broad roles were narrowed to the permissions each
workload and human actually needs.

**Removed hostPath mounts.** hostPath gives a container a foothold on the node
filesystem and is a direct container-escape path; these were eliminated rather
than restricted.

**OPA Gatekeeper admission control** as the durable part of the work.
Remediation that lives only in a ticket regresses the next time someone applies
a manifest. Encoding the rules as admission policy means a non-compliant
workload is rejected at deploy time, not discovered at the next audit.

## Results

- Penetration test findings closed under a prioritized plan.
- East-west traffic segmented with NetworkPolicies; least-privilege RBAC in
  place; hostPath mounts removed.
- Gatekeeper policies enforce the fixes at admission, so the remediated state is
  the only state that can be deployed.

## Tech stack

Amazon EKS · Kubernetes NetworkPolicies · Kubernetes RBAC · OPA Gatekeeper
