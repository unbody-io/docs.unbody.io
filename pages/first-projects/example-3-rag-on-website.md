# Example 3: RAG System with Website Content and Auto-Enhancers

This guide shows how to create a simple RAG system with website content using Unbody's auto-enhancers.

## Prerequisites

- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials

## Get Credentials

1. Create an account by signing up at app.unbody.io
2. Navigate to [settings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key

## Step 1: Project Setup

```javascript
import { UnbodyAdmin } from "unbody";
import { 
  TextVectorizer, 
  ProjectSettings, 
  SourceTypes,
  AutoSummary,
  AutoKeywords,
  AutoEntities,
  AutoTopics
} from "unbody/admin";

// Admin credentials
const ADMIN_KEY_ID = "your-admin-key-id";
const ADMIN_KEY_SECRET = "your-admin-key-secret";
const WEBSITE_URL = "https://example.com";

async function setupProject() {
  const admin = new UnbodyAdmin({
    auth: { username: ADMIN_KEY_ID, password: ADMIN_KEY_SECRET }
  });
  
  // Create project with enhancers
  const settings = new ProjectSettings();
  settings.set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large));
  settings.set(new AutoSummary(AutoSummary.OpenAI.GPT4oMini));
  settings.set(new AutoKeywords(AutoKeywords.OpenAI.GPT4oMini));
  settings.set(new AutoEntities(AutoEntities.OpenAI.GPT4oMini));
  settings.set(new AutoTopics(AutoTopics.OpenAI.GPT4oMini));
  
  const project = admin.projects.ref({
    name: "Website RAG",
    settings,
  }).save();
  
  // Create and configure WebCrawler
  const source = await project.sources.ref({
    name: "Website Content",
    type: SourceTypes.WebCrawler
  }).save();
  
  await source.setEntrypoint({
    entrypoint: {
      url: WEBSITE_URL,
      maxDepth: 2,
      maxPages: 50
    }
  });
  
  await source.initialize();
  
  const apiKey = await project.apiKeys.ref({ name: "demo" }).save();
  
  return { projectId: project.id, apiKey: apiKey.key };
}
```

## Step 2: Create RAG System

```javascript
import { Unbody } from "unbody";

async function main() {
  // Setup project
  const { projectId, apiKey } = await setupProject();
  
  // Wait for website crawling (in production, check status properly)
  await new Promise(resolve => setTimeout(resolve, 120000));
  
  // Initialize client
  const unbody = new Unbody({
    apiKey: apiKey,
    projectId: projectId,
  });
  
  // Example RAG query
  const question = "What does this website offer?";
  
  const response = await unbody.get.webPage.search
    .about(question)
    .limit(3)
    .select("title", "content", "url", "autoSummary", "autoKeywords")
    .generate.fromMany(
      `Answer this question: ${question}`, 
      ["title", "content", "autoSummary"],
      { temperature: 0.7 }
    )
    .exec();
  
  console.log("Answer:", response.data.generate.result);
  console.log("Sources:", response.data.payload.map(p => p.url));
}
```