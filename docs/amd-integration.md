# AMD Integration

## Overview

SystemForge is designed as an AI-native workflow redesign platform where the inference layer is built for AMD-powered production deployment.

The platform transforms fragmented manual workflows into production-grade system architectures using a multi-agent reasoning engine composed of Architect, Critic, and Refiner agents.

While development mode uses Groq for rapid iteration and local testing, the production architecture is designed for AMD GPU inference using ROCm, vLLM, and Qwen models.

This enables scalable, low-latency, enterprise-grade workflow redesign with a clean migration path from development to production.

---

# Inference Architecture

## Development Mode

```text
Frontend (Next.js)
        ↓
FastAPI Backend
        ↓
CrewAI Multi-Agent Engine
        ↓
Groq API (Development Inference)
        ↓
Structured JSON Output
        ↓
Dynamic UI Rendering
```

Development mode is optimized for:

* rapid iteration
* fast debugging
* zero local GPU dependency
* no large model downloads
* simplified testing flow
* frontend/backend integration speed

This allows the full product to be built and validated before production GPU deployment.

---

## Production Mode

```text
Frontend (Next.js)
        ↓
FastAPI Backend
        ↓
CrewAI Multi-Agent Engine
        ↓
Qwen Models via vLLM
        ↓
AMD GPUs via ROCm
        ↓
Structured JSON Output
        ↓
Dynamic Workflow Redesign UI
```

Production mode enables:

* parallel agent execution
* low-latency inference
* enterprise-scale workflow redesign
* higher throughput
* production-grade reliability
* infrastructure ownership
* reduced external API dependency

This is the final intended deployment architecture.

---

# Why AMD

## Inference Layer Acceleration

SystemForge uses multiple specialized agents:

* Architect Agent
* Critic Agent
* Refiner Agent

Each agent performs independent reasoning tasks and generates structured system outputs.

These agents require:

* repeated inference calls
* structured generation consistency
* fast response time
* parallel execution capability
* scalable throughput for enterprise workloads

AMD GPUs improve this layer by providing:

* accelerated model serving
* lower inference latency
* better multi-agent throughput
* efficient production deployment
* full control over inference infrastructure

AMD is not used in the frontend layer.

AMD powers the backend reasoning engine.

This distinction is critical.

---

# Qwen + vLLM + ROCm Stack

## Qwen Models

Qwen is used for:

* workflow redesign reasoning
* architecture generation
* production validation
* operational risk detection
* system refinement

The model is optimized for structured engineering output rather than conversational output.

---

## vLLM

vLLM is used for:

* high-performance model serving
* parallel inference requests
* low-latency response generation
* efficient token streaming
* production-grade LLM deployment

This is essential for multi-agent execution.

---

## ROCm

ROCm provides:

* AMD GPU acceleration
* optimized inference execution
* deployment compatibility
* infrastructure scalability
* production GPU orchestration

This is the core AMD integration layer.

---

# Environment-Based Provider Switching

SystemForge uses an abstraction layer inside:

```text
src/tools/llm.py
```

This allows dynamic switching between:

## Development Provider

```env
LLM_PROVIDER=groq
```

and

## Production Provider

```env
LLM_PROVIDER=amd
```

without changing:

* frontend code
* agent logic
* workflow engine
* API contracts
* UI rendering

Only the inference provider changes.

This ensures architecture stability and production readiness.

---

# Example Configuration

## Development

```env
LLM_PROVIDER=groq
GROQ_API_KEY=your_key_here
```

---

## Production

```env
LLM_PROVIDER=amd
AMD_API_KEY=your_key_here
AMD_BASE_URL=your_endpoint_here
AMD_MODEL=qwen
```

This creates a clean migration path from development to production deployment.

---

# Where AMD Is Used

A common question is:

## “Where exactly is AMD used in SystemForge?”

The answer:

AMD powers the inference layer.

The frontend sends workflow redesign requests to the backend multi-agent system.

The backend runs Architect, Critic, and Refiner agents using Qwen models served through vLLM on AMD GPUs accelerated by ROCm.

This enables:

* fast workflow redesign generation
* scalable multi-agent reasoning
* reduced inference latency
* production-grade architecture generation
* enterprise deployment readiness

AMD is the execution engine behind the AI system architecture.

---

# Future Production Expansion

The production roadmap includes:

* dedicated vLLM deployment clusters
* queue-based async workflow execution
* Redis task orchestration
* PostgreSQL workflow persistence
* observability pipelines
* distributed tracing
* production monitoring
* enterprise deployment patterns

The AMD inference layer remains the central compute engine for the platform.

---

# Summary

SystemForge is built with a development-first and production-ready architecture.

Development uses Groq for speed.

Production uses:

* AMD GPUs
* ROCm
* Qwen
* vLLM

This ensures the platform remains:

* scalable
* reliable
* deployable
* cost-efficient
* enterprise-ready
* portfolio-grade

The system is not simply AI-assisted UI generation.

It is a full production workflow redesign engine powered by AMD inference architecture.
