---
sidebarTitle: Hybrid Search
title: Hybrid Search
__path__: >-
  [{"title":"search","route":"/search"},{"title":"Hybrid
  Search","route":"/search/hybrid-search"}]
---

# Hybrid Search

Combines both semantic and keyword search capabilities to provide comprehensive results that match both meaning and specific terms.

## Basic Search

When you need results that match both concepts and exact terms, [Hybrid Search](/content-api/search/hybrid-search) is your solution. For example, searching for “AI in healthcare” will find documents that are conceptually about healthcare AI and contain those specific keywords.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .search.hybrid("AI in healthcare", {
                  properties: ["text", "title"]
                })
                .select("title", "text", "autoSummary")
                .exec();
```

```
{
  Get {
    TextDocument(hybrid: {
      query: "AI in healthcare",
      properties: ["text", "title"]
    }) {
      _additional {
        score
      }
      title
      text
      autoSummary
    }
  }
}
```

## 

Response

## Advanced Search

Sometimes you need to fine-tune your search results by combining vectors with specific keyword matching. Using [Advanced Hybrid Search](/content-api/search/hybrid-search#advanced-usage), you can prioritize certain fields like titles and tags while maintaining semantic relevance.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .googleDoc
                .search.hybrid("Generative AI", {
                  alpha: 0.7,
                  vector: [0.0055148206, 0.013368472, 0.035909854, ...],
                  fusionType: "relativeScoreFusion",
                  properties: ["title", "tags"]
                })
                .exec();
```

```
{
  Get {
    TextDocument(
      hybrid: {
        query: "Generative AI",
        alpha: 0.7,
        vector: [0.0055148206, 0.013368472, 0.035909854, ...],
        fusionType: relativeScoreFusion,
        properties: ["title", "tags"]
      }
    ) {
      _additional {
        score
      }
      title
      autoSummary
    }
  }
}
```

## 

Response

Learn more in our [Hybrid Search Guide](/content-api/search/hybrid-search).

[Keyword Search](/search/keyword-search "Keyword Search")[Similarity Search](/search/similarity-search "Similarity Search")