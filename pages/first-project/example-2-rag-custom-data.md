# Building a Semantic Search System with Custom Data in Unbody

This guide demonstrates how to set up a semantic search system using Unbody with custom data collections. We'll walk through creating a project with custom schemas, uploading your own structured data, and implementing semantic search.

Prerequisites:
- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials
- Custom data to search (we'll use product data in this example)

Get Credentials:

1. Create an account by signing up at app.unbody.io
2. Navigate to [settings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key (key ID and key secret)

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
```

## Step 3. Project setup with custom schema
Configure a new project with a custom schema for your product data collection.

```js
import { TextVectorizer, ProjectSettings, CustomSchema } from "unbody/admin";

export async function setupProject() {
  // Configure project settings with text vectorizer
  // This determines how your data will be processed and embedded
  const settings = new ProjectSettings();
  settings.set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large));
  
  // Define custom schema for products
  const customSchema = new CustomSchema();
  const productCollection = new CustomSchema.Collection("ProductCollection");
  
  // Add fields to product collection
  productCollection.add(
    new CustomSchema.Field.Text("name", "Product Name")
  );
  productCollection.add(
    new CustomSchema.Field.Text("description", "Description", false, "word")
  );
  productCollection.add(
    new CustomSchema.Field.Number("price", "Price")
  );
  productCollection.add(
    new CustomSchema.Field.Boolean("inStock", "In Stock")
  );
  
  // Add categories as array of text
  productCollection.add(
    new CustomSchema.Field.Text("categories", "Categories", true)
  );
  
  // Add nested field for manufacturer details
  const manufacturerField = new CustomSchema.Field.Object("manufacturer", "Manufacturer");
  manufacturerField
    .add(new CustomSchema.Field.Text("name", "Manufacturer Name"))
    .add(new CustomSchema.Field.Text("country", "Country"));
  
  productCollection.add(manufacturerField);
  
  // Add collection to schema
  customSchema.add(productCollection);
  
  // Add schema to project settings
  settings.set(customSchema);
  
  // Create a new project
  const project = await admin.projects.ref({
    name: "Product Search System",
    settings,
  }).save();
  
  // Create a Push API source
  const source = await project.sources.ref({
    name: "Product Data",
    type: "push_api",
  }).save();
  
  // Initialize the source
  await source.initialize();
  
  // Create API key
  const apiKey = await project.apiKeys.ref({
    name: "product-demo"
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
Upload your custom product data to the Unbody source.

```js
import { UnbodyPushAPI } from "unbody/push";

export async function uploadProductData(projectId, sourceId, apiKey) {
  // Initialize the Push API client
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
  });
  
  // Sample product data
  const products = [
    {
      id: "prod-001",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design for immersive sound experience.",
      price: 299.99,
      inStock: true,
      categories: ["Electronics", "Audio", "Wireless"],
      manufacturer: {
        name: "SoundTech",
        country: "Japan"
      }
    },
    {
      id: "prod-002",
      name: "Smart Fitness Tracker",
      description: "Advanced fitness tracker with heart rate monitoring, sleep analysis, and 7-day battery life. Water-resistant and compatible with iOS and Android.",
      price: 129.95,
      inStock: true,
      categories: ["Wearables", "Fitness", "Electronics"],
      manufacturer: {
        name: "FitLife",
        country: "USA"
      }
    },
    {
      id: "prod-003",
      name: "Ultra-Thin Laptop",
      description: "Powerful laptop featuring 14-inch 4K display, 16GB RAM, 512GB SSD, and all-day battery life in an ultra-thin aluminum design.",
      price: 1299.00,
      inStock: false,
      categories: ["Electronics", "Computers", "Laptops"],
      manufacturer: {
        name: "TechPro",
        country: "Taiwan"
      }
    }
  ];
  
  // Upload each product to the custom collection
  for (const product of products) {
    await pushApi.records.create({
      id: product.id,
      collection: "ProductCollection",
      payload: product
    });
    console.log(`Uploaded product: ${product.name}`);
  }
  
  // After uploading all products, update or initialize the source to process the new data
  // This step is crucial for making the products searchable
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
  
  return;
}
```

---

## Step 5. Query your data
Perform semantic search and filter results based on criteria.

```js
import { Unbody } from "unbody";

// Example orchestration (optional):
async function main() {
  const { projectId, sourceId, apiKey } = await setupProject();
  
  console.log("The following will take a while to complete. You can wait here and/or observe the processing status on the dashboard:");
  console.log(`https://app.unbody.io/projects/${projectId}/sources/${sourceId}/logs`);
  
  await uploadProductData(projectId, sourceId, apiKey);
  
  const unbody = new Unbody({
    projectId,
    apiKey
  });
  
  // Example 1: Basic semantic search for wireless products
  const searchQuery = "wireless audio devices";
  
  const wirelessSearch = await unbody.get
    .collection("ProductCollection")
    .search.about(searchQuery)
    .select("id", "name", "description", "price", "inStock", "categories", "manufacturer")
    .exec();
  
  console.log("Search results for 'wireless audio devices':", wirelessSearch.data.payload);
  
  // Example 2: Search with filters
  const filteredSearch = await unbody.get
      .collection("ProductCollection")
      .search.about("portable electronics")
      .where(({ Equal, LessThanEqual, And }) => And({
        inStock: Equal(true),
        price: LessThanEqual(200),
      }))
      .select("id", "name", "description", "price", "inStock", "categories", "manufacturer")
      .exec();
  
  console.log("Affordable in-stock electronics:", filteredSearch.data.payload);
}

main();
```