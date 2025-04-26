---
sidebarTitle: Get
title: Get
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"query-methods","route":"/content-api/query-methods"},{"title":"Get","route":"/content-api/query-methods/get"}]
---

# Get

When working with Unbody, you will need to retrieve data from your database. The `Get` method is a powerful tool that enables you to fetch specific data objects from your database. This method is your go-to tool when you need precise data retrieval from your database.

## How to Use

To get started,

-   Choose the specific class of objects you work with (e.g. Google Docs).
-   Then list out the properties that you want to fetch such as title and summary.

We have given below an example to fetch the title and summary of all Google Docs.

SDK (.ts)GraphQL

```
await unbody.get
            .googleDoc
            .select("title", "summary")
            .exec();
```

```
{
  Get {
    GoogleDoc {
      title
      summary
    }
  }
}
```

## 

Expected response

## **Cross-references**

You can also deep dive and fetch properties that are cross-referenced to other classes. The example given below shows how to fetch image URLs from text blocks. This will return the title, summary, and URLs of related image blocks.

SDK (.ts)GraphQL

```
unbody.get
      .googleDoc
      .select(
        "title",
        "summary",
        "blocks.imageBlocks.url"
      )
      .exec()
```

```
{
  Get {
    GoogleDoc {
      title
      summary
      blocks {
        ... on ImageBlock {
          url
        }
      }
    }
  }
}
```

## 

Expected response

## **List of Supported Arguments**

Given below is a list of all arguments that you can use with the **Get** method to tailor your queries.

-   **`where`**: Apply filters to refine search results. You can learn more about filters [here](/content-api/filters).
-   **`limit`:** It sets the maximum number of objects returned.
-   **`offset`:** If you need to skip a specified number of objects, you can use this argument.
-   **`orderBy`:** This argument returns the objects that are sorted based on a specific property.
-   **`nearText`:** This argument helps you find objects that are semantically similar to the given text. [Learn here](/content-api/search/semantic-search).
-   **`nearVector`:** This argument helps you find objects with Vector similarity. In simple words, vector similarity is the nearest neighbor search where two objects in high-dimensional space are compared using vectors. [Learn more](/content-api/query-methods/content-api/search/semantic-search#utilizing-custom-vectors)
-   **`nearObject`:** This argument returns similar to another object.
-   **`includeMeta`:** If you need to include additional meta-information about query results, you can use this argument in the Get query.

## **Additional Properties & Metadata**

Metadata and additional properties enhance the results retrieved from the **Get** request, thereby enhancing the retrieved information. Some of the additional properties are given below.

-   **`id`:** It is the unique identifier of the object.
-   **`creationTimeUnix`:** This property denotes the timestamp when the object was created.
-   **`lastUpdateTimeUnix`:** As you might have guessed, this property represents the timestamp of the last update made to the object.
-   **`vector`:** As you might know, objects can be represented as vectors in higher dimensions. This property is associated with the vector representation of the object.
-   **`classify`:** This property provides you with the classification results for the object.
-   **`certainty`:** Based on vector similarity, this property provides how certain is a search result.
-   **`distance`:** This property results in distance in vector space for search results. If you do not understand distance, don’t worry you learn more about it [here](https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter03/section08.html#:~:text=The%20distance%20between%20two%20vectors,we%20have%20the%20Pythagorean%20theorem.).
-   **`score`:** If you need the score of the search result, then do not hesitate to you this property. This property is primarily designed for text searches.
-   **`explainScore`:** If we provide you with the score of search results, we also provide you with the explanation of how the search score was calculated. If you wish to see, you can use this property.

ℹ️

The good news is that you don’t need to remember this information. These additional details are accessible through the `_additional` properties in the response.

[QnA](/content-api/q-n-a "QnA")[Aggregate](/content-api/query-methods/aggregate "Aggregate")