---
sidebarTitle: Subtitleentry
title: Subtitleentry
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Subtitleentry","route":"/content-api/data-types/subtitleentry"}]
---

# SubtitleEntry

| Field | Type | Description |
| --- | --- | --- |
| end | string | The end time of the subtitle entry. |
| order | number | The order of the subtitle entry in a subtitle file. |
| remoteId | string | The unique identifier in the source. |
| sourceId | string | The source identifier. |
| start | string | The start time of the subtitle entry. |
| text | string | The entry’s content in plain text. |
| document | Array<SubtitleFile> | The subtitle file the entry belongs to. |

[SpreadsheetDocument](/content-api/data-types/spreadsheetdocument "SpreadsheetDocument")[SubtitleFile](/content-api/data-types/subtitlefile "SubtitleFile")