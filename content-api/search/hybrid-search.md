---
sidebarTitle: Hybrid Search
title: Hybrid Search
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Hybrid
  Search","route":"/content-api/search/hybrid-search"}]
---

# Hybrid Search

Hybrid search is a method that combines the benefits of both [semantic search](/content-api/search/semantic-search) and [keyword search](/content-api/search/keyword-search). This method provides users with comprehensive search results by considering both the meaning of the user’s search query and the exact keywords used.

This method is best to use when you want to provide comprehensive and contextually relevant search results even when the user’s search query contains both specific keywords and broader concepts.

## Syntax

Hybrid search can be performed on any text (`string`) field of any object. Here’s how:

SDK (.ts)

GraphQL

## Usage

### Example 1 - Google Docs

SDK (.ts)

GraphQL

### Example 2 - Discord Messages

SDK (.ts)

GraphQL

### Example 3 - Any text block

SDK (.ts)

GraphQL

### Example 4 - Google Docs with specific fields

SDK (.ts)

GraphQL

## Arguments

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| query\* | string | \- | The search query string to match against documents |
| properties | string\[\] | \- | Array of field names to limit the keyword search to specific properties |
| alpha | number | \- | Weight factor between keyword and semantic search (0 to 1). Higher values give more weight to semantic search |
| vector | number\[\] | \- | Custom vector to use for semantic similarity matching |
| fusionType | ’rankedFusion’ | ‘relativeScoreFusion' | 'rankedFusion’ | Fusion algorithm to combine keyword and semantic search results:  
\- `rankedFusion`: Combines results based on their rank positions  
\- `relativeScoreFusion`: Combines results based on normalized scores |

## Advanced Usage

### Fusion (Ranking) Method: Fine-Tune Your Results

When you’re working with Hybrid Search, the way keyword and vector search results are combined can make a big difference. By default, Unbody uses `rankedFusion`, adding inverted ranks of both search methods. However, if you prefer, you can switch to `relativeScoreFusion` to add normalized scores instead. This option is especially useful when you want to prioritize the relevance of results.

**Example: Using Relative Score Fusion**

SDK (.ts)

GraphQL

### Target Specific Properties for Search

💡

NOTE: This feature is available from v1.19.0 onwards

Unbody allows you to focus your search on specific fields of your data by specifying properties in the search options. The keyword search will be limited to these properties while the semantic search continues to use all available content for broader context matching.

**Example: Search only in document titles**

SDK (.ts)

GraphQL

### Boosting Properties: Give Priority Where Needed

Isn’t it true that some things deserve more attention than others? Well, the same is true for data. Sometimes, certain parts of your data might be more important than others. With property weighting, you can tell Unbody to give more importance to specific fields during the BM25 keyword search.

**Example: Boosting title**

SDK (.ts)

GraphQl

In the example given above, Unbody’s Hybrid Search considers matches in the title to be twice as important as matches in the content.

### Bring Your Own Vectors: Customized Hybrid Search

Have you got your own vector? Great! You can provide it directly to the Hybrid Search and Unbody will use it for the vector part of the search. It will still consider your query string for the keyword search. This is perfect for when you have a very specific semantic context in mind.

**Example: Search near a Vector**

SDK (.ts)

GraphQL

### Add a Conditional Filter: Refine Your Search

You can add conditional filters to your hybrid search queries. These [filters](/content-api/filters) will refine the results without impacting the ranking. For example, if you want to search for documents about “Electric Cars” but only if their title contains “Vehicles”, you can write the query as shown below.

**Example: Search for documents with title containing `Vehicles`**

SDK (.ts)

GraphQL

[Keyword Search](/content-api/search/keyword-search "Keyword Search")[Visual Similarity](/content-api/search/visual-similarity "Visual Similarity")