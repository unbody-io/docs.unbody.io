# Example 1: Building a Semantic Search System with Custom Data in Unbody

This guide demonstrates how to set up a semantic search system using Unbody with custom data collections. We'll walk through creating a project with custom schemas, uploading your own structured data, and implementing semantic search.

## Prerequisites

- Node.js 16+
- NPM or Yarn
- Unbody account with admin credentials
- Custom data to search (we'll use product data in this example)

## Get Credentials

1. Create an account by signing up at app.unbody.io
2. Navigate to [settings/admin-keys](https://app.unbody.io/settings/admin-keys) & create a new admin key (key ID and key secret)

## Step 1: Project Setup with Custom Schema

First, we'll create an Unbody project and define a custom schema for our product data collection.

```javascript
import { UnbodyAdmin } from "unbody";
import { TextVectorizer, ProjectSettings, CustomSchema } from "unbody/admin";

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
  
  // Configure project settings with text vectorizer
  const settings = new ProjectSettings();
  settings.set(new TextVectorizer(TextVectorizer.OpenAI.TextEmbedding3Large));
  
  // Define custom schema for products
  const customSchema = new CustomSchema();
  const productCollection = new CustomSchema.Collection("ProductCollection");
  
  // Add fields to product collection
  productCollection.add(new CustomSchema.Field.Text("name", "Product Name"));
  productCollection.add(new CustomSchema.Field.Text("description", "Description", false, "word"));
  productCollection.add(new CustomSchema.Field.Number("price", "Price"));
  productCollection.add(new CustomSchema.Field.Boolean("inStock", "In Stock"));
  
  // Add categories as array of text
  productCollection.add(new CustomSchema.Field.Text("categories", "Categories", true));
  
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
  
  // Create a new project reference
  const project = admin.projects.ref({
    name: "Product Search System",
    settings,
  }).save();
  
  // Create a Push API source
  const source = project.sources.ref({
    name: "Product Data",
    type: "PushApi",
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
    apiKey: apiKey.key
  };
}
```

## Step 2: Upload Custom Data

Now we'll upload product data to our custom collection using the Push API.

```javascript
import { UnbodyPushAPI } from "unbody/push";

async function uploadProductData(projectId, sourceId, apiKey) {
  // Initialize the Push API client
  const pushApi = new UnbodyPushAPI({
    projectId: projectId,
    sourceId: sourceId,
    auth: { apiKey: apiKey },
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
  }
  
  // Update the source to process the new data
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
  });
  
  await source.update();
}
```

## Step 3: Implement Semantic Search

With our custom data uploaded and processed, we can now implement semantic search to find products.

```javascript
import { Unbody } from "unbody";

async function createSearchSystem(projectId, apiKey) {
  // Initialize the Unbody client
  const unbody = new Unbody({
    apiKey: apiKey,
    projectId: projectId,
  });
  
  // Define our Product interface to match our schema
  // This gives us type safety when working with search results
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    inStock: boolean;
    categories: string[];
    manufacturer: {
      name: string;
      country: string;
    };
  }
  
  // Function to search products semantically
  async function searchProducts(query) {
    const response = await unbody.get
      .collection<Product>("ProductCollection")
      .search
      .about(query)  // Semantic search based on the query
      .select("id", "name", "description", "price", "inStock", "categories", "manufacturer")
      .exec();
    
    // Process and return the results with certainty scores
    return response.data.payload.map(product => ({
      ...product,
      certainty: product._additional?.certainty || 0
    }));
  }
  
  // Function to search and filter products
  async function searchAndFilterProducts(query, options = {}) {
    // Start with base query
    let searchQuery = unbody.get
      .collection<Product>("ProductCollection")
      .search
      .about(query);
    
    // Apply filters based on documentation examples
    if (options.inStock !== undefined || options.maxPrice !== undefined || (options.categories && options.categories.length > 0)) {
      searchQuery = searchQuery.where(({ Equal, LessThanEqual, And, In }) => {
        const conditions = [];
        
        if (options.inStock !== undefined) {
          conditions.push({ inStock: Equal(options.inStock) });
        }
        
        if (options.maxPrice !== undefined) {
          conditions.push({ price: LessThanEqual(options.maxPrice) });
        }
        
        if (options.categories && options.categories.length > 0) {
          conditions.push({ categories: In(options.categories) });
        }
        
        // If multiple conditions, use And
        if (conditions.length > 1) {
          return And(...conditions);
        }
        
        // Just return the single condition
        return conditions[0];
      });
    }
    
    // Execute the query
    const response = await searchQuery
      .select("id", "name", "description", "price", "inStock", "categories", "manufacturer")
      .exec();
    
    return response.data.payload;
  }
  
  return { searchProducts, searchAndFilterProducts };
}
```

## Putting It All Together

Here's how to use all the pieces together to create a complete semantic search system for custom data:

```javascript
async function main() {
  try {
    // Step 1: Set up the project with custom schema
    const { projectId, sourceId, apiKey } = await setupUnbodyProject();
    
    // Step 2: Upload custom product data
    await uploadProductData(projectId, sourceId, apiKey);
    
    console.log("You can observe the processing status on the dashboard:");
    console.log(`https://app.unbody.io/projects/${projectId}/sources/${sourceId}/logs`);
    
    // Optional: Wait for processing to complete
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Step 3: Create the search system
    const { searchProducts, searchAndFilterProducts } = await createSearchSystem(projectId, apiKey);
    
    // Example 1: Basic semantic search for wireless products
    const wirelessProducts = await searchProducts("wireless audio devices");
    console.log("Search results for 'wireless audio devices':", wirelessProducts);
    
    // Example 2: Search with filters
    const affordableElectronics = await searchAndFilterProducts("portable electronics", {
      inStock: true,
      maxPrice: 200,
      categories: ["Electronics"]
    });
    console.log("Affordable in-stock electronics:", affordableElectronics);
    
  } catch (error) {
    // Handle errors appropriately
  }
}
```