# Notification Service – Basic Email

This document describes the **basic email notification flow** for the `notification-service` in the monorepo.

The design uses **RabbitMQ** for queueing, **Nodemailer** for SMTP email delivery, and **Zod** for request validation. It is intentionally simple (no DB, minimal retries) and can be extended later with auth, templates, persistence, and DLQs.

---

## 1. Overview

The notification service exposes an HTTP endpoint to queue email notifications. Messages are published to RabbitMQ and processed asynchronously by a consumer that sends emails via SMTP.

**Key characteristics**:

- Asynchronous (HTTP → Queue → Consumer)
- At-least-once delivery
- No database (in-memory deduplication only)
- Email channel only (for now)

---

## 2. Prerequisites & Setup

### Services

- **RabbitMQ** (local or Docker)
- **Node.js** (monorepo environment)

### Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

RABBITMQ_URL=amqp://admin:admin@localhost:5672
```

> You can swap Gmail with any SMTP provider (SendGrid, SES, etc.).

### Dependencies

Add the following to `package.json`:

```json
{
  "dependencies": {
    "@repo/rabbitmq": "*",
    "nodemailer": "^6.x",
    "zod": "^3.x",
    "uuid": "^9.x"
  }
}
```

---

## 3. Directory Structure

Create the following structure under:

```
apps/notification-service/src/
```

```
consumers/
  email.consumer.ts        # RabbitMQ consumer

producers/
  send.producer.ts         # RabbitMQ producer

services/
  email.service.ts         # Nodemailer wrapper
  payload-builder.ts       # Email subject/body builder

controllers/
  send.controller.ts       # POST /v1/send handler

routes/
  send.routes.ts           # Route definitions

models/
  send.model.ts            # Zod schemas

tests/
  send.test.ts             # Unit tests

scheduler/
  README.md                # Placeholder for retries / DLQ

app.ts                     # Express app setup
index.ts                   # Server + consumer bootstrap
```

---

## 4. Core Implementation Steps

### 4.1 App Setup (`app.ts`)

- Initialize Express
- Add JSON body parser
- Mount `/v1/send` routes

---

### 4.2 Models (`models/send.model.ts`)

Use **Zod** to validate incoming requests.

Example fields:

- `projectId: string`
- `to: Array<{ channel: "email"; email: string }>`
- `variables: Record<string, any>`
- `priority?: number`
- `deduplication_key?: string`
- `meta?: Record<string, any>`

---

### 4.3 Routes (`routes/send.routes.ts`)

```http
POST /v1/send
```

Maps directly to `send.controller.ts`.

---

### 4.4 Controller (`controllers/send.controller.ts`)

Responsibilities:

1. Validate request body with Zod
2. Perform basic in-memory deduplication
3. Generate `messageId` (UUID)
4. Publish message to RabbitMQ (`email_queue`)
5. Return HTTP 202 Accepted

Response example:

```json
{
  "messageId": "uuid",
  "status": "queued"
}
```

---

### 4.5 Producer (`producers/send.producer.ts`)

- Connect to RabbitMQ
- Assert `email_queue`
- Publish JSON payload

Payload example:

```json
{
  "messageId": "uuid",
  "to": "user@example.com",
  "variables": {
    "name": "John",
    "orderId": "ORD123"
  }
}
```

---

### 4.6 Services

#### Payload Builder (`services/payload-builder.ts`)

Responsible for building email subject and body using variables.

Example:

```text
Hi {{name}}, your order {{orderId}} has been placed.
```

(Simple string replacement for now.)

---

#### Email Service (`services/email.service.ts`)

- Configure Nodemailer transporter
- Send email via `sendMail`

```ts
sendMail({ from, to, subject, html });
```

---

### 4.7 Consumer (`consumers/email.consumer.ts`)

- Connect to RabbitMQ
- Consume messages from `email_queue`
- Build email payload
- Send email using `email.service`
- Acknowledge on success
- On failure: log error and requeue (basic retry)

---

### 4.8 Bootstrap (`index.ts`)

- Start Express HTTP server
- Initialize RabbitMQ consumer in the background

---

## 5. Basic Flow

1. Client calls `POST /v1/send`
2. Request is validated
3. Message is published to RabbitMQ
4. API responds immediately (`202 Accepted`)
5. Consumer processes queue
6. Email is sent via SMTP
7. Result is logged

---

## 6. Testing & Running

### Tests

- Mock RabbitMQ producer
- Mock Nodemailer transporter
- Test validation and controller logic

```bash
npm test
```

---

### Run Locally

```bash
npm run dev
```

Test with curl:

```bash
curl -X POST http://localhost:3000/v1/send \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj_1",
    "to": [{ "channel": "email", "email": "test@example.com" }],
    "variables": { "name": "John", "orderId": "123" }
  }'
```

Expected result:

- API returns `queued`
- Email is delivered

---

## 7. Assumptions & Tradeoffs

- No database (in-memory deduplication only)
- Inline content only (no template service)
- At-least-once delivery
- Single email per message
- No authentication or quotas
- No queue priority handling
- Errors logged to console only

---

## 8. Open Questions / Future Enhancements

- **Auth**: Add API key or auth-service integration?
- **SMTP**: Lock to a provider (SendGrid/SES) or keep generic?
- **Templates**: External template service or DB?
- **Deduplication**: Move to Redis?
- **Retries**: Scheduled retries + DLQ?
- **Observability**: Events, metrics, webhooks?

---

## 9. Next Steps

- Implement current plan
- Add Redis-based idempotency
- Add DLQ & retry scheduler
- Introduce auth & rate limiting
- Support additional channels (SMS, WhatsApp, Push)

---

**Status**: Ready for implementation 🚀
