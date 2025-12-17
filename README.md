# Notification System Overview

## 1. High-level overview

The system is a multi-tenant SaaS that accepts API requests (or UI actions) to send notifications via multiple channels. It uses an AI service for content generation and optimization, a routing layer to select channel(s), channel-specific adapters/integrations (Twilio, SendGrid, FCM, SES), and a resilient delivery system with queues, retries, and observability.

Primary components:

- Public API / Developer Portal (API Gateway + API service)
- Authentication & Authorization (Auth service)
- Tenant & Project management (Management service)
- Template service (templates + versions + AI assistant)
- AI service (internal or external LLM calls)
- Routing & Orchestration service (decides channels, fallbacks)
- Delivery Workers + Channel Adapters (SMS/WhatsApp/Email/Push)
- Queueing layer (Kafka / RabbitMQ / SQS)
- Event store & Message status tracking (Postgres + event log)
- Billing & Quota service
- Admin dashboard & Monitoring UI
- Webhooks dispatcher (for user callbacks)
- Observability & Alerting (metrics, logs, tracing)
- Storage: object store for assets (S3), secrets store, analytics data warehouse

## 2. Component responsibilities and interactions

### 2.1 API Gateway & Public API

Single entry for all external requests (REST + gRPC optional).

Responsibilities: auth validation (API key / JWT), rate limiting, request validation, routing to internal services.

Tech examples: Kong/Envoy/NGINX + custom rate-limiter and auth plugin; or fully-managed API Gateway (AWS API Gateway).

### 2.2 Auth Service

Issues API keys, JWT tokens; supports OAuth SSO (Google/GitHub).

Stores API keys (hashed) tied to tenant/project with scopes and quotas.

Manages roles (Admin, Dev, Analyst).

### 2.3 Management / Admin Service

CRUD for organizations, projects, users, roles.

API keys and project settings (default channels, fallback rules, quotas).

### 2.4 Template Service

Stores templates with variables, versions, test data.

Integrates with AI service to generate/fix templates and produce channel-specific variants.

Offers template preview & test send capabilities (sandbox).

### 2.5 AI Service (assistant)

Responsible for content generation (subject, body, short SMS, push text); tone translation; personalization suggestions; and channel-specific trimming.

Can be implemented as:

- Hosted LLM (OpenAI, Anthropic) or
- Self-hosted / fine-tuned model (for privacy/control)

Implements caching for repeated prompts and cost control.

### 2.6 Routing & Orchestration Service

For each message, determines:

- Which channel(s) to use (routing policy: explicit, AI-suggested, or rules-based)
- Priority and fallback strategies
- Throttling decisions (per-tenant, global)

Produces a delivery plan (one or more channel tasks).

### 2.7 Queueing Layer

Accepts delivery tasks from orchestrator and persists them durable.

Use a distributed, durable queue: Kafka for high-throughput; SQS+SNS for AWS-managed; RabbitMQ for simpler setups.

Supports multiple queues by priority, channel, region, or tenant.

### 2.8 Delivery Workers & Channel Adapters

Worker processes pull tasks and call channel providers:

- SMS/WhatsApp: Twilio or Meta WhatsApp Cloud or direct CSP APIs
- Email: SendGrid / Amazon SES / SMTP relay
- Push: FCM (Android), APNs (iOS), plus web push (VAPID)

Responsibilities: transform task to provider payloads, send, interpret provider responses, emit delivery events.

Implement idempotency keys to avoid duplicate sends.

Respect per-tenant rate limits; implement exponential backoff and smart retry policy.

### 2.9 Status/Event Store

Central place to persist message lifecycle events: queued, dispatched, delivered, failed, opened, clicked, bounced, unsubscribed.

Use a relational DB (Postgres) for transactional objects + append-only event log (Kafka topic or append table for audit).

### 2.10 Webhook Dispatcher

Delivers status updates to customers' endpoints.

Retries with exponential backoff; signs payloads; provides dashboard for webhook delivery history.

### 2.11 Billing & Quota Service

Tracks usage (per channel, per message part), pricing tiers, invoices.

Blocks or notifies when quotas are exceeded.

### 2.12 Analytics & Data Warehouse

Stream key events to analytics pipeline (e.g., Kafka → Kinesis → Redshift / BigQuery).

Use for reporting, AI training data, and routing optimization models.

### 2.13 Admin & User UIs

Developer portal with API keys, docs, playground, templates, logs, analytics.

Admin UI for global monitoring, rate/limit management, user management, revenue.

### 2.14 Observability & Security

Metrics (Prometheus), Tracing (OpenTelemetry), Logs (ELK/EFK or Datadog).

Audit logs per tenant for compliance.

Secrets management (Vault or AWS Secrets Manager).

## 3. Data model (core tables)

Below are simplified core tables. Adjust columns per requirements.

**tenants**

- id (uuid)
- name
- created_at
- billing_plan_id
- default_from_email
- default_sms_sender
- metadata (json)

**projects**

- id (uuid)
- tenant_id (fk)
- name
- api_keys (separate table)
- settings (json)

**api_keys**

- id (uuid)
- project_id
- key_hash
- name
- scopes (json/array)
- created_at
- revoked_at

**templates**

- id (uuid)
- project_id
- name
- channel (email|sms|whatsapp|push|multi)
- content (text/json)
- variables (json)
- version
- ai_generated (bool)
- created_by
- created_at

**messages**

- id (uuid)
- project_id
- tenant_id
- template_id (nullable)
- status (queued|processing|sent|delivered|failed)
- priority
- payload (json)
- routing_plan (json)
- retry_count
- created_at
- last_updated

**message_events** (append-only)

- id (uuid)
- message_id
- event_type (queued, sent_to_provider, provider_response, delivered, failed, opened, clicked, bounced)
- provider (string)
- payload (json)
- timestamp

**webhooks**

- id
- tenant_id
- endpoint_url
- secret
- events (json)
- created_at

**billing_records**

- id
- tenant_id
- project_id
- channel
- units
- cost
- generated_at

## 4. API design (examples)

**POST /v1/send**
Request body:

```json
{
  "projectId": "proj_xxx",
  "templateId": "tmpl_xxx", // or provide inline content
  "to": [
    { "channel": "sms", "destination": "+9199..." },
    { "channel": "email", "destination": "a@b.com" }
  ],
  "variables": { "name": "Deepanshu", "orderId": "12345" },
  "priority": "high",
  "deduplication_key": "external-id-123", // optional idempotency
  "meta": { "customerId": "c-123" }
}
```

Response: accepted with message_id(s) and status queued.

**GET /v1/messages/{messageId}**
Returns message status and event timeline.

**POST /v1/templates**
Create a template; supports ai_generate: true for AI-assisted creation.

**POST /v1/playground/send-test**
Sends to sandbox numbers or email for testing.

**Webhook callback contract**
Signed JSON payload; include message_id, status, timestamp, provider, metadata.

## 5. Delivery semantics & reliability

Durable receipt: API Gateway writes request to DB/queue before returning accepted; return 202 Accepted with message id.

Exactly-once or at-least-once semantics:

- Use idempotency keys to support de-dup.
- Delivery Workers must be idempotent for provider calls or check provider-side duplicate prevention.

Retries:

- Worker-level retries: exponential backoff (initial 1s, max 1 hour).
- Dead-letter queue for persistent failures; notify admin or user.

Provider fallbacks:

- Orchestrator can mark primary channel and fallback channels; on provider permanent failure (e.g., blacklisted email), do not fallback automatically for SMTP bounces unless business rule allows.

Throttling:

- Per-tenant and per-provider concurrency limits.
- Burst tokens and rolling-window limits.

## 6. Scalability & performance patterns

### Horizontal scaling

- API services: stateless, scale behind load balancers.
- Worker fleet: autoscale by queue depth and consumer lag.
- Use partitioned queues (by tenant or region) to avoid head-of-line blocking.

### Partitioning & sharding

- Shard message events or queues by tenant region or hashed tenant id for throughput.

### Caching

- Cache AI responses for identical prompts.
- Cache templates and tenant config (Redis).

### Data retention & archiving

- Keep recent messages (e.g., 90 days) in primary DB; archive older events to object storage or a cold warehouse for compliance.

## 7. Security & compliance

### Authentication & Authorization

- API keys for server-to-server; OAuth for UI logins.
- RBAC roles for admin/dev/analyst.
- Short-lived tokens for internal service-to-service calls (mTLS or JWT signed by auth service).

### Data protection

- Encrypt at rest (DB encryption, S3 SSE).
- TLS in transit everywhere (strict TLS).
- Secret management: Hash API keys; store provider credentials in Vault.

### Auditability & compliance

- Immutable audit log of critical actions (who, when, what).
- Exportable logs for GDPR/DSAR.
- Consent & unsubscribe handling for email/SMS (store suppression lists).
- Support data deletion requests: delete or anonymize PII upon request.

### Provider privacy considerations

- If using third-party AI, redact PII before sending prompts unless user consents.
- Offer enterprise option: self-hosted AI or dedicated private deployment.

## 8. Observability & incident response

### Tracing & metrics

- Instrument with OpenTelemetry.
- Key metrics: requests/s, delivery success rate by channel, queue lag, worker errors, retries, cost by tenant.
- Dashboards: Grafana (Prometheus), Datadog.

### Logging

- Structured logs (JSON) with request id and message id.
- Centralized store (Elasticsearch or managed alternative).

### Alerting

- Alerts for high failure rates, queue lag threshold, provider outages, billing anomalies.
- On-call runbooks for outage scenarios.

### Postmortem data

- Keep full event traces for 90 days to investigate incidents.

## 9. AI-specific considerations

- Prompt engineering service: central place to manage prompts and templates used for AI generation.
- Cost control: budget per tenant; limit tokens; cache and reuse completions.
- Latency: run AI generation asynchronously when possible; for blocking use-cases, provide an optimistic preview + final update via webhook.
- Safety filters: profanity, PII detection, content moderation, compliance checks.
- Model monitoring: drift, hallucination detection, and feedback loop from delivery outcomes.

## 10. Multi-tenant isolation & tenancy model

- Logical multi-tenancy with strong resource quotas.
- Data isolation: tenant_id column for multi-tenant DB; for high-tier customers, dedicated schema or standalone DB.
- Rate-limiting and billing per tenant.

## 11. Deployment & infra recommendations

### Minimal viable infra (cloud-agnostic)

- Kubernetes cluster (EKS/GKE/AKS) or ECS for container orchestration.
- Managed DB (Postgres) with read replicas.
- Managed queue (Kafka cluster or AWS MSK; or SQS for simpler).
- Object store: S3-compatible.
- Redis for caching and leader election.
- Vault / Secrets Manager.
- CI/CD: GitHub Actions or GitLab; pipeline to build images, run tests, deploy to staging & prod.
- CDN for assets and email images.

### High-availability

- Multi-AZ deploys for DB and services.
- Cross-region replication for disaster recovery for critical customers.
- Global edge points for webhooks and public API using CDN or API gateway edge.

## 12. Cost & provider tradeoffs (brief)

- Twilio & SendGrid: faster to integrate, higher per-message cost.
- SES + own SMTP: cheaper for high-volume email, more management overhead.
- Managed queues (SQS) reduce ops but Kafka gives higher throughput and streaming capabilities.
- Cloud-managed AI incurs per-token cost; self-hosting reduces cost at scale but requires GPUs & infra.

## 13. Example message sequence (simplified)

1. Client calls POST /v1/send with API key.
2. API Gateway validates key, publishes request to service.
3. Management service validates project/quota and creates message entry (status=queued).
4. Orchestrator reads message, optionally calls AI service to generate content (async).
5. Orchestrator writes routing plan to DB and enqueues one or more delivery tasks (per channel) to queue.
6. Delivery Worker picks task, formats provider request, calls provider API.
7. Provider returns immediate response; Worker writes message_events, updates messages status.
8. Provider later sends webhook (provider -> our webhook ingestion) for final delivery status; system updates events & status.
9. Webhook dispatcher forwards status to customer endpoint.

## 14. Operational concerns & runbook hints

- Provider outages: route to alternate provider (e.g., use multiple SMS vendors) for critical alerts.
- Backpressure: when queue lag spikes, apply shedding (reject low-priority messages) and notify tenants.
- Abuse detection: rate spikes, spam patterns — auto-disable API keys and notify tenant.
- Blacklist management: global and per-tenant suppression lists.

## 15. Roadmap / phased implementation suggestion

### Phase 0 (MVP)

- API + API key auth
- Basic template CRUD
- Delivery to one email provider (SES/SendGrid)
- Queue + single worker type
- Basic dashboard for logs + invoices

### Phase 1

- Add SMS + Twilio integration
- Webhooks + delivery events
- Template variables and preview
- Basic AI content generation (3-4 prompt recipes)

### Phase 2

- Multi-provider support, fallback
- Advanced routing & AI routing
- Billing, quota enforcement, sandbox/test mode
- Monitoring & alerting

### Phase 3

- High-availability across regions
- Data warehouse & analytics pipelines
- Enterprise features: dedicated infra, SSO, SLA

## 16. Appendix — tech stack suggestions

- API / UI: Node.js (NestJS/Express) or Go for API; React + TypeScript for dashboard
- Auth: Keycloak or Auth0 (SSO), or homegrown JWT service
- DB: Postgres (primary), Timescale/ClickHouse for analytics if needed
- Queue: Kafka or RabbitMQ or SQS
- Cache: Redis
- Object store: S3
- AI: OpenAI / Anthropic / self-hosted Llama-variants on GPU
- Logging/Tracing: ELK stack, Prometheus, Grafana, OpenTelemetry
- CI/CD: GitHub Actions, Terraform for infra as code
- Secrets: HashiCorp Vault / cloud secrets manager
