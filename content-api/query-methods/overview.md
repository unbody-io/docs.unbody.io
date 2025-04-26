---
sidebarTitle: Overview
title: Overview
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"query-methods","route":"/content-api/query-methods"},{"title":"Overview","route":"/content-api/query-methods/overview"}]
---

# Query Methods Overview

Unbody provides several methods for querying and manipulating data. Each method serves a specific purpose and can be combined with others for complex operations.

## Available Methods

[Get](/content-api/query-methods/get)[Ask](/content-api/query-methods/ask)[Aggregate](/content-api/query-methods/aggregate)[Group](/content-api/query-methods/group)

## Basic Usage

All query methods follow a similar pattern:

```
// Using the SDK
const { data } = await unbody.get
  .collection("TextDocument")
  .select("title", "content")
  .exec();
 
// Using GraphQL
const query = `
  query {
    Get {
      TextDocument {
        title
        content
      }
    }
  }
`;
```

## Combining Methods

You can combine different query methods with filters, sorting, and pagination:

```
const { data } = await unbody.get
  .collection("TextDocument")
  .where({ title: "My Document" })
  .sort("createdAt", "desc")
  .limit(10)
  .exec();
```

## Next Steps

Click on any method above to learn more about its specific capabilities and usage.

[Aggregate](/content-api/query-methods/aggregate "Aggregate")[Overview](/content-api/data-types/overview "Overview")