---
sidebarTitle: Advanced Data Schema
title: Advanced Data Schema
__path__: >-
  [{"title":"importing-custom-data","route":"/importing-custom-data"},{"title":"Advanced
  Data Schema","route":"/importing-custom-data/advanced-data-schema"}]
---

# Importing Advanced Custom Schema Including File

When you need to import custom data, including files and complex structures, you can extend built-in collections with your schema. This recipe shows how to:

-   Extend ImageBlock with custom fields
-   Upload images with custom product data
-   Fetch custom imported data

```
import { BooleanField, NumberField, StringField, Unbody, IImageBlock } from "unbody";
import {
  AutoSummary,
  AutoVision,
  CustomSchema,
  Generative,
  ImageVectorizer,
  ProjectSettings,
  SourceTypes,
  TextVectorizer,
  UnbodyAdmin,
} from "unbody/admin";
import { UnbodyPushAPI } from "@unbody-io/push-api";
 
// 1. Create project with settings
const projectSettings = new ProjectSettings();
projectSettings
  .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Small))
  .set(new Generative(Generative.OpenAI.GPT4o))
  .set(new AutoSummary(AutoSummary.OpenAI.GPT4o))
  .set(new AutoVision(AutoVision.OpenAI.GPT4o));
 
// Create admin instance with credentials
const admin = new UnbodyAdmin({
    auth: {
        username: "93156549-...", // ID
        password: "ak_7660b....", // Secret
    },
});
 
const project = admin.projects.ref({
  name: "Product Catalog Images",
  settings: projectSettings,
});
 
// 2. Define enhanced schema for product images
const customSchema = new CustomSchema();
const productImageBlock = new CustomSchema.Collection("ImageBlock");
 
// Add product-specific fields
productImageBlock.add(new CustomSchema.Field.Text("productName", "Product Name"));
productImageBlock.add(new CustomSchema.Field.Text("description", "Product Description"));
productImageBlock.add(new CustomSchema.Field.Number("price", "Product Price"));
productImageBlock.add(new CustomSchema.Field.Text("category", "Product Category"));
productImageBlock.add(new CustomSchema.Field.Boolean("inStock", "Stock Status"));
productImageBlock.add(new CustomSchema.Field.Number("stockQuantity", "Stock Quantity"));
 
customSchema.extend(productImageBlock);
project.settings.set(customSchema);
await project.save();
 
// 3. Set up Push API source
const source = project.sources.ref({
  name: "Push API Source",
  type: SourceTypes.PushApi,
});
await project.sources.save(source);
await source.initialize();
 
// 4. Upload product image with product data
 
// Create pushApi instance with credentials
const pushApi = new UnbodyPushAPI({
    projectId: "22e0b...", // Project ID
    sourceId: "9d98...", // "Push API Source" -> Source ID
    auth: {
        apiKey: "pk_.....", // Project Api Key
    },
});
 
const formData = new FormData();
formData.append("id", `image-${Date.now()}`);
formData.append("file", fileBlob);
formData.append(
  "payload",
  JSON.stringify({
    productName: "Classic T-Shirt",
    description: "Premium cotton t-shirt",
    price: 29.99,
    category: "Apparel",
    inStock: true,
    stockQuantity: 100,
  })
);
 
const { data: imageData } = await pushApi.files.upload({
  form: formData,
});
 
// 5. Fetch custom imported data
 
// Create unbody sdk instance
const unbody = new Unbody({
    apiKey: "pk_.....", // Project Api Key
    projectId: "22e0b...", // Project ID
});
 
interface ExtendedImageBlock extends IImageBlock {
  productName: StringField;
  description: StringField;
  price: NumberField;
  category: StringField;
  inStock: BooleanField;
  stockQuantity: NumberField;
}
 
const { data: { payload } } = await unbody.get
  .collection<ExtendedImageBlock>("ImageBlock")
  .select(
    "productName",
    "description",
    "price",
    "category",
    "inStock",
    "stockQuantity",
    "url",
    "originalName"
  )
  .exec();
```

## 

Response

## Related Resources

-   [Custom Schema Guide](/project-configurations/custom-schemas)
-   [Push API Guide](/data-ingestion/push-api)

[Basic Data Schema](/importing-custom-data/basic-data-schema "Basic Data Schema")[Overview](/data-ingestion/overview "Overview")