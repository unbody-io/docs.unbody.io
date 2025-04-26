---
sidebarTitle: Role Based Prompting
title: Role Based Prompting
__path__: >-
  [{"title":"prompting","route":"/prompting"},{"title":"Role Based
  Prompting","route":"/prompting/role-based-prompting"}]
---

# Role-based Prompting

Use message arrays to create rich, context-aware interactions with multiple roles. This method provides more control over the conversation flow compared to single prompts.

## Basic Role-based Generation

When you want type-safe, structured responses from your prompts, use [Zod](https://zod.dev/) schema validation with role-based messages. The example shows product review analysis with strictly defined response types.

```
import { z } from "zod";
 
const {
    data: { payload },
} = await unbody.generate
                .json(
                    [
                        {
                            role: "system",
                            content: `You are a product analytics expert. Analyze product reviews to extract:
                            - Overall sentiment and score
                            - Key mentioned features and their reception
                            - Common pain points
                            - Suggested improvements
                            Ensure analysis is data-driven and actionable.`,
                        },
                        {
                            role: "user",
                            content: `Reviews to analyze:
                            1. "Great battery life but the camera quality could be better. Love the fast charging feature!"
                            2. "The UI is confusing and takes time to learn. However, performance is solid."
                            3. "Perfect for daily use. Screen quality is amazing, though price is a bit high."`,
                        },
                    ],
                    {
                        schema: z.object({
                            overallSentiment: z.object({
                            score: z.number().min(0).max(10),
                            summary: z.string(),
                            }),
                            featureAnalysis: z.array(
                            z.object({
                                feature: z.string(),
                                sentiment: z.enum(["positive", "neutral", "negative"]),
                                mentionCount: z.number(),
                                keyFeedback: z.string(),
                            })
                            ),
                            painPoints: z.array(
                            z.object({
                                issue: z.string(),
                                severity: z.enum(["low", "medium", "high"]),
                                impactArea: z.string(),
                            })
                            ),
                            improvements: z.array(
                            z.object({
                                suggestion: z.string(),
                                priority: z.enum(["low", "medium", "high"]),
                                implementationComplexity: z.enum(["easy", "moderate", "complex"]),
                            })
                            ),
                        }),
                    }
                );
```

## 

Response

Learn more about advanced role-based prompting in our [JSON Generation API Guide](/generative-api/json-gen).

[Multimodal Rag Using Generative API](/generative-and-rag/multimodal-rag-using-generative-api "Multimodal Rag Using Generative API")[Use the image inside a prompt](/prompting/use-the-image-inside-a-prompt "Use the image inside a prompt")