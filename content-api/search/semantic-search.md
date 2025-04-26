---
sidebarTitle: Semantic Search
title: Semantic Search
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Semantic
  Search","route":"/content-api/search/semantic-search"}]
---

# Semantic Search

Semantic search is a method that lets users search data based on the meaning of their query. Users can use any form of natural human language and still get the same results. This differs from classic search, which relies on exact keyword matching.

For instance, if you’ve got a collection of documents about Quentin Tarantino, Maradona, and Elon Musk, the user doesn’t need to type the full term “Quentin Tarantino” to find documents about him. Instead, they can enter phrases like “a movie director” or “who made Pulp Fiction” and still reach the same results. This method is best to use when you need to provide a more intuitive and user-friendly search experience, handle queries with ambiguity, or when you want to provide more relevant search results based on the context of the query.

## Syntax

You can perform semantic searches on virtually any text (`string`) field of any object. Here’s how:

SDK (.ts)

GraphQL

## Usage

### Example 1 - Google Docs

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
| concepts\* | string | string\[\] | The concept(s) to search for |
| moveTo | object | Boost results towards specified concepts or objects with a force factor |
| moveAwayFrom | object | Move results away from specified concepts or objects with a force factor |
| certainty | number | Minimum certainty threshold for results (0 to 1) |
| distance | number | Distance threshold for similarity matching |
| autocorrect | boolean | Enable automatic correction of search terms |

## Advanced Usage

### Fine-Tuning with moveTo and moveAwayFrom

**`moveTo`** and **`moveAwayFrom`** are very powerful advanced functionalities that enable you to steer your search query towards or away from specific concepts. You can probably sense how powerful this concept is which gives you precise control over your search results.

**Example: Balancing Concepts**  
For example, let’s’ consider you’re searching for articles related to web development, but you want a balanced view, considering both frontend and backend perspectives. The example given below imitates the scenario.

SDK (.ts)

GraphQL

## Optimizing Search with Filtering

Let us now have a look at how you can enhance your search results by boosting certain properties and applying [filters](/content-api/filters) to hone in on the most relevant data.

### Conditional Filtering

You can also apply [filters](/content-api/filters) to your semantic search queries. It helps to narrow down results based on specific conditions.

**Example: Filtering by mimeType**

SDK (.ts)

GraphQl

[Search](/content-api/search "Search")[Keyword Search](/content-api/search/keyword-search "Keyword Search")