---
sidebarTitle: Record Similarity
title: Record Similarity
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Record
  Similarity","route":"/content-api/search/record-similarity"}]
---

# Record Similarity

Record similarity is a way to see how alike objects are. You can use this to find objects that look like a specific one. For instance, if you have many Google Docs, you can use this to find docs that are like Doc A. In the past, you had to look at things like keywords or topics to find similar items. But with similarity search in Unbody, this isn’t necessary. You can compare the whole document.

## Syntax

Similarity search can be performed on any object. Here’s how:

SDK (.ts)

GraphQL

## Usage

### Example 1 - Google Docs

Find Google Docs that are similar to a specific Google Doc.

SDK (.ts)

GraphQL

### Example 2 - Discord messages

SDK (.ts)

GraphQL

### Example 3 - Any text block

SDK (.ts)

GraphQL

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| id\* | string | The ID of the object to find similar items to |
| certainty | number | Normalized similarity threshold between 0 (identical) and 1 (completely different) |
| distance | number | Distance threshold for similarity matching |

[Visual Similarity](/content-api/search/visual-similarity "Visual Similarity")[Overview](/content-api/search/overview "Overview")