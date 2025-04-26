---
sidebarTitle: Similarity Search
title: Similarity Search
__path__: >-
  [{"title":"search","route":"/search"},{"title":"Similarity
  Search","route":"/search/similarity-search"}]
---

# Similarity Search

Find similar content across text, images, and records based on their characteristics and patterns.

## Text Similarity

When you want to find related documents based on their concepts, use text similarity search. For example, if you have a document about AI technology, use `similar.text()` to find other documents discussing related concepts like machine learning.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textBlock
                .similar.text("artificial intelligence", {
                  certainty: 0.8
                })
                .exec();
```

```
{
  Get {
    TextDocument(
      nearText: {
        concepts: ["resume"],
        certainty: 0.8
      }
    ) {
      _additional {
        certainty
        distance
      }
      createdAt
      html
      mimeType
      modifiedAt
      originalName
      path
      pathString
      remoteId
      sourceId
      subtitle
      description
      tags
      text
      title
      properties
      toc
      authors
    }
  }
}
```

## 

Response

## Advanced Text Similarity

Sometimes you need to steer your search results toward specific themes while maintaining similarity. Use advanced text similarity with concept steering to fine-tune your results based on particular topics.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .similar.text(["AI", "machine learning"], {
                  certainty: 0.65,
                  moveTo: {
                    concepts: ["future"],
                    force: 0.5
                  }
                })
                .select("title", "text", "autoSummary", "authors", "createdAt")
                .limit(2)
                .exec();
```

```
{
  Get {
    TextDocument(
      nearText: {
        concepts: ["AI", "machine learning"], 
        certainty: 0.65, 
        moveTo: {
          concepts: ["future"], 
          force: 0.5
        }
      }
      limit: 2
    ) {
      _additional {
        certainty
        distance
      }
      title
      text
      autoSummary
      authors
      createdAt
    }
  }
}
```

## 

Response

## Image Similarity

When you need to find visually similar images regardless of their metadata, use `similar.image()` method. This helps you discover images with matching colors, objects, or compositions. [Learn more about Visual Similarity](/content-api/search/visual-similarity).

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .imageBlock
                .similar.image("https://www.treadfirst.co.uk/wp-content/uploads/2023/05/riseBlog.jpg", {
                  certainty: 0.65
                })
                .select("originalName", "url")
                .limit(5)
                .exec();
```

```
query {
  Get {
    ImageBlock(
      nearImage: {
        image: "https://www.treadfirst.co.uk/wp-content/uploads/2023/05/riseBlog.jpg"
        certainty: 0.65
      }
      limit: 5
    ) {
      _additional {
        certainty
        distance
      }
      originalName
      url
    }
  }
}
```

## 

Response

## Record Similarity

When you have a document you like and want to find similar ones, use `.similar.record()` method. [Learn more about Record Similarity](/content-api/search/record-similarity).

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .similar.record("201704f2-1aee-53bc-b6d2-463baf3f160f", {
                  certainty: 0.75
                })
                .select("title", "originalName", "autoSummary", "authors")
                .limit(5)
                .exec();
```

```
query {
  Get {
    TextDocument(
      nearObject: {
        id: "201704f2-1aee-53bc-b6d2-463baf3f160f"
        certainty: 0.75
      }
      limit: 5
    ) {
      _additional {
        certainty
        distance
      }
      title
      originalName
      autoSummary
      authors
    }
  }
}
```

## 

Response

[Hybrid Search](/search/hybrid-search "Hybrid Search")[Rerankers](/search/rerankers "Rerankers")