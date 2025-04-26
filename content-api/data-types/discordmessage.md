---
sidebarTitle: Discordmessage
title: Discordmessage
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Discordmessage","route":"/content-api/data-types/discordmessage"}]
---

# DiscordMessage

The `DiscordMessage` type represents a message from Discord. It includes the message content, metadata, and any attachments.

## Schema

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `createdAt` | `datetime` | Creation timestamp |
| `updatedAt` | `datetime` | Last update timestamp |
| `sourceId` | `string` | ID of the data source |
| `remoteId` | `string` | Discord message ID |
| `content` | `string` | Message content |
| `channelId` | `string` | Discord channel ID |
| `channelName` | `string` | Discord channel name |
| `guildId` | `string` | Discord guild ID |
| `guildName` | `string` | Discord guild name |
| `authorId` | `string` | Discord author ID |
| `authorName` | `string` | Discord author name |
| `attachments` | `object[]` | Message attachments |
| `embeds` | `object[]` | Message embeds |
| `reactions` | `object[]` | Message reactions |
| `referencedMessage` | `object` | Referenced message (replies) |
| `threadId` | `string` | Thread ID (if in thread) |
| `threadName` | `string` | Thread name |

## Related Types

[TextBlockText content from the message](/content-api/data-types/textblock)[ImageBlockImages from attachments](/content-api/data-types/imageblock)

## Example Usage

```
// Get all Discord messages
const { data } = await unbody.get
  .discordMessage
  .select("content", "authorName", "channelName")
  .exec();
 
// Search Discord messages
const { data } = await unbody.get
  .discordMessage
  .search.about("my search query")
  .exec();
 
// Filter Discord messages
const { data } = await unbody.get
  .discordMessage
  .where({ channelName: "general" })
  .exec();
```

## Next Steps

-   Learn about [searching messages](/content-api/search)
-   Explore [filtering options](/content-api/filters)
-   See [sorting capabilities](/content-api/sorting)

[CsvRow](/content-api/data-types/csvrow "CsvRow")[GithubComment](/content-api/data-types/githubcomment "GithubComment")