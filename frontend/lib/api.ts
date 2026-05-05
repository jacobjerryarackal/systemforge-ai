import type { ForgeResponse } from './types';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function runForge(projectDescription: string): Promise<ForgeResponse> {
  const res = await fetch(`${BACKEND_URL}/forge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_description: projectDescription }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Mock Mode ────────────────────────────────────────────────────────────────
// Realistic fake data with proper delays. Indistinguishable from live until
// AMD credits arrive.

export async function runForgeMock(projectDescription: string): Promise<ForgeResponse> {
  const sessionId = Math.random().toString(36).slice(2);
  const startedAt = Date.now();

  await delay(2200);

  const architectContent = `# Production Architecture: ${projectDescription.slice(0, 50)}

## System Overview
Microservices architecture deployed on Kubernetes with AMD GPU nodes for ML inference workloads.

## Core Services
- **API Gateway** (Kong): Rate limiting, auth, routing — 3 replicas
- **Auth Service**: JWT + OAuth2 via Keycloak, Redis session store
- **Core Business Logic**: 5 stateless pods, horizontal autoscaling (5–50 replicas)
- **ML Inference Engine**: vLLM on AMD MI300X, Qwen2.5-7B model serving
- **Event Bus**: Apache Kafka (3 brokers, 6 partitions, replication factor 3)
- **Data Layer**: PostgreSQL primary + 2 read replicas, Redis cache cluster

## Infrastructure
- **Cloud**: Multi-AZ deployment across 3 availability zones
- **Networking**: VPC with private subnets, NAT gateway, internal load balancer
- **Storage**: S3-compatible object storage for model artifacts
- **Secrets**: HashiCorp Vault for credential management

## Scalability
Auto-scaling policies targeting 70% CPU/GPU utilization. CDN for static assets with edge caching.`;

  await delay(1800);

  const criticContent = `# Critical Architecture Review — Senior SRE Assessment

## ⚠️ High Severity Issues

### 1. Single Point of Failure — API Gateway
Kong Gateway has no circuit breaker pattern defined. A gateway failure causes total service unavailability. **Required**: Implement Envoy sidecar with fallback routing.

### 2. Missing Observability Stack
No mention of distributed tracing (OpenTelemetry), structured logging aggregation (Loki/ELK), or SLO dashboards. **Required**: Full observability trinity — metrics, logs, traces.

### 3. ML Inference Fallback
vLLM endpoint has no degradation strategy. If AMD GPU node pool exhausts, requests will fail hard. **Required**: Define CPU fallback path with smaller model variant.

## 🟡 Medium Severity Issues

### 4. Database SPOF Risk
PostgreSQL failover SLA not defined. RTO/RPO targets missing. **Required**: Define less than 30s failover with automated promotion.

### 5. Kafka Retention Policy
No mention of dead letter queues or message TTL. **Required**: DLQ per topic plus 7-day retention minimum.

### 6. Security Gap
No mention of mTLS between services. **Required**: Service mesh (Istio/Linkerd) for zero-trust networking.

## Verdict: REQUIRES REVISION before production readiness.`;

  await delay(2000);

  const refinerContent = `# Refined Architecture v2.0 — Post-SRE Review

## Changes Applied from Critic Feedback

### ✅ Circuit Breaker Added
Envoy proxy sidecar deployed alongside Kong. Circuit breaker thresholds: 50% error rate over 10s window triggers open state. Fallback: static 503 page with retry-after header.

### ✅ Full Observability Stack Integrated
- **Metrics**: Prometheus + Grafana with AMD GPU metrics exporter
- **Tracing**: OpenTelemetry collector to Jaeger (sampled at 10% in prod)
- **Logging**: Fluentd to Loki to Grafana. Structured JSON format. 30-day retention.
- **Alerting**: PagerDuty integration via Alertmanager. SLO: 99.9% uptime (43m/month error budget)

### ✅ ML Inference Fallback Path
Primary: vLLM on AMD MI300X GPUs (Qwen2.5-7B)
Fallback: CPU inference with Qwen2.5-1.5B (quantized INT4)
Circuit logic: greater than 500ms P99 latency or greater than 5% error rate triggers automatic failover.

### ✅ Database HA Hardened
Patroni cluster for PostgreSQL automatic failover. RTO: less than 15s, RPO: less than 5s via synchronous replication to 1 replica.

### ✅ Zero-Trust Networking
Istio service mesh deployed. mTLS enforced between all services. SPIFFE identity for workload authentication.

### ✅ Kafka DLQs Configured
Dead letter queue per business topic. Max 3 retry attempts with exponential backoff. 14-day retention. Monitoring on DLQ depth.

## Architecture Confidence Score: 94/100 — Production Ready ✅`;

  return {
    session: {
      id: sessionId,
      projectDescription,
      startedAt,
      completedAt: Date.now(),
      isMockMode: true,
      outputs: [
        { agent: 'architect', content: architectContent, status: 'complete', duration: 2200 },
        { agent: 'critic', content: criticContent, status: 'complete', duration: 1800 },
        { agent: 'refiner', content: refinerContent, status: 'complete', duration: 2000 },
      ],
    },
  };
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
