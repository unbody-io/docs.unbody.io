---
sidebarTitle: Keyword Search
title: Keyword Search
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"search","route":"/content-api/search"},{"title":"Keyword
  Search","route":"/content-api/search/keyword-search"}]
---

# Keyword Search

Keyword search is a method that allows users to search your data based on specific keywords. Unlike [semantic search](/content-api/search/semantic-search) which focuses on the meaning of the search query, keyword search relies on exact matches of the keywords used in the search query.

This method is best to use when you want to provide quick and straightforward search results. It is especially effective when dealing with large databases where users are familiar with the specific keywords used within the data.

## Syntax

Keyword search can be operated on an any object’s `string` or `string[]` field. Here’s how:

SDK (.ts)

GraphQL

## Usage

### Example 1 - Google Docs

SDK (.ts)

GraphQL

### Example 2 - Any text block

SDK (.ts)

GraphQL

### Example 3 - Google Docs - search in specific properties

SDK (.ts)

GraphQL

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| query\* | string | The keyword or phrase to search for |
| properties | string\[\] | Array of field names to limit the search to specific properties |

[Semantic Search](/content-api/search/semantic-search "Semantic Search")[Hybrid Search](/content-api/search/hybrid-search "Hybrid Search")