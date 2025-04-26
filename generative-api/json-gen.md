---
sidebarTitle: Json Gen
title: Json Gen
__path__: >-
  [{"title":"generative-api","route":"/generative-api"},{"title":"Json
  Gen","route":"/generative-api/json-gen"}]
---

# JSON Generation API

The `.generate.json()` method creates structured JSON content based on prompts, messages, or schemas. Use this for generating API responses, structured records, or documents.

## Usage

### Example 1 - Prompt with Plain Schema

Define a schema and generate structured JSON:

```
unbody.generate.json("Provide user details:", {
  schema: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
      address: { type: "string" },
    },
  },
});
```

### Example 2 - Prompt with Zod Schema

Use [Zod](https://zod.dev/) for schema validation:

```
import { z } from "zod";
 
unbody.generate.json("Provide user details:", {
  schema: z.object({
    name: z.string(),
    age: z.number(),
    address: z.string(),
  }),
});
```

### Example 3 - Message-Based Input with Schema

Use messages and a schema to guide the generation:

```
import { z } from "zod";
 
unbody.generate.json(
  [
    { role: "user", content: "What is the structure of a business entity?" },
    { role: "system", content: "Explain in detail with examples." },
  ],
  {
    schema: z.object({
      companyName: z.string(),
      employees: z.number(),
      headquarters: z.string(),
    }),
  }
);
```

## Options

-   `schema`: Defines the structure of the output (plain JSON schema or Zod schema).
-   `model`: AI model to use (e.g., `gpt-4`).
-   `topP`: Diversity control via nucleus sampling (0 to 1).
-   `maxTokens`: Maximum length of the response.
-   `temperature`: Creativity adjustment (0 to 1).
-   `presencePenalty`: Penalize new tokens based on input presence (-2.0 to 2.0).
-   `frequencyPenalty`: Penalize tokens based on frequency of occurrence (-2.0 to 2.0).

[Text Generation](/generative-api/text-gen "Text Generation")[Overview](/image-api/overview "Overview")