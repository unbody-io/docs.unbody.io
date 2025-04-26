---
sidebarTitle: Visual Similarity
title: Visual Similarity
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Visual
  Similarity","route":"/content-api/search/visual-similarity"}]
---

# Visual Similarity

This method can be particularly useful when you want to find images that have a similar aesthetic, color scheme, or subject matter. It works by comparing the visual characteristics of the images and determining how similar they are.

## Syntax

Visual similarity search can be performed on any `imageBlock`. Here’s how:

SDK (.ts)

GraphQL

## Usage

### Example 1 - image blocks

SDK (.ts)

GraphQL

### Arguments

| Name | Type | Description |
| --- | --- | --- |
| id\* | string | The ID of the reference image to find similar images |
| certainty | number | Normalized similarity threshold between 0 (identical) and 1 (completely different) |
| distance | number | Distance threshold for similarity matching |

[Hybrid Search](/content-api/search/hybrid-search "Hybrid Search")[Record Similarity](/content-api/search/record-similarity "Record Similarity")