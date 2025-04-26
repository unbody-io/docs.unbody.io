---
sidebarTitle: Multimodal Rag Using Generative API
title: Multimodal Rag Using Generative API
__path__: >-
  [{"title":"generative-and-rag","route":"/generative-and-rag"},{"title":"Multimodal
  Rag Using Generative
  API","route":"/generative-and-rag/multimodal-rag-using-generative-api"}]
---

# Multimodal RAG Using Generative API

Generate insights by analyzing text and images together. Multimodal capabilities allow combining different types of data - like diagrams with text descriptions or images with metadata - to create comprehensive understanding.

## Using Multimodal RAG to Analyze Product Images

When you want to analyze product images and generate detailed product descriptions, use [.generate.text()](/generative-api/text-gen) with [Message-Based Input](/generative-api/text-gen#example-3---message-based-input). This is perfect for e-commerce applications where you need to generate rich product descriptions from images.

```
const {
  data: { payload }
} = await unbody.generate
                .text([
                  {
                    role: "system",
                    content: "You are an expert at analyzing product images and creating detailed, SEO-friendly product descriptions. Focus on key features, benefits, and use cases."
                  },
                  {
                    type: "image",
                    content: {
                      url: "https://example.com/product-image.jpg"
                    }
                  },
                  {
                    role: "user",
                    content: "Analyze this product image and create a detailed product description that highlights its key features, benefits, and ideal use cases. Include technical specifications and target audience."
                  }
                ], {
                  model: "gpt-4-turbo",
                  temperature: 0.7,
                  maxTokens: 1000
                });
```

## 

Response

## Using Multimodal RAG to Analyze Technical Documentation

When you need to analyze technical documentation that includes diagrams, code snippets, and text, use a combination of search queries and [.generate.text()](/generative-api/text-gen) to create comprehensive technical summaries.

```
const queries = [
  unbody.get.textDocument.search
                         .find("system architecture")
                         .select("title", "text", "autoSummary"),
 
  unbody.get.imageBlock.search
                       .find("system architecture diagram")
                       .select("url", "autoCaption"),
 
  unbody.get.codeBlock.search
                      .find("system architecture implementation")
                      .select("code", "language", "description")
];
 
// Execute all queries in parallel
const { data } = await unbody.exec(...queries);
 
const [docs, diagrams, codeSnippets] = data;
 
// Generate a technical summary using all the reference material
const {
  data: { payload: technicalSummary }
} = await unbody.generate
                .text([
                  {
                    role: "system",
                    content: "You are a technical documentation expert. Create clear, concise summaries of technical architectures and implementations."
                  },
                  {
                    role: "user",
                    content: `Analyze this technical documentation and create a comprehensive summary:
 
                    Documentation: ${JSON.stringify(docs)}
                    Architecture Diagrams: ${JSON.stringify(diagrams)}
                    Code Examples: ${JSON.stringify(codeSnippets)}
 
                    Please provide:
                    1. System Overview
                    2. Key Components and Their Interactions
                    3. Technical Implementation Details
                    4. Best Practices and Considerations
                    5. Potential Improvements or Optimizations`
                  }
                ], {
                  model: "gpt-4-turbo",
                  temperature: 0.7,
                  maxTokens: 1500
                });
```

## 

Response

## Using Multimodal RAG to Generate Tarantino-Style Dialogue

Want to create content that draws from multiple types of reference material? Use a combination of search queries and [.generate.text()](/generative-api/text-gen) to collect and analyze diverse data sources like scripts, videos, subtitles, and images. Perfect for creative writing that requires deep understanding of specific styles or themes.

```
const queries = [
  unbody.get.textDocument.search
                         .find("Quentin Tarantino")
                         .select("title", "text", "autoSummary"),
 
  unbody.get.videoFile.search
                      .find("Quentin Tarantino")
                      .select("originalName", "autoSummary"),
 
  unbody.get.subtitleFile.search
                        .find("Quentin Tarantino")
                        .select(
                          "entries.SubtitleEntry.start",
                          "entries.SubtitleEntry.end",
                          "entries.SubtitleEntry.text"
                        ),
 
  unbody.get.imageBlock.search
                       .find("Quentin Tarantino")
                       .select("url", "autoCaption")
];
 
// Execute all queries in parallel
const { data } = await unbody.exec(...queries);
 
const [textDocs, videos, subtitles, images] = data;
 
// Generate a Tarantino-style script using all the reference material
const {
  data: { payload: scriptGeneration }
} = await unbody.generate
                .text(
                  `Study these examples from Tarantino's films and create a new scene in his style:
 
                  From the scripts and articles:
                  ${JSON.stringify(textDocs)}
 
                  From his movies:
                  ${JSON.stringify(videos)}
 
                  Character dialogues:
                  ${JSON.stringify(subtitles)}
 
                  Images from his films:
                  ${JSON.stringify(images)}
 
                  Using these references, write a short 2-character scene (2-3 pages) that captures Tarantino's signature elements:
                  1. A seemingly mundane conversation that builds tension
                  2. Pop culture references
                  3. Sharp dialogue switches between casual and intense
                  4. Detailed scene description in his style
                  5. A surprise twist ending`,
                  {
                    model: "gpt-4-turbo",
                    temperature: 0.8,
                    maxTokens: 1000
                  }
                );
```

## 

Response

## Video Content Analysis

When analyzing video content, it’s often helpful to split the process into two steps: first retrieving relevant content, then generating insights. This approach allows for better control over the analysis process and more focused results.

```
// Step 1: Retrieve relevant video content
const { data: videoData } = await unbody.get
  .videoFile
  .search.about("programming tutorials")
  .select(
    "url",
    "autoSummary",
    "subtitles.entries.SubtitleEntry"
  )
  .exec();
 
// Step 2: Generate structured insights using Zod schema
const schema = z.object({
  title: z.string()
    .min(10, "Title must be descriptive")
    .describe("Title of the learning module"),
  keyPoints: z.array(
    z.object({
      timestamp: z.string()
        .regex(/^\d{2}:\d{2}$/, "Must be in MM:SS format"),
      topic: z.string(),
      summary: z.string()
        .min(30, "Summary must be detailed")
    })
  ).min(3, "Must include at least 3 key points"),
  codeSnippets: z.array(
    z.object({
      code: z.string(),
      explanation: z.string()
    })
  ).optional()
});
 
const { data: { payload } } = await unbody.generate
  .json([
    {
      role: "system",
      content: "You are an expert at analyzing programming tutorials and creating structured learning materials. Focus on extracting key concepts, timestamps, and code examples."
    },
    {
      role: "user",
      content: `Please analyze this programming tutorial and create a structured learning guide.
                Video URL: ${videoData[0].url}
                Summary: ${videoData[0].autoSummary}
                Subtitles: ${JSON.stringify(videoData[0].subtitles)}
                -
                Please create a comprehensive guide that includes:
                1. A clear, descriptive title
                2. Key points with timestamps and detailed summaries
                3. Relevant code snippets with explanations
                4. Focus on practical applications and best practices
                `
      }
    ], {
      schema,
      options: {
        temperature: 0.7,
        maxTokens: 1000
      }
    });
```

## 

Response

Learn more in our [Generative API Guide](/generative-api/overview).

[Multimodal Rag Using Generative Search](/generative-and-rag/multimodal-rag-using-generative-search "Multimodal Rag Using Generative Search")[Role-based prompting](/prompting/role-based-prompting "Role-based prompting")