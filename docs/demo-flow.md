# Demo Flow

## Overview

SystemForge is an AI-native workflow redesign platform that transforms fragmented manual workflows into production-grade system architectures.

Instead of generating simple automation suggestions, the platform redesigns operational systems using a structured multi-agent reasoning engine composed of:

* Architect Agent
* Critic Agent
* Refiner Agent

The final output is a deployable system blueprint with workflow transformation, operational redesign, architecture validation, and production-readiness analysis.

The demo should present SystemForge as a real engineering platform focused on workflow modernization and enterprise system redesign.

---

# Demo Scenario

## Example Input

Use a workflow that clearly shows operational friction.

Recommended example:

### Hospital Approval Workflow

```text id="5mrm2p"
Patient fills intake form
Reception manually verifies insurance
Doctor manually reviews reports
Lab sends PDF reports by email
Admin manually updates billing
```

This works well because the pain points are obvious and the redesign is visually strong.

Alternative demo scenarios:

* Insurance Claims Workflow
* Recruitment Approval Chain
* Accounting Invoice Approval
* Internal Compliance Workflow
* Vendor Approval Pipeline

---

# Live Demo Sequence

## Step 1 — Workflow Input

Open the platform and introduce the workflow builder.

Explain that users can enter real operational workflows exactly as they exist today, without needing technical formatting.

Paste the hospital workflow example into the builder.

This demonstrates that SystemForge starts from operational reality rather than ideal architecture assumptions.

---

## Step 2 — Generate Workflow Redesign

Trigger the redesign process.

Explain that the backend activates a three-agent reasoning system:

### Architect

Builds the initial system design and transforms manual operations into scalable architecture.

### Critic

Reviews the generated architecture like a production engineer and identifies bottlenecks, risks, and failure points.

### Refiner

Uses critic feedback to improve reliability, deployment readiness, and operational resilience.

This shows that the platform is not generating a single answer, but running structured architectural reasoning.

---

## Step 3 — Before → After Transformation

Show the workflow transformation section.

Highlight how manual steps are redesigned into production-grade system flows.

Example transformation:

### Before

```text id="yjv5m1"
Reception manually verifies insurance
Lab sends PDF reports by email
Admin manually updates billing
```

### After

```text id="yebp2j"
Insurance validation API
Automated lab integration pipeline
Billing automation with EHR sync
```

This demonstrates measurable operational redesign rather than surface-level automation.

---

## Step 4 — Operational Redesign Breakdown

Show the workflow comparison section.

Explain how SystemForge breaks each workflow step into:

* original operational problem
* redesigned architecture
* business impact

This gives engineering clarity instead of generic AI recommendations.

It helps teams understand exactly what changed and why.

---

## Step 5 — Agent Decision Intelligence

Move to the agent reasoning section.

Show how each agent contributes specialized decisions.

### Architect Output

Service boundaries, approval engine design, event-driven workflow creation.

### Critic Output

Detection of SPOFs, missing retries, PDF dependency risks, audit visibility gaps.

### Refiner Output

Fallback paths, observability layers, retry systems, production hardening.

This proves the system is performing architecture review rather than simple text generation.

---

## Step 6 — Final Architecture Blueprint

Show the production architecture layers.

Explain how the platform outputs a deployable blueprint covering:

* workflow interface layer
* multi-agent reasoning layer
* inference and compute layer
* production infrastructure layer

This makes the output implementation-ready for engineering teams.

---

## Step 7 — Final System Impact

Show measurable outcome metrics:

* production readiness
* manual work reduction
* workflow execution speed
* scalability improvement

This helps decision-makers understand business value, not just technical design.

---

# AMD Inference Layer

## Where AMD Is Used

SystemForge uses AMD in the inference layer.

The frontend sends workflow redesign requests to the backend multi-agent system.

The backend runs Architect, Critic, and Refiner agents using Qwen models served through vLLM on AMD GPUs accelerated by ROCm.

This enables:

* fast workflow redesign generation
* scalable multi-agent execution
* lower inference latency
* production-grade architecture generation
* enterprise deployment readiness

AMD powers the execution engine behind the system architecture.

It is not a frontend integration.

It is the core compute layer.

---

# Development and Production Architecture

## Development Mode

Current development uses:

* Groq API
* FastAPI backend
* CrewAI multi-agent engine
* dynamic frontend rendering

This allows fast iteration and rapid testing.

---

## Production Mode

Final production deployment uses:

* AMD GPUs
* ROCm
* Qwen models
* vLLM serving
* scalable multi-agent execution

Only the inference provider changes.

The workflow engine, agent logic, frontend, and API contracts remain unchanged.

This ensures a clean migration path to production.

---

# Closing Summary

SystemForge is not a workflow visualization tool.

It is a production workflow redesign engine.

The platform takes fragmented operational systems and transforms them into deployable AI-native architectures using structured multi-agent reasoning.

The result is:

* architecture clarity
* operational redesign
* deployment readiness
* measurable business improvement
* enterprise-grade system modernization

The goal is not better documentation.

The goal is better systems.
