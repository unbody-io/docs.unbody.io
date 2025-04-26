---
sidebarTitle: Basic Data Schema
title: Basic Data Schema
__path__: >-
  [{"title":"importing-custom-data","route":"/importing-custom-data"},{"title":"Basic
  Data Schema","route":"/importing-custom-data/basic-data-schema"}]
---

# Importing Basic Custom Data Schema

When you can’t import your custom data through third-party [data providers](/providers/overview), you need to define a schema and use [Push API](/data-ingestion/push-api) to import your data. This recipe shows how to:

-   Create a custom schema for your data
-   Import data using Push API
-   Fetch imported custom data

```
import { BooleanField, NumberField, StringField, Unbody } from "unbody";
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
    .set(new ImageVectorizer(ImageVectorizer.Img2VecNeural.Default))
    .set(new Generative(Generative.OpenAI.GPT4o))
    .set(new AutoSummary(AutoSummary.OpenAI.GPT4o))
    .set(new AutoVision(AutoVision.OpenAI.GPT4o));
 
// create an admin instance with credentials
const admin = new UnbodyAdmin({
    auth: {
    username: "93156549-...", // ID
    password: "ak_7660b....", // Secret
    },
});
 
const project = admin.projects.ref({
    name: "Products Projects",
    settings: projectSettings,
});
 
// 2. Define product schema
const customSchema = new CustomSchema();
const productCollection = new CustomSchema.Collection("ProductCollection");
 
productCollection.add(new CustomSchema.Field.Text("name", "Product Name"));
productCollection.add(
    new CustomSchema.Field.Number("price", "Product Price")
);
productCollection.add(
    new CustomSchema.Field.Text("description", "Product Description")
);
productCollection.add(
    new CustomSchema.Field.Boolean("inStock", "Stock Status")
);
 
customSchema.add(productCollection);
project.settings.set(customSchema);
await project.save();
 
// 3. Set up Push API source
const source = project.sources.ref({
    name: "Push API Source",
    type: SourceTypes.PushApi,
});
await project.sources.save(source);
 
// 4. Add product data
const productData = {
    name: "Wireless Mouse",
    price: 29.99,
    description: "Ergonomic wireless mouse with long battery life",
    inStock: true,
};
 
// Create pushApi instance with credentials
const pushApi = new UnbodyPushAPI({
    projectId: "22e0b...", // Project ID
    sourceId: "9d98...", //  "Push API Source" -> Source ID
    auth: {
    apiKey: "pk_.....", //  Project Api key
    },
});
 
const { data } = await pushApi.records.create({
    id: `product-${Date.now()}`,
    collection: "ProductCollection",
    payload: productData,
});
 
// 5. Initialize source
await source.initialize(); // used source instance
 
// 6. Fetch imported data
 
// Create unbody sdk instance
const unbody = new Unbody({
    apiKey: "pk_.....",
    projectId: "22e0b...", // Project Api Key
});
 
interface IProduct {
    name: StringField;
    price: NumberField;
    description: StringField;
    inStock: BooleanField;
}
 
const {
    data: { payload },
} = await unbody.get
    .collection<IProduct>("ProductCollection")
    .select("name", "description", "price", "inStock")
    .exec();
```

## 

Response

## Related Resources

-   [Custom Schema Guide](/project-configurations/custom-schemas)
-   [Push API Guide](/data-ingestion/push-api)

[Build FAQ Generator From PDFs](/enhancement/build-faq-generator "Build FAQ Generator From PDFs")[Advanced Data Schema Including File](/importing-custom-data/advanced-data-schema "Advanced Data Schema Including File")