---
sidebarTitle: Overview
title: Overview
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Overview","route":"/content-api/search/overview"}]
---

# Search Overview

Unbody provides several search methods to help you find relevant content in your data. Each method serves a different purpose and can be used alone or in combination with others.

## Available Methods

[Semantic SearchSearch based on meaning rather than exact matches](/content-api/search/semantic-search)[Keyword SearchSearch using exact keyword matches](/content-api/search/keyword-search)[Hybrid SearchCombine semantic and keyword search](/content-api/search/hybrid-search)[Visual SimilarityFind visually similar images](/content-api/search/visual-similarity)[Record SimilarityFind similar records](/content-api/search/record-similarity)

## Basic Usage

All search methods follow a similar pattern:

```
// Using the SDK
const { data } = await unbody.get
  .collection("TextDocument")
  .search.about("my search query")
  .exec();
 
// Using GraphQL
const query = `
  query {
    Get {
      TextDocument(
        nearText: {
          concepts: ["my search query"]
        }
      ) {
        title
        content
      }
    }
  }
`;
```

## Combining Search Methods

You can combine different search methods with filters, sorting, and pagination:

```
const { data } = await unbody.get
  .collection("TextDocument")
  .search.about("my search query")
  .where({ category: "blog" })
  .sort("createdAt", "desc")
  .limit(10)
  .exec();
```

## Next Steps

Click on any search method above to learn more about its specific capabilities and usage.

[Record Similarity](/content-api/search/record-similarity "Record Similarity")[Generative](/content-api/generative "Generative")