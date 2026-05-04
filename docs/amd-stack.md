# AMD Stack

## SystemForge AI

### Why AMD Infrastructure is a Core Product Decision

---

# 1. Overview

SystemForge AI is designed around deep architectural reasoning and multi-agent orchestration.

The Planner Agent requires high-context understanding, long-chain reasoning, and the ability to evaluate multiple production tradeoffs at once.

This cannot be reliably achieved with lightweight inference or simple API-based prompting alone.

For this reason, AMD infrastructure is not just a hosting choice.

It is a core product decision.

The system is intentionally built using:

* AMD Developer Cloud
* ROCm
* vLLM
* Qwen models

This stack enables high-capacity reasoning, efficient inference, and full control over model behavior.

---

# 2. Why Not API-Only LLM Usage

Many AI projects rely entirely on external APIs for model access.

This creates limitations such as:

* request latency
* token cost scaling
* dependency on third-party service availability
* restricted control over inference optimization
* limited experimentation for benchmarking

For SystemForge AI, architecture planning is the most critical workflow.

The Planner Agent must handle:

* system decomposition
* production tradeoff analysis
* multi-step reasoning
* architecture validation loops

This requires stronger reasoning depth and infrastructure flexibility.

Running models directly on AMD GPUs allows significantly better control over these workloads.

---

# 3. AMD Developer Cloud

## Purpose

AMD Developer Cloud provides on-demand access to AMD Instinct GPUs without requiring local GPU ownership or infrastructure management.

This allows rapid experimentation with large model inference and production-style benchmarking.

---

## Why It Fits SystemForge AI

The project benefits from:

* high-performance GPU access
* flexible experimentation
* model hosting without local hardware constraints
* infrastructure benchmarking
* scalable inference testing

This is especially important for the Planner Agent, where reasoning quality directly affects system value.

---

## Primary Usage Areas

* hosting Qwen reasoning models
* serving multi-agent inference workflows
* testing latency across agent chains
* benchmarking architecture generation quality
* validating deployment feasibility

---

# 4. ROCm (Radeon Open Compute)

## Purpose

ROCm is AMD’s open-source GPU computing platform and serves as the AMD-native alternative to CUDA.

It provides optimized execution for AI/ML workloads using frameworks such as PyTorch and TensorFlow.

---

## Why It Matters

SystemForge AI is designed to run production inference on AMD hardware rather than depending on external API-only services.

ROCm enables:

* optimized PyTorch inference
* GPU acceleration for large models
* direct model experimentation
* infrastructure-level performance tuning
* open-source deployment flexibility

This improves both performance and architectural ownership.

---

# 5. vLLM

## Purpose

vLLM is the inference engine used to serve large language models efficiently.

It is chosen for high-throughput, low-latency serving and strong support for AMD + ROCm workflows.

---

## Why It Matters

The Planner Agent depends on strong inference performance.

Without optimized model serving:

* latency increases rapidly
* agent orchestration becomes unstable
* reasoning quality suffers under constrained execution

vLLM improves:

* token throughput
* memory efficiency
* multi-request handling
* large model serving stability

This is critical for maintaining reliable multi-agent workflows.

---

# 6. Why Qwen Models

## Primary Model Choice

Qwen is selected as the primary reasoning model for the Planner Agent.

---

## Why Qwen

SystemForge AI requires:

* strong reasoning quality
* architecture decomposition ability
* long-context understanding
* structured planning capability
* technical decision support

Qwen performs strongly in these areas and aligns well with:

* planning workflows
* engineering analysis
* architecture generation
* critical system reasoning

This makes it the strongest fit for the Planner role.

---

## Role Separation Strategy

### Qwen

Used for:

* Planner Agent
* complex Self-Healing workflows

because deep reasoning matters most here.

---

### Llama / Mistral

Used for:

* Research Agent
* Critic Agent
* Security Auditor

because these tasks prioritize:

* focused evaluation
* precision
* lower inference cost
* faster execution

This improves system efficiency without sacrificing output quality.

---

# 7. AMD as Product Strategy

The infrastructure story is part of the product—not separate from it.

SystemForge AI is not:

> an AI app deployed somewhere

It is:

> an autonomous engineering system intentionally designed around high-performance reasoning workloads

AMD makes this possible by enabling:

* high-capacity model execution
* experimentation beyond API limits
* infrastructure benchmarking
* production-style deployment architecture

This makes the system stronger technically and strategically.

---

# 8. Build-in-Public Learnings

The AMD stack also creates meaningful engineering documentation opportunities.

Public technical breakdowns include:

* deploying Qwen on AMD GPUs
* lessons from ROCm setup
* inference optimization with vLLM
* latency comparison vs API-based LLM usage
* architecture reasoning quality improvements

These learnings are valuable beyond the project itself and become part of the long-term portfolio.

---

# 9. Future Expansion

As the system grows, AMD infrastructure supports expansion into:

* larger planning models
* MLOps architecture generation
* enterprise system design workflows
* agent benchmarking pipelines
* architecture simulation environments

This makes the platform scalable beyond the initial implementation.

---

# Final Note

AMD infrastructure is not a deployment detail.

It is one of the reasons SystemForge AI can exist in its intended form.

Without high-performance reasoning, the Planner Agent becomes weak.

Without strong planning, the system becomes another chatbot.

The AMD stack is what allows SystemForge AI to become an autonomous engineering system rather than a simple AI assistant.
