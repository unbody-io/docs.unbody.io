---
sidebarTitle: Image Metadata Extraction Pipeline
title: Image Metadata Extraction Pipeline
__path__: >-
  [{"title":"enhancement","route":"/enhancement"},{"title":"Image Metadata
  Extraction
  Pipeline","route":"/enhancement/image-metadata-extraction-pipeline"}]
---

# Image metadata extraction pipeline

When working with images in your application, you need to automatically extract and structure metadata like colors, subjects, and resolution.

admin-client.ts

```
import { UnbodyAdmin } from "unbody/admin";
 
// Create admin instance with credentials
export const admin = new UnbodyAdmin({
    auth: {
        username: "93156549-...", // ID
        password: "ak_7660b....", // Secret
    },
});
```

enhancer.ts

```
import { Enhancement } from "unbody/admin";
import { admin } from "./admin-client";
 
// 1. Create the enhancement pipeline for image analysis
const imageEnhancementPipeline = new Enhancement.Pipeline(
  "enrich_image",  
  "ImageBlock",    
);
 
// 2. Define metadata extraction step using openai-gpt-4o
const extractImageInfo = new Enhancement.Step(
  "extract_image_info",
  new Enhancement.Action.StructuredGenerator({
    model: "openai-gpt-4o",
    
    prompt: (ctx) => `
      Analyze this image and extract colors, subjects, resolution:
      Image Url: ${ctx.record.url || "None"}
      Caption: ${ctx.record.caption || "No caption"}
      Width: ${ctx.record.width}
      Height: ${ctx.record.height}
      size in bytes: ${ctx.record.size}
    `,
    // using zod schema 
    schema: (ctx, { z }) =>
      z.object({
        colors: z.array(z.string()).describe("Main colors in the image"),
        subjects: z.array(z.string()).describe("Main subjects or objects"),
        resolution: z.string().describe("resolution of the image"),
      }),
  }),
  {
    output: {
      // when extending an native Unbody's collection, any addiotional field should start with an "x"
      xColors: (ctx) => JSON.stringify(ctx.result.json.colors),
      xSubjects: (ctx) => JSON.stringify(ctx.result.json.subjects),
      xResolution: (ctx) => ctx.result.json.resolution,
    },
  }
);
 
// 3. Add extraction step to pipeline
imageEnhancementPipeline.add(extractImageInfo);
 
// 4. Configure a project with the enhancement pipeline
export const enhancement = new Enhancement();
enhancement.add(imageEnhancementPipeline);
```

project-settings.ts

```
import {
  AutoSummary,
  AutoVision,
  CustomSchema,
  Generative,
  ImageVectorizer, 
  PdfParser,
  ProjectSettings,
  TextVectorizer,
} from "unbody/admin";
import { admin } from "./admin-client";
import { enhancement } from "./enhancer";
 
const projectSettings = new ProjectSettings();
projectSettings
  .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Small))
  .set(new ImageVectorizer(ImageVectorizer.Img2VecNeural.Default))
  .set(new Generative(Generative.OpenAI.GPT4o))
  .set(new AutoSummary(AutoSummary.OpenAI.GPT4o))
  .set(new AutoVision(AutoVision.OpenAI.GPT4o))
  .set(new PdfParser(PdfParser.NlmSherpa.Default))
  .set(enhancement);
 
// Create project with extended ImageBlock schema
export const project = admin.projects.ref({
    name: "Image Analysis Project",
    settings: projectSettings,
});
 
project.settings.set(
    new CustomSchema().extend(
    new CustomSchema.Collection("ImageBlock")
        // when extending an native Unbody's collection, any addiotional field should start with an "x"
        .add(new CustomSchema.Field.Text("xColors", "Main colors detected in the image"))
        .add(new CustomSchema.Field.Text("xSubjects", "Main subjects or objects detected"))
        .add(new CustomSchema.Field.Text("xResolution", "Resolution information"))
    )
);
 
await project.save();
```

app.ts

```
import { BooleanField, NumberField, StringField, Unbody, IImageBlock } from "unbody";
import { project } from "./project-settings";
 
// Create unbody sdk instance
const unbody = new Unbody({
    apiKey: "...", // Project Api Key
    projectId: "...", // Project ID
});
 
// Query enhanced images with type safety
interface ExtendedImageBlock extends IImageBlock {
  xColors: StringField;
  xSubjects: StringField;
  xResolution: StringField;
}
 
const { data: { payload } } = await unbody.get
  .collection<ExtendedImageBlock>("ImageBlock")
  .select("originalName", "colors", "subjects", "resolution")
  .exec();
 
console.log(payload)  
```

## 

Response

## Related Resources

-   [Enhancement Pipeline Documentation](/project-configurations/enhancers)
-   [Custom Schema Guide](/project-configurations/custom-schemas)

[Working With Videos](/working-with-videos "Working With Videos")[Build FAQ Generator From PDFs](/enhancement/build-faq-generator "Build FAQ Generator From PDFs")