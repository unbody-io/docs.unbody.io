---
sidebarTitle: Semantic Search
title: Semantic Search
__path__: >-
  [{"title":"search","route":"/search"},{"title":"Semantic
  Search","route":"/search/semantic-search"}]
---

# Semantic Search

Search based on meaning rather than exact keyword matches, allowing users to find relevant content even when exact terms don’t match. [Learn more about Semantic Search](/content-api/search/semantic-search).

## Basic Search

Sometimes you need to find documents about a topic, but they might use different terminology. For example, using `search.about()`, when searching for “AI applications”, you’ll find relevant documents even if they use terms like “machine learning systems” instead.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .search.about("AI applications")
                .select("title", "autoSummary", "text")
                .exec();
```

```
{
  Get {
    TextDocument(nearText: {
      concepts: ["AI applications"]
    }) {
      _additional {
        certainty
        distance
      }
      title
      autoSummary
      text
    }
  }
}
```

## 

Response

## Search with Concept Boost

When your search needs to prioritize specific aspects, you can boost certain concepts. For instance, if you’re looking for AI applications but want results focused on “Deep Learning”, “LLM”, and “chatbot”, use concept boosting to get more relevant results.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textBlock
                .search.about("AI applications", {
                  moveTo: {
                    concepts: ["Deep Learning", "LLM", "chatbot"],
                    force: 0.5
                  }
                })
                .select("text")
                .limit(5)
                .exec();
```

```
{
  Get {
    TextBlock(
      nearText: {
        concepts: ["AI applications"], 
        moveTo: {
          concepts: ["Deep Learning", "LLM", "chatbot"], 
          force: 0.5
        }
      }
      limit: 5
    ) {
      _additional {
        certainty
        distance
      }
      text
    }
  }
}
```

## 

Response

## Advanced Search with Concept Steering

When you need to focus on specific concepts while avoiding others, concept steering is the answer. For example, to find modern chatbot documentation while excluding legacy approaches, you can steer the search toward NLP and LLMs while steering away from rule-based systems.

SDK (.ts)GraphQL

```
const {
  data: { payload }
} = await unbody.get
                .textDocument
                .search.about(["Modern AI Chatbots", "Large Language Models", "Conversational AI"], {
                  moveTo: {
                    concepts: [
                      "Natural Language Processing",
                      "ChatGPT",
                      "Machine Learning",
                      "Customer Service Automation"
                    ],
                    force: 0.7
                  },
                  moveAwayFrom: {
                    concepts: [
                      "Rule-based Chatbots",
                      "Legacy Systems",
                      "Basic FAQ Bots",
                      "Traditional IVR"
                    ],
                    force: 0.8
                  },
                  certainty: 0.6
                })
                .select("title", "autoSummary", "tags", "createdAt")
                .sort("createdAt", "desc")
                .limit(5)
                .exec();
```

```
{
  Get {
    TextDocument(
      nearText: {
        concepts: ["Modern AI Chatbots", "Large Language Models", "Conversational AI"],
        moveTo: {
          concepts: ["Natural Language Processing", "ChatGPT", "Machine Learning", "Customer Service Automation"],
          force: 0.7
        },
        moveAwayFrom: {
          concepts: ["Rule-based Chatbots", "Legacy Systems", "Basic FAQ Bots", "Traditional IVR"],
          force: 0.8
        },
        certainty: 0.6
      }
      sort: {order: desc, path: "createdAt"}
      limit: 5
    ) {
      _additional {
        certainty
        distance
      }
      title
      autoSummary
      tags
      createdAt
    }
  }
}
```

## 

Response

Learn more in our [Semantic Search Guide](/content-api/search/semantic-search).

[Architecture](/architecture "Architecture")[Keyword Search](/search/keyword-search "Keyword Search")