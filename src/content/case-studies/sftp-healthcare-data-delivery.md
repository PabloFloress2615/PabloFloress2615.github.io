---
title: 'Secure SFTP data delivery for a healthcare data company'
summary: 'Migrated self-managed SFTP servers on EC2 to AWS Transfer Family backed by S3, with PGP encryption per recipient and connection setup managed entirely in Terraform.'
clientDescriptor: 'A healthcare data company'
order: 4
stack:
  - AWS Transfer Family
  - Amazon S3
  - AWS Lambda
  - PGP
  - Terraform
  - CI/CD
---

## Context

A healthcare data company delivered files to partners over SFTP servers that the
team ran itself on EC2, with connection setup handled manually.

## Challenge

Remove the operational burden of self-managed SFTP hosts while raising the
security bar on data in transit and at rest — and make onboarding a new delivery
endpoint a reviewable change rather than a manual procedure.

## Decisions & trade-offs

**AWS Transfer Family backed by S3** replaced the self-managed EC2 SFTP servers.
The protocol surface stays identical for partners, so nothing changed on their
side, while patching and availability of the SFTP endpoint itself became AWS's
responsibility. Storage moves to S3, which brings its durability, lifecycle and
access-logging behaviour along with it.

**Lambda for post-transfer processing**, triggered after upload, so processing is
event-driven rather than a cron job polling a directory on a server.

**Two independent layers of protection:** SSH key-based authentication for the
transport, and PGP file encryption with each recipient's own public key for the
payload. Encrypting per recipient means a file is only readable by its intended
destination even after it leaves the pipeline.

**Terraform plus CI/CD pipelines** for every connection. What used to be a
manual connection setup became a version-controlled, peer-reviewed change with
an audit trail — which matters disproportionately in a healthcare data context.

## Results

- Self-managed SFTP infrastructure on EC2 retired in favour of a managed
  endpoint.
- Files protected in transit by SSH key authentication and at rest by PGP
  encryption keyed to each recipient.
- Partner onboarding turned from a manual procedure into a reviewed,
  version-controlled Terraform change.

## Tech stack

AWS Transfer Family · Amazon S3 · AWS Lambda · SSH key authentication ·
PGP encryption · Terraform · CI/CD pipelines
