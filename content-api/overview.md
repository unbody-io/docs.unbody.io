---
sidebarTitle: Overview
title: Overview
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"Overview","route":"/content-api/overview"}]
---

# Content API Overview

The Content API is the main interface for interacting with your data. It provides a powerful GraphQL API for querying and manipulating data, with features like semantic search, filtering, sorting, and aggregation.

## Getting Started

[Query MethodsLearn about different ways to query your data](/content-api/query-methods/overview)[Data TypesUnderstand the different data types available](/content-api/data-types/overview)[SearchExplore various search methods](/content-api/search)[FiltersFilter your data using various operators](/content-api/filters)[SortingSort your data in different ways](/content-api/sorting)[GenerativeGenerate content using AI](/content-api/generative)

## Basic Usage

💡

We assume that you have already read and learn about how to setup unbody project and also learn about the basics how to make request calls to Unbody API. If not please go to [First Project](/first-project) and have make sure you have followed all the steps.

### Querying Data

The Content API provides a GraphQL interface for querying data. You can use the SDK or make direct GraphQL queries.

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

### Filtering Data

You can filter data using various operators:

```
const { data } = await unbody.get
  .collection("TextDocument")
  .where({
    title: "My Document"
  })
  .exec();
```

### Sorting Data

Sort data using one or more fields:

```
const { data } = await unbody.get
  .collection("TextDocument")
  .sort("createdAt", "desc")
  .exec();
```

### Pagination

Control the number of results and implement pagination:

```
const { data } = await unbody.get
  .collection("TextDocument")
  .limit(10)
  .offset(0)
  .exec();
```

## Next Steps

Explore the different sections to learn more about specific features:

-   [Query Methods](/content-api/query-methods/overview)
-   [Data Types](/content-api/data-types/overview)
-   [Search](/content-api/search)
-   [Filters](/content-api/filters)
-   [Sorting](/content-api/sorting)
-   [Generative](/content-api/generative)

[Data Processors](/project-configurations/data-processors "Data Processors")[Authentication](/content-api/authentication "Authentication")