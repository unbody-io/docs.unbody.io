---
sidebarTitle: Spreadsheet
title: Spreadsheet
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"data-types","route":"/content-api/data-types"},{"title":"Spreadsheet","route":"/content-api/data-types/spreadsheet"}]
---

# Spreadsheet

| Field | Type | Description |
| --- | --- | --- |
| name | string | The name of the spreadsheet. |
| order | number | The order of the sheet in the spreadsheet document. |
| remoteId | string | The unique identifier in the source. |
| sourceId | string | The source identifier. |
| autoSummary | string | A summary automatically generated based on the sheet’s content. |
| autoKeywords | Array<string> | Keywords extracted from the sheet. |
| autoEntities | Array<string> | Entities extracted from the sheet. |
| autoTopics | Array<string> | Topics extracted from the sheet. |
| header | Array<CsvRow> | Sheet’s header row. |
| rows | Array<CsvRow> | Sheet’s data rows. |
| document | Array<SpreadsheetDocument> | The spreadsheet document the sheet belongs to. |

[ImageBlock](/content-api/data-types/imageblock "ImageBlock")[SpreadsheetDocument](/content-api/data-types/spreadsheetdocument "SpreadsheetDocument")