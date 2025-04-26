---
sidebarTitle: Textdocument
title: Textdocument
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Textdocument","route":"/content-api/data-types/textdocument"}]
---

# TextDocument

The `TextDocument` type represents a text document. It includes the document’s content, metadata, and any extracted information.

## Schema

| Field | Type | Description |
| --- | --- | --- |
| authors | string | The authors extracted from the document. |
| createdAt | Date | The date the document was created. |
| description | string | The description extracted from the document. |
| ext | string | The extension of the file. |
| html | string | Document’s content in HTML format. |
| mimeType | string | The MIME type of the file. |
| modifiedAt | Date | The date the document was last modified. |
| originalName | string | The original name of the file. |
| path | Array<string> | The path to the file in the source. |
| pathString | string | The path to the file in the source. |
| properties | string | Document’s properties in JSON format. |
| remoteId | string | The unique identifier in the source. |
| sourceId | string | The source identifier. |
| subtitle | string | The subtitle extracted from the document. |
| tags | Array<string> | The tags extracted from the document. |
| text | string | Document’s text content. |
| title | string | The title extracted from the document. |
| toc | string | The table of contents extracted from the document in JSON format. |
| autoSummary | string | A summary automatically generated from the document’s content. |
| autoKeywords | Array<string> | Keywords automatically extracted from the document’s content. |
| autoEntities | Array<string> | Entities automatically extracted from the document’s content. |
| autoTopics | Array<string> | Topics automatically extracted from the document. |
| blocks | Array<ImageBlock | TextBlock> | The content blocks of the document. |

## Related Types

[TextBlockIndividual text blocks within the document](/content-api/data-types/textblock)[ImageBlockImages within the document](/content-api/data-types/imageblock)

## Example Usage

```
// Get all text documents
const { data } = await unbody.get
  .textDocument
  .select("title", "text", "url")
  .exec();
 
// Search text documents
const { data } = await unbody.get
  .textDocument
  .search.about("my search query")
  .exec();
 
// Filter text documents
const { data } = await unbody.get
  .textDocument
  .where({ mimeType: "text/markdown" })
  .exec();
```

## Next Steps

-   Learn about [searching documents](/content-api/search)
-   Explore [filtering options](/content-api/filters)
-   See [sorting capabilities](/content-api/sorting)

[TextBlock](/content-api/data-types/textblock "TextBlock")[VideoFile](/content-api/data-types/videofile "VideoFile")