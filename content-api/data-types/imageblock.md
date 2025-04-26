---
sidebarTitle: Imageblock
title: Imageblock
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Imageblock","route":"/content-api/data-types/imageblock"}]
---

# ImageBlock

The `ImageBlock` type represents an image. It includes the image’s metadata and any extracted information.

## Schema

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `createdAt` | `datetime` | Creation timestamp |
| `updatedAt` | `datetime` | Last update timestamp |
| `sourceId` | `string` | ID of the data source |
| `remoteId` | `string` | ID in original system |
| `url` | `string` | Image URL |
| `path` | `string[]` | File path |
| `pathString` | `string` | Path as string |
| `mimeType` | `string` | MIME type |
| `originalName` | `string` | Original filename |
| `size` | `number` | File size in bytes |
| `width` | `number` | Image width |
| `height` | `number` | Image height |
| `caption` | `string` | Image caption |
| `alt` | `string` | Alt text |
| `properties` | `object` | Additional properties |
| `tags` | `string[]` | Image tags |

## Related Types

[TextBlockText extracted from the image](/content-api/data-types/textblock)

## Example Usage

```
// Get all images
const { data } = await unbody.get
  .imageBlock
  .select("url", "width", "height")
  .exec();
 
// Search images
const { data } = await unbody.get
  .imageBlock
  .search.about("my search query")
  .exec();
 
// Filter images
const { data } = await unbody.get
  .imageBlock
  .where({ mimeType: "image/jpeg" })
  .exec();
```

## Next Steps

-   Learn about [searching images](/content-api/search)
-   Explore [filtering options](/content-api/filters)
-   See [sorting capabilities](/content-api/sorting)

[GoogleDoc](/content-api/data-types/googledoc "GoogleDoc")[Spreadsheet](/content-api/data-types/spreadsheet "Spreadsheet")