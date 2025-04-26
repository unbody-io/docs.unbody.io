---
sidebarTitle: Use the Image inside a Prompt
title: Use the Image inside a Prompt
__path__: >-
  [{"title":"prompting","route":"/prompting"},{"title":"Use the Image inside a
  Prompt","route":"/prompting/use-the-image-inside-a-prompt"}]
---

# Use the image inside a prompt

Generate content by providing images as input through messages. The system can analyze and describe images using advanced AI models.

## Basic Image Generation

When you need to analyze or generate from images, use message arrays with image inputs.

```
    const {
      data: { payload },
    } = await unbody.generate
          .text(
              [
                {
                  role: "system",
                  content: "Describe these images",
                },
                {
                  type: "image",
                  content: {
                    url: "https://www.treadfirst.co.uk/wp-content/uploads/2023/05/riseBlog.jpg",
                    // Images about a Car
                  },
                },
              ],
              {
                model: "gpt-4-turbo",
                maxTokens: 500,
                temperature: 0.7,
              }
          );
```

## 

Response

Learn more in our [Generative Search Using Image as Input Guide](/content-api/generative#using-images-as-input).

[Role-based prompting](/prompting/role-based-prompting "Role-based prompting")[Use vars inside a prompt](/prompting/use-vars-inside-a-prompt "Use vars inside a prompt")