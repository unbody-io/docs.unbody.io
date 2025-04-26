---
sidebarTitle: Text Gen
title: Text Gen
__path__: >-
  [{"title":"generative-api","route":"/generative-api"},{"title":"Text
  Gen","route":"/generative-api/text-gen"}]
---

# Text Generation API

The `.generate.text()` method creates text content based on a prompt or a sequence of messages. It supports configurable options for model selection, token limits, and more.

## Usage

### Example 1 - Basic Prompt

Generate text using a simple string prompt:

```
unbody.generate.text("Explain AI's impact on healthcare.");
```

### Example 2 - Prompt with Options

Add options to control the output:

```
unbody.generate.text("Write a report on climate change.", {
  model: "gpt-4",
  topP: 0.7,
  maxTokens: 1000,
  temperature: 0.7,
});
```

### Example 3 - Message-Based Input

Guide the generation using a series of messages:

```
unbody.generate.text(
  [
    { role: "system", content: "You are an AI specialist." },
    { role: "user", content: "What are the key AI trends in 2024?" },
  ],
  {
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
  }
);
```

## Options

-   `model`: AI model to use (e.g., `gpt-4`).
-   `topP`: Diversity control via nucleus sampling (0 to 1).
-   `maxTokens`: Maximum length of the response.
-   `temperature`: Creativity adjustment (0 to 1).
-   `presencePenalty`: Penalize new tokens based on input presence (-2.0 to 2.0).
-   `frequencyPenalty`: Penalize tokens based on frequency of occurrence (-2.0 to 2.0).

[Overview](/generative-api/overview "Overview")[JSON Generation](/generative-api/json-gen "JSON Generation")