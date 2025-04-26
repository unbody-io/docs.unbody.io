---
sidebarTitle: Authentication
title: Authentication
__path__: >-
  [{"title":"content-api","route":"/content-api"},{"title":"Authentication","route":"/content-api/authentication"}]
---

# Authentication

Unbody makes it easy to handle content through APIs while ensuring security. To use the GraphQL API, you’ll need two authentication credentials:

1.  **API Key**: A secret token that authenticates your requests
2.  **Project ID**: Identifies which project you’re accessing

## Getting Started

1.  Generate an API key in [Unbody Dashboard](https://app.unbody.io/projects):

-   Select your project
-   Navigate to **Settings** → **Developer Settings**

2.  Include both credentials in your API requests using these headers:

-   `Authorization`: Your API key
-   `X-Project-Id`: Your project ID

Below are examples of how to authenticate in different environments:

SDK (.ts)CurlJavaScript

```
import { Unbody } from 'unbody';
 
const unbody = new Unbody({
    apiKey: "<API_KEY>",
    projectId: "<PROJECT_ID>",
});
```

```
# Authorized call to Unbody using CURL
curl -X POST \\
-H "Authorization: Bearer <API_KEY>" \\
-H "X-Project-Id: <PROJECT_ID>" \\
-H "Content-Type: application/json" \\
-d '{
  "query": "{ Your GraphQL query here }"
}' \\
<https://graphql.unbody.io>
```

```
// Fetch API
fetch('<https://graphql.unbody.io>', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer <API_KEY>',
        'X-Project-Id': '<PROJECT_ID>',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: "{ Your GraphQL query here }" })
})
.then(...)
 
// Axios
const axios = require('axios');
 
axios.post('https://graphql.unbody.io',
    {
        query: "{ Your GraphQL query here }"
    },
    {
        headers: {
            'Authorization': 'Bearer <API_KEY>',
            'X-Project-Id': '<PROJECT_ID>',
            'Content-Type': 'application/json'
        }
    })
    .then(...)
 
```

### Important Notes

ℹ️

Do not forget to replace `<API_KEY>` with your personal API key generated in the Unbody Dashboard.

ℹ️

You must also replace `<PROJECT_ID>` with your specific project ID.

ℹ️

As a security measure, you must ensure to securely store your API key and never expose it in client-side code. You must use environment variables or server-side code to handle it safely.

[Overview](/content-api/overview "Overview")[Search](/content-api/search "Search")