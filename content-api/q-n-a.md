---
sidebarTitle: Q N A
title: Q N A
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"Q N
  A","route":"/content-api/q-n-a"}]
---

# Generative QnA

Generative QnA leverages the `ask{}` operator to directly extract answers from data objects, offering an intuitive querying tool for developers. This feature is accessible through our GraphQL interface or directly via our JavaScript SDK, making it versatile for different development environments.

The `ask{}` operator allows you to input a question directly into the query, and Unbody returns the specific answer, streamlining the process of extracting precise information from large datasets.

## Using the `ask{}` Operator

Here’s how to structure your queries using the `ask{}` operator in both GraphQL and the JavaScript SDK to effectively use the Generative Q&A feature:

SDK (.ts)

GraphQL

### Example 1 - Generative Q&A for Document Retrieval

SDK (.ts)

GraphQL

### Understanding the Response

Both the JavaScript SDK and GraphQL responses for an `ask{}` query include detailed information about the answer:

SDK (.ts)

GraphQL

QnA must be configured during project creation to use Generative QnA. Configure QnA using [Dashboard](https://app.unbody.io/projects) or [Admin API](http://localhost:3001/admin-api#qna-configuration)

[Generative](/content-api/generative "Generative")[Get](/content-api/query-methods/get "Get")