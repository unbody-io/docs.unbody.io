---
sidebarTitle: Keyword Search
title: Keyword Search
__path__: >-
  [{"title":"search","route":"/search"},{"title":"Keyword
  Search","route":"/search/keyword-search"}]
---

# Keyword Search

Search based on exact keyword matches within your data, ideal for precise matching when users know specific terms they’re looking for. [Learn more about Keyword Search](/content-api/search/keyword-search).

## Basic Search

When you need to find documents containing specific terms exactly as written, [Keyword Search](/content-api/search/keyword-search) is your best option. For instance, searching for “machine learning” will return only documents that contain that exact phrase.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .search.find("machine learning")
                .select("originalName", "text", "autoSummary")
                .exec();
```

```
{
  Get {
    TextDocument(bm25: {
      query: "machine learning"
    }) {
      _additional {
        score
      }
      originalName
      text
      autoSummary
    }
  }
}
```

## 

Response

## Field-Specific Search

Sometimes you want to search for keywords only in certain parts of your documents - like titles or summaries - while ignoring the main content.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .search.find("neural networks", ["title", "autoSummary"])
                .select("originalName", "properties", "autoSummary")
                .exec();
```

```
{
  Get {
    TextDocument(
      bm25: {
        query: "neural networks",
        properties: ["title", "autoSummary"]
      }
    ) {
      _additional {
        score
      }
      originalName
      properties
      autoSummary
    }
  }
}
```

## 

Response

Learn more in our [Keyword Search Guide](/content-api/search/keyword-search).

[Semantic Search](/search/semantic-search "Semantic Search")[Hybrid Search](/search/hybrid-search "Hybrid Search")