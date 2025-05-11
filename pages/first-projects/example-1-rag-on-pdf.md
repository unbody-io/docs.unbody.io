# Example 1: Building a RAG System with PDF Documents in Unbody

This guide demonstrates how to set up a Retrieval Augmented Generation (RAG) system using Unbody with PDF documents as your knowledge base. We'll walk through creating a project, uploading PDFs, and implementing a simple question-answering system.

## Prerequisites

- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials
- A folder containing PDF documents

## Get Credentials

1. Create an account by signing up at app.unbody.io
2. Navigate to [seetings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key (key ID and key secret)

## Step 1: Project Setup

First, we'll create an Unbody project and configure a data source. This establishes the foundation for our RAG system.

```javascript
import { UnbodyAdmin } from "unbody";
import { TextVectorizer, ProjectSettings } from "unbody/admin";

// Admin credentials from your Unbody account
const ADMIN_KEY_ID = "your-admin-key-id";
const ADMIN_KEY_SECRET = "your-admin-key-secret";

async function setupUnbodyProject() {
  // Initialize the admin client with your credentials
  const admin = new UnbodyAdmin({
    auth: {
      username: ADMIN_KEY_ID,
      password: ADMIN_KEY_SECRET,
    },
  });
  
  // Configure project settings with default text vectorizer
  // This determines how your documents will be processed and embedded
  const settings = new ProjectSettings()

  settings
    .set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large))
    .set(new PdfParser(PdfParser.NlmSherpa.Default))

  // Create a new project reference
  const project = admin.projects.ref({
    name: "PDF Knowledge Base",
    settings,
  }).save();
  
  // Create a Push API source - this will be used to upload documents
  const source = project.sources.ref({
    name: "PDF Documents",
    type: "PushApi",
  }).save();
  
  // Initialize the source - this prepares it to receive documents
  await source.initialize()

  
  const apiKey = await project.apiKeys.ref({
     name: "demo"
  }).save();

  return {
    projectId: project.id,
    sourceId: savedSource.id,
    apiKey: apiKey.key
  };
}
```

## Step 2: Upload PDF Files

Now we'll upload PDF files to the source we created. Unbody will process these documents, extract their text content, and create embeddings for semantic search.

```javascript
import { UnbodyPushAPI } from "unbody/push";
import fs from 'fs';
import path from 'path';

async function uploadPDFs(projectId, sourceId, apiKey) {
  // Initialize the Push API client with your project details
  const pushApi = new UnbodyPushAPI({
    projectId: projectId,
    sourceId: sourceId,
    auth: { apiKey: apiKey },
  });
  
  // Directory containing your PDF files
  const PDF_DIRECTORY = "./documents";
  
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
    
    // Add metadata about the document
    formData.append("payload", JSON.stringify({
      title: fileName.replace('.pdf', ''),
      tags: ["documentation"]
    }));
    
    // Upload the file
    await pushApi.files.upload({ form: formData });
  }
  
  // After uploading all files, update the source to process the new documents
  // This step is crucial for making the documents searchable
  const admin = new UnbodyAdmin({
    auth: {
      username: ADMIN_KEY_ID,
      password: ADMIN_KEY_SECRET,
    },
  });
  
    const project = await admin.projects.get({
        id: projectId,
    });

    const source = await project.sources.get({
      id: sourceId
    })

    await source.update();
  // The update process may take some time depending on the number and size of documents
  // In a production environment, you would implement a way to check when processing is complete
}
```

## Step 3: Implement RAG System

With our documents uploaded and processed, we can now create a RAG system to answer questions based on the content of the PDFs.

```javascript
import { Unbody } from "unbody";

async function createRagSystem(projectId, apiKey) {
  // Initialize the Unbody client for querying content
  const unbody = new Unbody({
    apiKey: apiKey,
    projectId: projectId,
  });
  
  // This function takes a question and returns an answer based on the PDF content
  async function answerQuestion(question) {
    // Search for relevant documents that might contain the answer
    const response = await unbody.get
      .textBlock
      .search.about(question)  // Semantic search based on the question
      .limit(15)         // Get top 3 most relevant documents
      .select("text")  // Select the fields we need
      .generate.fromMany(  // Generate a cohesive answer from these documents
        `Based on the provided documents, answer this question: ${question}`, 
        ["text"],  // Use these fields from the documents
        { temperature: 0.1 }  // Control the creativity of the response
      )
      .exec();
    
    // Return both the answer and the source documents used
    return {
      answer: response.data.generate.result,
      sources: response.data.payload.map(doc => ({
        id: doc.id,
        title: doc.title
      }))
    };
  }
  
  return { answerQuestion };
}
```

## Putting It All Together
Here's how to use all the pieces together to create a complete RAG system:

```javascript
async function main() {
  try {
    // Step 1: Set up the project and data source
    const { projectId, sourceId, apiKey } = await setupUnbodyProject();
    
    // Step 2: Upload and process PDF documents
    await uploadPDFs(projectId, sourceId, apiKey);
    
    console.log("You can always observe the latest status of the processing on the dashboard:")
    console.log(`https://app.unbody.io/projects/${projectId}/sources/${sourceId}/logs`);


    // Optional: Give some time for processing to complete
    // In a production app, you would implement a proper way to check processing status
    // bellow code should be seperated in your logic and usually should be excuted as part of the frontend 
    await new Promise(resolve => setTimeout(resolve, 120000));

    // Step 3: Create the RAG system
    const { answerQuestion } = await createRagSystem(projectId, apiKey);
    
    // Example usage: Ask a question and get an answer
    const question = "What are the key features described in the documents?";
    const result = await answerQuestion(question);
    
    // The result contains the AI-generated answer and sources
    const { answer, sources } = result;
    
    // In a real application, you would display this to the user
    // or integrate it with your existing systems
  } catch (error) {
    // Handle errors appropriately
  }
}
```