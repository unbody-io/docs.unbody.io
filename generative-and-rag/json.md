---
sidebarTitle: Json
title: Json
__path__: >-
  [{"title":"generative-and-rag","route":"/generative-and-rag"},{"title":"Json","route":"/generative-and-rag/json"}]
---

# JSON Generation

Generate structured JSON content based on prompts, messages, or [custom schemas](/project-configurations/custom-schemas). Useful for creating API responses, structured records, or documents.

## Basic JSON Generation

When you need to generate structured data with specific fields, use schema-based generation. This ensures the output follows your required format with proper data types. [Learn more about basic JSON generation](/generative-api/json-gen#example-1---prompt-with-plain-schema).

```
const {
  data: { payload }
} = await unbody.generate
                .json("Generate a product catalog entry for an e-commerce site:", {
                  schema: {
                    type: "object",
                    properties: {
                      productName: { type: "string" },
                      price: { type: "number" },
                      category: { type: "string" },
                      inStock: { type: "boolean" },
                      description: { type: "string" }
                    }
                  }
                });
```

## 

Response

## Generation with Zod Schema

When you need type-safe JSON generation, use [Zod](https://zod.dev/) schemas to define your output structure. This approach provides full TypeScript integration and runtime validation.

```
import { z } from "zod";
 
const {
  data: { payload }
} = await unbody.generate
                .json("Generate a product catalog entry for an e-commerce site:", {
                  schema: z.object({
                    productName: z.string()
                      .min(3, "Product name must be at least 3 characters")
                      .describe("Name of the product"),
                    price: z.number()
                      .positive("Price must be positive")
                      .describe("Current price in USD"),
                    originalPrice: z.number()
                      .positive()
                      .optional()
                      .describe("Original price before discount"),
                    category: z.enum(["Electronics", "Home & Kitchen", "Fashion", "Books"])
                      .describe("Product category"),
                    inStock: z.boolean()
                      .default(true)
                      .describe("Whether the product is in stock"),
                    description: z.string()
                      .min(50, "Description must be detailed")
                      .max(1000)
                      .describe("Detailed product description"),
                    tags: z.array(z.string())
                      .optional()
                      .describe("Product tags for search")
                  })
                });
```

## 

Response

## Multi-Message Generation

When you need to generate structured data through conversation, use [Message-Based Input with Schema](/generative-api/json-gen#example-3---message-based-input-with-schema). This helps when you need to provide context or specific instructions before generating the final structured output.

```
import { z } from "zod";
 
const {
    data: { payload },
}  = await unbody.generate
                 .json(
                    [
                        {
                            role: "system",
                            content: "You are a technical documentation specialist. Create API endpoint specifications."
                        },
                        { 
                            role: "user", 
                            content: "Generate documentation for a user registration endpoint." 
                        },
                    ],
                    {
                        schema: z.object({
                            endpoint: z.string()
                              .startsWith("/")
                              .describe("API endpoint path"),
                            method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"])
                              .describe("HTTP method"),
                            parameters: z.array(
                              z.object({
                                name: z.string(),
                                type: z.enum(["string", "number", "boolean", "object", "array"]),
                                required: z.boolean().default(true),
                                description: z.string().optional(),
                                validation: z.record(z.string()).optional()
                              })
                            ).min(1, "At least one parameter is required"),
                            responseCode: z.number()
                              .int()
                              .min(200)
                              .max(599)
                              .describe("HTTP response code"),
                            authentication: z.boolean()
                              .default(false)
                              .describe("Whether endpoint requires authentication"),
                            rateLimit: z.object({
                              requests: z.number().positive(),
                              period: z.string()
                            }).optional()
                              .describe("Rate limiting configuration")
                        }),
                    }
                 );
```

## 

Response

Learn more about advanced JSON generation features in our [JSON Generation API Guide](/generative-api/json-gen).

[Text](/generative-and-rag/text "Text")[Rag With Generative Search](/generative-and-rag/rag-with-generative-search "Rag With Generative Search")