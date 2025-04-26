---
sidebarTitle: Subtitlefile
title: Subtitlefile
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Subtitlefile","route":"/content-api/data-types/subtitlefile"}]
---

# SubtitleFile

| Field | Type | Description |
| --- | --- | --- |
| createdAt | Date | The creation date of the subtitle file. |
| format | string | The format of the subtitle file. |
| language | string | The language of the subtitle file. |
| mimeType | string | The MIME type of the subtitle file. |
| modifiedAt | Date | The last modification date of the subtitle file. |
| originalName | string | The original name of the file. |
| path | Array<string> | The path to the subtitle file in the source. |
| pathString | string | The path to the subtitle file in the source as string. |
| remoteId | string | The unique identifier in the source. |
| size | number | The size of the subtitle file in bytes. |
| sourceId | string | The source identifier. |
| url | string | Direct access URL. |
| autoSummary | string | A summary automatically generated from the subtitle entries. |
| autoKeywords | Array<string> | Keywords automatically extracted from the subtitle entries. |
| autoEntities | Array<string> | Entities automatically extracted from the subtitle entries. |
| autoTopics | Array<string> | Topics automatically extracted from the subtitle entries. |
| media | Array<AudioFile | VideoFile> | The media file the subtitle file belongs to. |
| entries | Array<SubtitleEntry> | The subtitle entries associated with the subtitle file. |

[SubtitleEntry](/content-api/data-types/subtitleentry "SubtitleEntry")[TextBlock](/content-api/data-types/textblock "TextBlock")