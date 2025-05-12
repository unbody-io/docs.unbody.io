# Building a RAG System with Website Content and Auto-Enhancers

This guide shows how to create a simple RAG system with website content using Unbody's auto-enhancers.

Prerequisites:
- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials

Get Credentials:

1. Create an account by signing up at app.unbody.io
2. Navigate to [settings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key

## Step 1. Install the SDK
Install the Unbody SDK to interact with the platform programmatically.

```bash
npm install unbody
```

## Step 2. Create an Admin API instance
Initialize a reusable admin client with your authentication credentials.

```js
import { UnbodyAdmin } from "unbody/admin";

const admin = new UnbodyAdmin({
  auth: {
    // make sure to always protect the ADMIN keys
    username: process.env.UNBODY_ADMIN_ID,
    password: process.env.UNBODY_ADMIN_SECRET,
  },
});

// Website to crawl
const WEBSITE_URL = "https://example.com";
```

## Step 3. Project setup with auto-enhancers
Configure a new project with various auto-enhancers for content processing.

```js
import { 
  TextVectorizer, 
  ProjectSettings, 
  SourceTypes,
  AutoSummary,
  AutoKeywords,
  AutoEntities,
  AutoTopics
} from "unbody/admin";

export async function setupProject() {
  // Create project with enhancers
  // This determines how your web content will be processed and enhanced
  const settings = new ProjectSettings();
  settings.set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large));
  settings.set(new AutoSummary(AutoSummary.OpenAI.GPT4oMini));
  settings.set(new AutoKeywords(AutoKeywords.OpenAI.GPT4oMini));
  settings.set(new AutoEntities(AutoEntities.OpenAI.GPT4oMini));
  settings.set(new AutoTopics(AutoTopics.OpenAI.GPT4oMini));
  
  const project = await admin.projects.ref({
    name: "Website RAG",
    settings,
  }).save();
  
  const apiKey = await project.apiKeys.ref({
    name: "demo"
  }).save();
  
  return { 
    projectId: project.id, 
    apiKey: apiKey.key as string
  };
}
```

---

## Step 4. Configure the web crawler
Set up and initiate the web crawler to collect content from the specified website.

```js
export async function setupCrawler(projectId) {
  const project = await admin.projects.get({ id: projectId });
  
  // Create and configure WebCrawler
  const source = await project.sources.ref({
    name: "Website Content",
    type: SourceTypes.WebCrawler
  }).save();
  
  // Configure the crawler with entry point and crawling parameters
  await source.setEntrypoint({
    entrypoint: {
      url: WEBSITE_URL,
      maxDepth: 2,
      maxPages: 50
    }
  });
  
  // Initialize the source to start crawling
  if(source.initialized){
    await source.update();
  }else{
    await source.initialize();
  }
  
  // Wait for the job to finish
  while (true) {
    const { jobs: [job] } = await source.listJobs({ limit: 1 });
    if (job.status === "finished") {
      break;
    }
    if (job.status === "cancelled") {
      throw new Error("Job cancelled");
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return source.id;
}
```

---

## Step 5. Query your website content
Perform semantic search and generate answers using RAG on your processed website content.

```js
import { Unbody } from "unbody";

async function main() {
  // Setup project and crawler
  const { projectId, apiKey } = await setupProject();
  
  console.log("The following will take a while to complete. You can wait here and/or observe the crawling status on the dashboard:");
  
  const sourceId = await setupCrawler(projectId);
  console.log(`https://app.unbody.io/projects/${projectId}/sources/${sourceId}/logs`);
  
  const unbody = new Unbody({
    projectId,
    apiKey
  });
  
  // Example RAG query
  const question = "What does this website offer?";
  
  const { data } = await unbody.get.webPage.search
    .about(question)
    .limit(3)
    .select("title", "content", "url", "autoSummary", "autoKeywords")
    .generate.fromMany(
      `Answer this question: ${question}`, 
      ["title", "content", "autoSummary"],
      { temperature: 0.7 }
    )
    .exec();
  
  console.log("Answer:", data.generate.result);
  console.log("Sources:", data.payload.map(p => p.url));
}

main();
```