---
sidebarTitle: Use Vars inside a Prompt
title: Use Vars inside a Prompt
__path__: >-
  [{"title":"prompting","route":"/prompting"},{"title":"Use Vars inside a
  Prompt","route":"/prompting/use-vars-inside-a-prompt"}]
---

# Use vars inside a prompt

Transform and inject dynamic data into your prompts using variables. Variables allow you to process query results before using them in message content.

## Generate from video subtitles using vars

Demonstrates using variables to process video subtitles. The code uses two [JQ-formatted](https://jqlang.github.io/jq/) vars:

-   `subtitles`: Extracts video subtitle entries
-   `context`: Creates a structure combining filename and transcription

The processed data is then injected into a message prompt using `context` syntax, generating a summary of the video transcription. Results include generation metadata and usage statistics.

SDK (.ts)GraphQL

```
const {
  data: { payload },
} = await unbody.get.videoFile
      .select("subtitles.SubtitleFile.entries.SubtitleEntry.__typename")
      .limit(1)
      .generate.fromOne({
          options: {
              vars: [
                  {
                      name: "subtitles",
                      formatter: "jq",
                      expression: `(.subtitles//[]) | map({ entries })`,
                  },
                  {
                      name: "context",
                      formatter: "jq",
                      expression: `{
                          originalName,
                          transcription: $subtitles[0].entries
                      }`,
                  },
              ],
          },
          messages: [
              {
                  content: `Summarize the video's transcription:
                      \`\`\`json
                      {context}
                      \`\`\`
                  `,
              },
          ],
      })
      .exec();
```

```
{
  Get {
    VideoFile(limit: 1) {
      _additional {
        generate(
          singleResult: {
            messages: [
              {
                content: "Summarize the video's transcription:\n```json\n{context}\n```"
              }
            ], 
            options: {
              vars: [
                {
                  name: "subtitles", 
                  formatter: "jq", 
                  expression: "(.subtitles//[]) | map({ entries })"
                }, 
                {
                  name: "context", 
                  formatter: "jq", 
                  expression: "{\n originalName,\n transcription: $subtitles[0].entries\n}"
                }
              ]
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
      subtitles {
        ... on SubtitleFile {
          entries {
            ... on SubtitleEntry {
              __typename
            }
          }
        }
      }
    }
  }
}
```

## 

Response

[Use the image inside a prompt](/prompting/use-the-image-inside-a-prompt "Use the image inside a prompt")[Working With Images](/working-with-images "Working With Images")