---
sidebarTitle: Discord
title: Discord
__path__: >-
  [{"title":"providers","route":"/providers"},{"title":"Discord","route":"/providers/discord"}]
---

# Discord

This guide offers strategic insights into connecting Discord to Unbody.

### **Entrypoint** — Selecting a Channel

The entry point for Discord integration is a channel, hence one source contains the messages from a single channel. The channel can be a text channel, voice channel, or inside a category.

**Class objects**

-   `DiscordMessage`

**Supported Files & Data Types**

-   Text messages
-   Images
-   Videos
-   Audio

**Example Queries**

SDK (.ts)GraphQL

```
    await unbody.get
                .discordMessage
                .select("content")
                .limit(100)
                .generate.fromMany(
                    "These the last 100 messages on our Discord, Generate a summary of them in a markdown format",
                    ["content", "author"]
                )
                .exec();
```

```
    {
        Get {
            DiscordMessage(limit: 100) {
            _additional {
                generate(
                groupedResult: {task: "These the last 100 messages on our Discord, Generate a summary of them in a markdown format", properties: ["content", "author"]}
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
            content
            }
        }
    }
```

### **Troubleshooting**

-   In order to be able to connect your Discord to Unbody, you need to have the admin role in the server.
-   If you are unable to connect your Discord to Unbody, please check if the bot has the necessary permissions to access the channel.
-   For private channels, you need to make sure that the bot has access to the channel. You can do this by adding Unbody’s bot to the channel.

### **Limitations**

⚠️

Currently we can only fetch the last 1000 messages from a channel. We are working on increasing this limit.

[Google Calendar](/providers/google-calendar "Google Calendar")[github](/providers/github "github")