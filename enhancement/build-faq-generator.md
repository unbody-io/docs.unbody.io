---
sidebarTitle: Build Faq Generator
title: Build Faq Generator
__path__: >-
  [{"title":"enhancement","route":"/enhancement"},{"title":"Build Faq
  Generator","route":"/enhancement/build-faq-generator"}]
---

# Build FAQ Generator From PDF Document

When building a knowledge base or documentation system, automatically extracting FAQs from PDF documents can significantly improve content accessibility and searchability. This recipe shows how to:

-   Extract structured Q&A pairs from PDF documents
-   Store FAQs in a searchable format
-   Maintain type safety for FAQ data

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
 
// 1. Initialize pipeline for PDF document processing
const faqPipeline = new Enhancement.Pipeline(
  "generate_faqs",      
  "TextDocument",       
  {
    if: (ctx) => ctx.record.mimeType === "application/pdf", 
  }
);
 
// 2. Create FAQ generation step with structured output
const generateFAQs = new Enhancement.Step(
  "extract_faqs",    
  new Enhancement.Action.StructuredGenerator({
    model: "openai-gpt-4o",
    prompt: (ctx) => `
      Generate a list of FAQs based on this document:
      Title: ${ctx.record.title || "Untitled"}
      Content: ${ctx.record.text}
      
      Extract key questions and their answers from the content.
    `,
    schema: (ctx, { z }) =>
      z.object({
        faqs: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ).describe("List of FAQs extracted from the document"),
      }),
  }),
  {
    output: {
      xFaqs: (ctx) => JSON.stringify(ctx.result.json.faqs),
    },
  }
);
 
// 3. Add generation step to pipeline
faqPipeline.add(generateFAQs);
 
// 4. Configure a project with the enhancement pipeline
export const enhancement = new Enhancement();
enhancement.add(faqPipeline);
```

project-settings.ts

```
import {
  AutoSummary,
  AutoVision,
  CustomSchema,
  Generative,
  PdfParser,
  ProjectSettings,
  TextVectorizer,
} from "unbody/admin";
import { admin } from "./admin-client";
import { enhancement } from "./enhancer";
 
const projectSettings = new ProjectSettings();
projectSettings
  .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Small))
  .set(new Generative(Generative.OpenAI.GPT4o))
  .set(new AutoSummary(AutoSummary.OpenAI.GPT4o))
  .set(new AutoVision(AutoVision.OpenAI.GPT4o))
  .set(new PdfParser(PdfParser.NlmSherpa.Default))
  .set(enhancement);
 
// Create project with extended TextDocument schema
export const project = admin.projects.ref({
  name: "PDF FAQ Extraction Project",
  settings: projectSettings,
});
 
project.settings.set(
  new CustomSchema().extend(
    new CustomSchema.Collection("TextDocument")
      .add(new CustomSchema.Field.Text("xFaqs", "FAQs generated from the document"))
  )
);
 
await project.save();
```

app.ts

```
import { BooleanField, NumberField, StringField, Unbody, ITextDocument } from "unbody";
import { project } from "./project-settings";
 
// Create unbody instance
const unbody = new Unbody({
    apiKey: "pk_.....", // Project Api Key
    projectId: "22e0b...", // Project Id
});
 
// Query documents with type safety
interface ExtendedTextDocument extends ITextDocument {
  xFaqs: StringField;
}
 
const { data: { payload } } = await unbody.get
  .collection<ExtendedTextDocument>("TextDocument")
  .where({
    mimeType: "application/pdf"
  })
  .select("title", "originalName", "xFaqs")
  .exec();
 
console.log(payload);
```

## 

Response

## Related Resources

-   [Enhancement Pipeline Documentation](/project-configurations/enhancers)
-   [Custom Schema Guide](/project-configurations/custom-schemas)
-   [PDF Parser Configuration](/project-configurations/pdf-parser)

[Image metadata extraction pipeline](/enhancement/image-metadata-extraction-pipeline "Image metadata extraction pipeline")[Basic Data Schema](/importing-custom-data/basic-data-schema "Basic Data Schema")