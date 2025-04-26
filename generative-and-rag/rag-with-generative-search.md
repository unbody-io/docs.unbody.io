---
sidebarTitle: Rag with Generative Search
title: Rag with Generative Search
__path__: >-
  [{"title":"generative-and-rag","route":"/generative-and-rag"},{"title":"Rag
  with Generative
  Search","route":"/generative-and-rag/rag-with-generative-search"}]
---

# RAG With Generative Search

Unbody gives you various ways to perform RAG - from generating insights from single documents to analyzing multiple sources at once.

## Generate from every single document

When you need to generate a result for each object based on a single prompt, use the [.generate.fromOne()](/content-api/generative#from-one) method. For example, you can create summaries from your textDocuments by referencing any document property using `{propertyName}` syntax.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .textDocument
                .search.hybrid("AI in healthcare", {
                  properties: ["text", "title"]
                })
                .generate.fromOne("Summarize this in max 100 words: {text}")
                .select("title", "originalName")
                .exec();
```

```
query {
   Get {
     TextDocument(
       hybrid: {
         query: "AI in healthcare",
         properties: ["text", "title"]
       }
     ) {
       _additional {
         generate(
           singleResult: { prompt: "Summarize this in max 100 words: {text}" }
         ) {
           error
           singleResult
           metadata {
             finishReason
             usage {
               inputTokens
               outputTokens
               totalTokens
             }
           }
         }
       }
       title
       originalName
     }
   }
}
 
```

## 

Response

## Generate from every single document with options

You might want to adjust the maxTokens, creativity level, or use a specific model for your generated content. Use generative search [options](/content-api/generative#arguments) to fine-tune these parameters.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .textDocument
                .where({ mimeType: "text/markdown" })
                .search.find("machine learning")
                .generate.fromOne({
                  prompt: "Create a short report for these: {text}",
                  options: {
                    model: "gpt-4",
                    topP: 0.7,
                    maxTokens: 1000,
                    temperature: 0.7,
                    presencePenalty: 0,
                    frequencyPenalty: 0
                  }
                })
                .select("originalName")
                .exec();
```

```
query {
   Get {
     TextDocument(
       where: { operator: Equal, path: "mimeType", valueText: "text/markdown" }
       bm25: {
         query: "machine learning"
       }
     ) {
       _additional {
         generate(
           singleResult: {
             prompt: "Create a short report for these: {text}"
             options: {
               model: "gpt-4"
               topP: 0.7
               maxTokens: 1000
               temperature: 0.7
               presencePenalty: 0
               frequencyPenalty: 0
             }
           }
         ) {
           error
           singleResult
           metadata {
             finishReason
             usage {
               inputTokens
               outputTokens
               totalTokens
             }
           }
         }
       }
       originalName
     }
   }
}
```

## 

Response

## Generate from multiple documents

When you need to generate from multiple documents together and get a grouped result, use the `.generate.fromMany()` method. This lets you combine specific fields from all your sources to create a single generative result.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .textDocument
                .search.about("AI applications")
                .generate.fromMany("Create a 100 words summary:", ["text", "title"])
                .select("title", "originalName")
                .exec();
```

```
query {
   Get {
     TextDocument(
       nearText: { concepts: "AI applications" }
     ) {
       _additional {
         generate(
           groupedResult: {
             task: "Create a 100 words summary:"
             properties: ["text", "title"]
           }
         ) {
           error
           groupedResult
           metadata {
             finishReason
             usage {
               inputTokens
               outputTokens
               totalTokens
             }
           }
         }
       }
       title
       originalName
     }
   }
}
 
```

## 

Response

## Generate from multiple documents with options

Sometimes you want more control over your multi-document generation. Using fromMany with [options](/content-api/generative#arguments) lets you better control the output.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .textDocument
                .where({ mimeType: "text/markdown" })
                .generate.fromMany({
                  task: "Write a short report based on these topics:",
                  properties: ["title", "text", "toc", "authors"],
                  options: {
                    model: "gpt-4",
                    topP: 0.7,
                    maxTokens: 1000,
                    temperature: 0.7,
                    presencePenalty: 0,
                    frequencyPenalty: 0
                  }
                })
                .select("originalName", "title")
                .exec();
```

```
query {
   Get {
     TextDocument(
       where: { operator: Equal, path: "mimeType", valueText: "text/markdown" }
       bm25: {
         query: "machine learning"
       }
     ) {
       _additional {
         generate(
           groupedResult: {
             task: "Write a short report based on these topics:"
             properties: ["title", "text", "toc", "authors"]
             options: {
               model: "gpt-4"
               topP: 0.7
               maxTokens: 1000
               temperature: 0.7
               presencePenalty: 0
               frequencyPenalty: 0
             }
           }
         ) {
           error
           groupedResult
           metadata {
             finishReason
             usage {
               inputTokens
               outputTokens
               totalTokens
             }
           }
         }
       }
       originalName
       title
     }
   }
}
 
```

## 

Response

Learn more about generative search in detail in our [Generative Search Guide](/content-api/generative).

[JSON](/generative-and-rag/json "JSON")[Multimodal Rag Using Generative Search](/generative-and-rag/multimodal-rag-using-generative-search "Multimodal Rag Using Generative Search")