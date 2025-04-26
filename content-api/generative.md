---
sidebarTitle: Generative
title: Generative
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"Generative","route":"/content-api/generative"}]
---

# Generative Search

Generative Search utilizes large language models to transform query results into engaging narratives. This approach processes natural language to generate human-like outputs, suitable for enhancing user engagement with data-driven content.

For instance, if your data includes various historical events, users can simply enter a general prompt like “important events in the 20th century” and receive a narrative summarizing the events in an engaging manner. This method is beneficial for creating narrative content, resonating with human readers, and summarizing complex data into key insights.

## Syntax

SDK (.ts)

GraphQL

## Usage

### Example 1 - From One

This method generates a result for each object based on a single prompt. You can reference object properties within the prompt using curly braces to dynamically insert values.

SDK (.ts)

GraphQL

### Example 2 - From Many

This method generates a result by applying a single prompt to a group of objects. For each object returned by the query, the specified properties are extracted and combined into an array. This array, along with the prompt, will be used to generate the result.

SDK (.ts)

GraphQL

### Arguments

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | `string` |  | Defaults to the model configured during project setup. This option is only available on [paid subscription plans](https://unbody.io/pricing). |
| `maxTokens` | `number` |  | Maximum number of tokens in the output (usually constrained by the model). |
| `temperature` | `number` |  | Adjusts creativity in output (0 to 1). Higher values make output more random. |
| `presencePenalty` | `number` |  | Penalizes new tokens based on their presence in the input (range: -2.0 to 2.0). |
| `frequencyPenalty` | `number` |  | Penalizes tokens based on frequency of occurrence (range: -2.0 to 2.0). |
| `topP` | `number` |  | Controls diversity via nucleus sampling (0 to 1). Higher values prioritize diversity. |

## Advanced Usage

### Using Messages Instead of Prompts

In addition to using a single prompt, you can leverage an array of messages to define interactions. This method allows for richer context and more dynamic input-output control. Each message can have the following properties:

-   `content`: (string) The actual content of the message.
-   `type`: (text | image) The type of content. Defaults to `text`.
-   `role`: (system | user | assistant) Defines the role of the message. The `system` role sets the behavior or instructions for the assistant, while `user` is the input from the user, and `assistant` is the response from the AI. Defaults to “user”.

This method provides a way to handle multi-turn conversations or context-aware responses.

**Example: Using Messages**

```
messages: [
  {
    "role": "system",
    "content": "You are an AI assistant tasked with answering questions based on the content of a specific video. Use the video transcript to provide helpful and accurate answers."
  },
  {
    "role": "user",
    "content": "What's the video about?"
  },
  {
    "role": "assistant",
    "content": "The video explains the benefits and challenges of renewable energy, focusing on solar and wind power, energy storage, and community initiatives for sustainability."
  },
  {
    "role": "user",
    "content": "Can you give an example from the video?"
  },
  {
    "role": "assistant",
    "content": "Sure! It mentions a small town in Germany that achieved 100% renewable energy through community-led projects."
  }
]
 
```

### Using Images as Input

Generative Search supports image inputs through messages. To use images as input:

-   The message `type` must be set to `"image"`.
-   The message `content` must include one of the following:
    -   A valid image URL (e.g., HTTPS URL) or a base64-encoded image.
    -   A `JSONPath` pointing to one or more image URLs.
-   When using HTTPS URLs, ensure the image size is less than 5MB, as larger images are not supported.

This allows you to provide images as part of the context for generating a result. The model will process the image(s) along with any accompanying instructions.

**Example: Using images**

SDK (.ts)

GraphQl

### Using `vars`

The `vars` option allows you to transform query results into JSON-serializable data, which can then be referenced in the messages content. This feature enables dynamic data injection into the conversation using the formatter(Currently, the only supported formatter is [jq](https://jqlang.github.io/jq/)).

Each `var` has the following properties:

-   `name`: (string) The name of the variable. It can be referenced in the message content by using either `"{varName}"` or `"$..varName"`.
-   `formatter`: (string) The name of the formatter to use.
-   `expression`: (string) The `jq` expression used to transform the query result into the desired structure.

**Example: Using vars**

From one

From many

**Note:** The `vars` are calculated sequentially, meaning the output of one `var` can be used in the next. You can reference the `var` in the expression by using `$varName`. You can also reference the original query result by using `$root`.

The `vars` option is only available in `messages` and not in the `prompt`.

### Using Cross-References in `vars`

When using cross-references (relations) in `vars` or within message content, you need to fetch at least one property from the referenced object. This ensures the related object data is accessible during query execution.

**Example: Using Cross-References**

SDK (.ts)

GraphQL

[Overview](/content-api/search/overview "Overview")[QnA](/content-api/q-n-a "QnA")