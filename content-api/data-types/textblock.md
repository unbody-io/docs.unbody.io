---
sidebarTitle: Textblock
title: Textblock
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Textblock","route":"/content-api/data-types/textblock"}]
---

# TextBlock

The `TextBlock` type represents a block of text. It can be part of a larger document or stand alone.

## Schema

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `createdAt` | `datetime` | Creation timestamp |
| `updatedAt` | `datetime` | Last update timestamp |
| `sourceId` | `string` | ID of the data source |
| `remoteId` | `string` | ID in original system |
| `text` | `string` | Text content |
| `html` | `string` | HTML content |
| `tagName` | `string` | HTML tag name |
| `classNames` | `string[]` | HTML class names |
| `order` | `number` | Block order |
| `properties` | `object` | Additional properties |

## Related Types

[TextDocumentParent document containing text blocks](/content-api/data-types/textdocument)

## Example Usage

```
// Get all text blocks
const { data } = await unbody.get
  .textBlock
  .select("text", "tagName", "order")
  .exec();
 
// Search text blocks
const { data } = await unbody.get
  .textBlock
  .search.about("my search query")
  .exec();
 
// Filter text blocks
const { data } = await unbody.get
  .textBlock
  .where({ tagName: "p" })
  .exec();
```

## Next Steps

-   Learn about [searching text blocks](/content-api/search)
-   Explore [filtering options](/content-api/filters)
-   See [sorting capabilities](/content-api/sorting)

[SubtitleFile](/content-api/data-types/subtitlefile "SubtitleFile")[TextDocument](/content-api/data-types/textdocument "TextDocument")