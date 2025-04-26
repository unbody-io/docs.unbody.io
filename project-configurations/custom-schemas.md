---
sidebarTitle: Custom Schemas
title: Custom Schemas
__path__: >-
  [{"title":"project-configurations","route":"/project-configurations"},{"title":"Custom
  Schemas","route":"/project-configurations/custom-schemas"}]
---

# Custom Schemas

Custom Schemas in Unbody allow you to define and manage your own data structures. This flexibility enables developers to handle unique data requirements, extend built-in schemas, and integrate deeply with their applications.

* * *

## What Are Custom Schemas?

Custom Schemas let you:

-   Create your own **collections** (data tables).
-   Add custom **fields** (columns) to those collections.
-   Extend built-in schemas (e.g., `ImageBlock`, `VideoFile`) with additional fields.

For example:

-   Add a `chapter` field to `VideoFile` for storing extracted video chapters.
-   Create a custom collection called `BlogPost` to handle rich metadata for articles.

* * *

## Why Use Custom Schemas?

-   **Flexibility**: Adapt data structures to your app’s unique needs.
-   **Extensibility**: Extend existing schemas instead of starting from scratch.
-   **AI-Ready**: Customize schemas to include fields optimized for vectorization and enrichment.

* * *

## Configuring Custom Schemas Using Admin API

You can define and manage Custom Schemas programmatically. Learn more about [Admin API Custom Schema Configuration](/admin-api#customschema-configuration)

### Example: Creating a Custom Schema

```
import { UnbodyAdmin, CustomSchema, ProjectSettings } from 'unbody/admin'
 
// Initialize Admin API
const admin = new UnbodyAdmin({
  auth: {
    username: '[admin-key-id]',
    password: '[admin-key-secret]',
  },
})
 
// Define a new custom schema
const customSchema = new CustomSchema()
 
// Create a custom collection with fields
const blogPostCollection = new CustomSchema.Collection('BlogPost')
blogPostCollection.add(new CustomSchema.Field.Text('title', 'Blog Title'))
blogPostCollection.add(new CustomSchema.Field.Text('content', 'Blog Content'))
blogPostCollection.add(new CustomSchema.Field.Date('publishedAt', 'Published Date'))
 
// Add the collection to the schema
customSchema.add(blogPostCollection)
 
const projectSettings = new ProjectSettings()
projectSettings.set(customSchema)
 
const project = await admin.projects.ref({
  name: "My First Project",
  settings: projectSettings,
})
 
await project.save()
 
console.log(`Custom Schema applied to project: ${project.name}`)
 
```

* * *

## Key Components of Custom Schemas

### 1\. Collections

Collections are the top-level entities in Custom Schemas, similar to tables in a database.

-   **Example**: `BlogPost`, `Product`, `CustomUser`.

* * *

### 2\. Fields

Fields define the structure of data within a collection.

### Available Field Types

| Type | Description |
| --- | --- |
| `Field.Text` | Stores textual data with optional tokenization. |
| `Field.Int` | Stores integer values. |
| `Field.Number` | Stores floating-point numbers. |
| `Field.Date` | Stores dates in ISO format. |
| `Field.Boolean` | Stores true/false values. |
| `Field.Object` | Stores nested JSON objects. |
| `Field.GeoCoordinates` | Stores latitude and longitude. |
| `Field.Cref` | Cross-references other collections. |

* * *

### 3\. Extending Built-in Schemas

Built-in schemas like `VideoFile` or `TextDocument` can be extended with custom fields.

**Example: Adding a Custom Field to VideoFile**

```
const videoFileCollection = new CustomSchema.Collection('VideoFile')
videoFileCollection.add(
  new CustomSchema.Field.Text(
    'chapter',
    'Extracted Chapters',
    true // Indicates an array field
  )
)
customSchema.extend(videoFileCollection)
 
```

* * *

### 4\. Field Arguments

When defining fields, the following arguments are available:

-   `name` (string): Field name in camelCase.
-   `description` (string): Field description.
-   `array` (boolean): Whether the field stores an array of values.
-   `tokenization` (string): Tokenization strategy for text fields (`word`, `field`, `lowercase`, `whitespace`).
-   `skipVectorization` (boolean): If `true`, skips vectorization for this field.

* * *

## Best Practices

1.  **Naming Conventions**:
    -   Use PascalCase for collections (e.g., `BlogPost`).
    -   Use camelCase for fields (e.g., `publishedAt`).
2.  **Avoid Redundancy**:
    -   Extend built-in schemas instead of duplicating functionality.
3.  **Optimize for AI**:
    -   Use tokenization wisely for text fields to improve vectorization.
4.  **Cross-References**:
    -   Use `Field.Cref` to link collections for relational data.

[Generative Modules](/project-configurations/generative-modules "Generative Modules")[Data Processors](/project-configurations/data-processors "Data Processors")