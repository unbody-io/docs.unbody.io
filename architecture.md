---
title: Architecture
description: Understanding the architecture of Unbody
__path__: '[{"title":"Architecture","route":"/architecture"}]'
---

# Unbody Architecture

If software is becoming more like humans—able to **think**, **speak**, and **act**—then the backend that powers it needs to work like a brain. That’s why Unbody is built on **four functional layers** that mirror how intelligent systems (or humans) operate:

-   **Perception** _(Knowledge Fabrication)_: how it sees and understands the world
-   **Memory** _(Storage and Persistent Memory)_: what it knows and remembers
-   **Reasoning** _(AI & Autonomy)_: how it thinks, decides, and plans
-   **Action** _(APIs & Middleware Control Plane)_: how it interacts with others and takes initiative

Each layer in the Unbody stack corresponds to a set of modular components that work together to turn raw data into structured knowledge, reason over that knowledge, and expose it to the outside world via powerful APIs.

Unbody is built primarily in **Node.js**, with a clean modular structure and plugin-friendly design. Each component can be extended, replaced, or deployed independently.

## General Workflow

At a high level, the flow of data in Unbody looks like this:

1.  **Knowledge Fabrication** or Indexing— the process of transforming and processing raw content into enriched, structured knowledge.
2.  **Using the Knowledge Base** — once data is indexed, interact with it through [Unbody’s Content API](/content-api/overview) and build intelligent features on top.

Unbody also offers standalone [Generative APIs](/generative-api/overview), including text, JSON, and image generation. These can be used independently or applied within the content API flow (e.g. for RAG or summarization).

## 🌳 Perception _(Knowledge Fabrication)_

Where raw content becomes structured, enriched knowledge.

Includes:

-   [Data Ingestion & Processing](/data-ingestion/overview)
-   [Enhancers](/project-configurations/enhancers)
-   [Vectorizers](/project-configurations/vectorizers)

## 📂 Memory _(Persistent Storage & Vector Memory)_

Stores all enriched data for future retrieval and reasoning.

Includes:

-   **Vector Stores**: Cloud version currently uses Weaviate as the only vector store. Possiblty of modular vector stores is introduced in our open-source version.
-   **File Storage**: Cloud version only one singular built-in cloud storage. Possiblty of modular storage is introduced in our open-source version.
-   **Media CDN**: Only avaiable on Cloud. Read more: [Image](/image-api/overview), [Video](/video-api), and [Audio](/audio-api)

## 🧠 Reasoning _(AI Modules & Autonomy)_

Adds intelligence through generation, decision-making, and context-aware behavior.

-   [Text Generation](/generative-api/text)
-   [JSON Generation](/generative-api/json)
-   **Image Generation** (WIP)
-   **Function Calling** (WIP)

Generative modules can be used independently or embedded in [Content API](/content-api/overview) queries to create agentic flows like RAG.

## 🌐 Action _(APIs & Middleware Control Plane)_

Interfaces to interact with your knowledge base and trigger workflows.

-   [Content API](/content-api/overview)
-   [Push API](/content-api/overview)
-   [Admin API](/admin-api)
-   **MCP** (WIP)

## Projects & Configuration

Every instance of Unbody is called a **Project**. A project defines a schema, vectorizer, and set of data sources to build your knowledge base.

-   Each project can have one or more [Data Sources](/data-ingestion/overview), connected via [Data Source Providers](/data-ingestion/overview#providers).
-   Projects are created using a [configuration schema](/project-configurations/overview) that defines the pipeline and indexing behavior.

⚠️

**Limitation**: Project settings cannot currently be edited after creation (e.g. schema or vectorizer). This is a known limitation and a fix is in progress.

## Deployment Models

Unbody can be deployed in two modes:

-   **Unbody Cloud**: Fully managed, with built-in storage, scaling, CDN, and zero-setup APIs
-   **Unbody OSS**: Self-hosted and open-source, with modular plugin support and full control

[Concepts](/concepts "Concepts")[Semantic Search](/search/semantic-search "Semantic Search")