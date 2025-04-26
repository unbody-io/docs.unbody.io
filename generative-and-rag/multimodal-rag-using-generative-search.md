---
sidebarTitle: Multimodal Rag Using Generative Search
title: Multimodal Rag Using Generative Search
__path__: >-
  [{"title":"generative-and-rag","route":"/generative-and-rag"},{"title":"Multimodal
  Rag Using Generative
  Search","route":"/generative-and-rag/multimodal-rag-using-generative-search"}]
---

# Multimodal Rag Using Generative Search

Create comprehensive insights by processing multiple types of data simultaneously - image, text, video and audio. Multimodal RAG combines these different modalities to generate richer, more contextual understanding of your content.

## Simple Image Caption Generation

When you want to search for specific types of images and generate custom captions for each one, combine semantic search with `.generate.fromOne()`. This example shows how to find nature-related images and generate poetic captions for each one.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .imageBlock
                .search.about("nature and wildlife photography")
                .select("url", "autoCaption")
                .generate.fromOne({
                  prompt: "Create a poetic caption for this image that captures its essence. Use the auto-generated caption as context: {autoCaption}",
                  options: {
                    temperature: 0.8,
                    maxTokens: 100
                  }
                })
                .exec();
```

```
query {
  Get {
    ImageBlock(
      nearText: { concepts: "nature and wildlife photography" }
    ) {
      _additional {
        generate(
          singleResult: {
            prompt: "Create a poetic caption for this image that captures its essence. Use the auto-generated caption as context: {autoCaption}"
            options: {
              temperature: 0.8
              maxTokens: 100
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
      url
      autoCaption
    }
  }
}
```

## 

Response

## Image Analysis with Metadata

When analyzing images in detail, you can combine visual content with metadata like OCR text, auto-generated captions, and file information. This example shows how to analyze product images by combining visual analysis with text metadata.

SDK (.ts)GraphQL

```
const {
  data: { generate }
} = await unbody.get
                .imageBlock
                .search.hybrid("product photography", {
                  properties: ["autoCaption", "text"]
                })
                .limit(2)
                .select("url", "autoCaption", "autoOCR", "metadata")
                .generate.fromMany({
                  task: "Analyze these product images. For each image:\n" +
                        "1. Describe the visual appearance\n" +
                        "2. Extract any text or labels visible in the image\n" +
                        "3. Identify key product features\n" +
                        "4. Suggest improvements for product presentation",
                  properties: ["url", "autoCaption", "autoOCR", "metadata"],
                  options: {
                    model: "gpt-4-vision-preview",
                    temperature: 0.7,
                    maxTokens: 500
                  }
                })
                .exec();
```

```
query {
  Get {
    ImageBlock(
      hybrid: {
        query: "product photography"
        properties: ["autoCaption", "text"]
      }
      limit: 2
    ) {
      _additional {
        generate(
          groupedResult: {
            task: """
            Analyze these product images. For each image:
            1. Describe the visual appearance
            2. Extract any text or labels visible in the image
            3. Identify key product features
            4. Suggest improvements for product presentation
            """
            properties: ["url", "autoCaption", "autoOCR", "metadata"]
            options: {
              model: "gpt-4-vision-preview"
              temperature: 0.7
              maxTokens: 500
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
      url
      autoCaption
      autoOCR
      metadata
    }
  }
}
```

## 

Response

Learn more about generative search in detail in our [Generative Search Guide](/content-api/generative).

[Rag With Generative Search](/generative-and-rag/rag-with-generative-search "Rag With Generative Search")[Multimodal Rag Using Generative API](/generative-and-rag/multimodal-rag-using-generative-api "Multimodal Rag Using Generative API")