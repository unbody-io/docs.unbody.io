---
sidebarTitle: Text
title: Text
__path__: >-
  [{"title":"generative-and-rag","route":"/generative-and-rag"},{"title":"Text","route":"/generative-and-rag/text"}]
---

# Text Generation

Generate natural language content using AI with flexible input methods - from simple prompts to structured message sequences.

## Basic Generation

When you need to generate text content from a prompt, use `.generate.text()`. This is useful for creating content like explanations, summaries, or reports. [Learn more about basic text generation](/generative-api/text-gen#example-1---basic-prompt).

```
const {
  data: { payload }
} = await unbody.generate
                .text(
                    "Compare Large Language Models (LLMs) with Traditional Rule-Based AI Systems analyzing: \n" +
                    "- Architecture and technical foundations \n" +
                    "- Performance metrics and scalability \n" +
                    "- Use cases and limitations \n" +
                    "- Implementation and costs \n" +
                    "- Future trajectories \n\n" +
                    "Provide specific examples and business adoption implications for each aspect."
                );
```

## 

Response

## Generation with Options

Sometimes you need more control over the generated content. Use [options](/generative-api/text-gen#options) like temperature and token limits to fine-tune the output style and length.

```
const {
  data: { payload }
} = await unbody.generate
                .text("Create a detailed technical specification for implementing a zero-knowledge proof system in a blockchain voting application", 
                {
                  model: "gpt-4",
                  topP: 0.7,
                  maxTokens: 1000,
                  temperature: 0.7,
                  presencePenalty: 0,
                  frequencyPenalty: 0
                });
```

## 

Response

## Multi-Message Generation

When you need to send role-based messages array as a prompt, use [Message-Based Input](/generative-api/text-gen#example-3---message-based-input). This approach helps when providing system instructions or creating multi-turn conversations with different roles.

```
const {
  data: { payload }
} = await unbody.generate
                .text(
                      [
                        {
                          role: "system",
                          content:
                            "You are a helpful technical writer who explains programming concepts clearly.",
                        },
                        {
                          role: "user",
                          content:
                            "Explain how to implement proper error handling in a Node.js REST API. Include basic examples.",
                        },
                      ],
                      {
                        model: "gpt-4",
                        maxTokens: 600,
                        temperature: 0.3,
                      }
                     );
```

## 

Response

Learn more about text generation in detail in our [Text Generation Guide](/generative-api/text-gen).

[Rerankers](/search/rerankers "Rerankers")[JSON](/generative-and-rag/json "JSON")