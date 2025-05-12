# Building a RAG System with PDF Documents in Unbody

This guide demonstrates how to set up a Retrieval Augmented Generation (RAG) system using Unbody with PDF documents as your knowledge base. We'll walk through creating a project, uploading PDFs, and implementing a simple question-answering system.

Prerequisites:
- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials
- A folder containing PDF documents

Get Credentials:

1. Create an account by signing up at app.unbody.io
2. Navigate to [settings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key (key ID and key secret)

## Step 1. Install the SDK
Install the Unbody SDK to interact with the platform programmatically.

```bash copy
npm install unbody
````

## Step 2. Create an Admin API instance
Initialize a reusable admin client with your authentication credentials.

```js copy
import { UnbodyAdmin } from "unbody/admin";

const admin = new UnbodyAdmin({
  auth: {
    // make sure to always protect the ADMIN keys
    username: process.env.UNBODY_ADMIN_ID,
    password: process.env.UNBODY_ADMIN_SECRET,
  },
});
```

## Step 3. Project setup
Configure a new project with the right settings for processing PDF documents.

```js
import { TextVectorizer, ProjectSettings, PdfParser } from "unbody/admin";

export async function setupProject() {
  // Configure project settings with default text vectorizer
  // This determines how your documents will be processed and embedded
  const settings = new ProjectSettings()

  settings
    .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large))
    .set(new PdfParser(PdfParser.NlmSherpa.Default))

  // Create a new project reference
  const project = await admin.projects.ref({
    name: "PDF Knowledge Base",
    settings,
  }).save();

  // Create a Push API source - this will be used to upload documents
  const source = await project.sources.ref({
    name: "PDF Documents",
    type: "push_api",
  }).save();

  const apiKey = await project.apiKeys.ref({
    name: "demo"
  }).save();

  return {
    projectId: project.id,
    sourceId: source.id,
    apiKey: apiKey.key as string
  };
}
```

---

## Step 4. Upload data
Upload your PDF files and trigger the extraction and embedding process.

```js
import { UnbodyPushAPI } from "unbody/push";
import fs from "fs";
import path from "path";

export async function uploadPDFs(projectId, sourceId, apiKey) {
  // Initialize the Push API client with your project details
  const pushApi = new UnbodyPushAPI({
    projectId: projectId,
    sourceId: sourceId,
    auth: { apiKey: apiKey },
  });

  const project = await admin.projects.get({
    id: projectId,
  });

  const source = await project.sources.get({
    id: sourceId
  })


  // Directory containing your PDF files
  const PDF_DIRECTORY = "./files";

  // Find all PDF files in the directory
  const pdfFiles = fs
    .readdirSync(PDF_DIRECTORY)
    .filter(file => file.endsWith('.pdf'));

  // Upload each PDF file to Unbody
  for (let i = 0; i < pdfFiles.length; i++) {
    const fileName = pdfFiles[i];
    const filePath = path.join(PDF_DIRECTORY, fileName);
    const file = fs.readFileSync(filePath);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append("id", `doc-${i}`);
    formData.append("file", new Blob([file]), fileName);

    // Upload the file
    await pushApi.files.upload({ form: formData });
  }

  // After uploading all files, update or init the source to process the new documents
  // This step is crucial for making the documents searchable
  if(source.initialized){
    await source.update()
  }else{
    await source.initialize()
  }

  // Wait for the job to finish
  while (true) {
    const { jobs: [job] } = await source.listJobs({ limit: 1 })
    if (job.status === "finished") {
      break;
    }
    if (job.status === "cancelled") {
      throw new Error("Job cancelled");
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return;
}
```

---

## Step 5. Query your documents
Perform semantic search and generate answers using RAG on your processed documents.

```js
import { Unbody } from "unbody";

// Example orchestration (optional):
async function main() {
  const { projectId, sourceId, apiKey } = await setupProject();

  console.log("The following will take a while to complete. You can wait here and/or observe the processing status on the dashboard:");
  console.log(`https://app.unbody.io/projects/${projectId}/sources/${sourceId}/logs`);
  await uploadPDFs(projectId, sourceId, apiKey);

  const unbody = new Unbody({
    projectId,
    apiKey
  });

  const question = "What is the capital of France?";

  const { data } = await unbody.get
    .textBlock
    .search.about(question)
    .limit(15)
    .select("text")
    .generate.fromMany(
      `Based on the provided documents, answer this question: ${question}`,
      ["text"],
    ).exec();

  console.log(data)
}

main();
```