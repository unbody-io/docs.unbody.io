---
sidebarTitle: Working with Videos
title: Working with Videos
__path__: '[{"title":"Working with Videos","route":"/working-with-videos"}]'
---

# Working with videos

Process and analyze video content using Unbody’s Video API (powered by [Mux]((https://www.mux.com))) for video processing.

## Fetch Video Assets

When you want summaries, thumbnails, and animated previews from your videos, use Unbody’s `videoFile`. Learn more about video in our [Video API Guide](/video-api).

SDK (.ts)GraphQL

```
const {
  data: { payload: videoFiles },
} = await unbody.get.videoFile
    .where(({ LessThan }) => ({
        size: LessThan(10000000), // 10 MB in bytes
    }))
    .select(
        "thumbnailUrl.png",
        "animatedImageUrl.gif",
        "autoSummary",
        "animatedImageUrl.webp",
        "size"
    )
    .exec();
```

```
{
  Get {
    VideoFile(
      where: {
        operator: LessThan, 
        path: "size", 
        valueInt: 10000000
      }
    ) {
      thumbnailUrl {
        png
      }
      animatedImageUrl {
        gif
        webp
      }
      autoSummary
      size
    }
  }
}
```

## 

Response

## Access Video Subtitles

Sometimes you want to extract subtitles from your videos along with their timing information. Here’s how to fetch and filter subtitle content.

SDK (.ts)GraphQL

```
const {
  data: { payload: subtitleFiles },
} = await unbody.get.subtitleFile
    .where(({ LessThan }) => ({
        media: {
            VideoFile: {
                mimeType: "video/mp4",
                size: LessThan(10000000), // 10 MB in Bytes
            },
        },
    }))
    .select(
        "entries.SubtitleEntry.start",
        "entries.SubtitleEntry.end",
        "entries.SubtitleEntry.text"
    )
    .exec();
 
const { entries } = subtitleFiles[0];
```

```
{
  Get {
    SubtitleFile(
      where: {
        operator: And, 
        operands: [
          {
            operator: Equal, 
            path: ["media", "VideoFile", "mimeType"], 
            valueText: "video/mp4"
          }, 
          {
            operator: LessThan, 
            path: ["media", "VideoFile", "size"], 
            valueInt: 10000000
          }
        ]
      }
    ) {
      entries {
        ... on SubtitleEntry {
          start
          end
          text
        }
      }
    }
  }
}
```

## 

Response

## Analyze Video Content

Often after extracting subtitles, you’ll want to analyze what’s happening in your videos. Use extracted video transcriptions to [generate structured analysis](/generative-api/json-gen) of story elements, key moments, and narrative context.

```
    const {
      data: { payload: subtitleFiles },
    } = await unbody.get.subtitleFile
        .where(({ LessThan }) => ({
            media: {
                VideoFile: {
                    mimeType: "video/mp4",
                    size: LessThan(10000000),
                },
            },
        }))
        .select(
            "entries.SubtitleEntry.start",
            "entries.SubtitleEntry.end",
            "entries.SubtitleEntry.text"
        )
        .exec();
 
    const { entries } = subtitleFiles[0];
 
    // Now analyze the content using generate.json
    const analysis = await unbody.generate.json(
        [
            {
                role: "user",
                content: `Analyze this story from a video transcript: ${JSON.stringify(entries)}`,
            },
            {
                role: "system",
                content: "Extract key story elements and create a structured analysis.",
            },
        ],
        {
            schema: z.object({
                storyContext: z.object({
                    location: z.string(),
                    mainCharacters: z.array(z.string()),
                    timeframe: z.string(),
                }),
                keyMoments: z.array(
                    z.object({
                        moment: z.string(),
                        significance: z.string(),
                    })
                ),
                humorElement: z.object({
                    setup: z.string(),
                    punchline: z.string(),
                }),
                overallTone: z.string(),
            }),
        }
    );
```

## 

Response

Learn more about advanced video features in our [Video Api Guide](/video-api).

## Video Playback and Streaming

Mux provides adaptive streaming capabilities through HLS (HTTP Live Streaming) and direct video URLs. Here’s how to work with different playback options.

SDK (.ts)GraphQL

```
const {
  data: { payload: videoFiles },
} = await unbody.get.videoFile
    .where(({ Equal }) => ({
        mimeType: Equal("video/mp4"),
    }))
    .select(
        "url",
        "hlsUrl",
        "playbackId",
        "duration",
        "width",
        "height",
        "size"
    )
    .exec();
```

```
{
  Get {
    VideoFile(
      where: {
        operator: Equal,
        path: "mimeType",
        valueText: "video/mp4"
      }
    ) {
      url
      hlsUrl
      playbackId
      duration
      width
      height
      size
    }
  }
}
```

## 

Response

## Video Thumbnails and Previews

Mux automatically generates thumbnails and animated previews in multiple formats. Here’s how to access these assets.

SDK (.ts)GraphQL

```
const {
  data: { payload: videoFiles },
} = await unbody.get.videoFile
    .select(
        "thumbnailUrl.png",
        "thumbnailUrl.jpeg",
        "thumbnailUrl.webp",
        "animatedImageUrl.gif",
        "animatedImageUrl.webp",
        "duration",
        "originalName"
    )
    .exec();
```

```
{
  Get {
    VideoFile {
      thumbnailUrl {
        png
        jpeg
        webp
      }
      animatedImageUrl {
        gif
        webp
      }
      duration
      originalName
    }
  }
}
```

## 

Response

## Video Asset Management

Mux provides comprehensive asset management capabilities. Here’s how to work with video assets and their metadata.

SDK (.ts)GraphQL

```
const {
  data: { payload: videoFiles },
} = await unbody.get.videoFile
    .select(
        "assetId",
        "playbackId",
        "remoteId",
        "sourceId",
        "mimeType",
        "ext",
        "pathString",
        "order",
        "size",
        "duration"
    )
    .exec();
```

```
{
  Get {
    VideoFile {
      assetId
      playbackId
      remoteId
      sourceId
      mimeType
      ext
      pathString
      order
      size
      duration
    }
  }
}
```

## 

Response

## Video Players

Mux provides official players for various frameworks and platforms. Here’s how to integrate them into your application.

ReactVue.jsVanilla JSAdvanced Features

```
import MuxPlayer from '@mux/mux-player-react';
 
// In your React component
function VideoPlayer({ playbackId }) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      metadata={{
        video_title: "Product Demo",
        viewer_user_id: "user-id-123"
      }}
      autoPlay={false}
      loop={false}
      muted={false}
      style={{ height: "100%", maxWidth: "100%" }}
    />
  );
}
```

```
<template>
  <mux-player
    stream-type="on-demand"
    :playback-id="playbackId"
    :metadata="{
      video_title: 'Product Demo',
      viewer_user_id: 'user-id-123'
    }"
    :autoplay="false"
    :loop="false"
    :muted="false"
    style="height: 100%; max-width: 100%;"
  />
</template>
 
<script>
import 'mux-player';
 
export default {
  data() {
    return {
      playbackId: '4HQ7pWtI6YPkh01R01X1bpxSGCP4Kei00wP8nvULvSMPAU'
    }
  }
}
</script>
```

```
<!DOCTYPE html>
<html>
<head>
  <title>Mux Player Example</title>
  <script src="https://unpkg.com/mux-player"></script>
</head>
<body>
  <mux-player
    stream-type="on-demand"
    playback-id="4HQ7pWtI6YPkh01R01X1bpxSGCP4Kei00wP8nvULvSMPAU"
    metadata='{"video_title": "Product Demo", "viewer_user_id": "user-id-123"}'
    autoplay="false"
    loop="false"
    muted="false"
    style="height: 100%; max-width: 100%;"
  ></mux-player>
</body>
</html>
```

```
// Advanced player configuration
const playerConfig = {
  // Playback settings
  autoplay: false,
  loop: false,
  muted: false,
  playsinline: true,
  
  // Quality settings
  preferPlayback: "mse", // or "native"
  playbackRates: [0.5, 1, 1.5, 2],
  
  // UI customization
  thumbnailTime: 10, // Show thumbnail at 10 seconds
  poster: "https://example.com/poster.jpg",
  
  // Analytics and metadata
  metadata: {
    video_title: "Product Demo",
    viewer_user_id: "user-id-123",
    custom_data: "any-json-serializable-data"
  },
  
  // Event handlers
  onPlay: () => console.log("Video started playing"),
  onPause: () => console.log("Video paused"),
  onEnded: () => console.log("Video ended"),
  onError: (error) => console.error("Playback error:", error)
};
 
// React example with advanced features
<MuxPlayer
  streamType="on-demand"
  playbackId={playbackId}
  // Custom styling
  style={{
    height: "100%",
    maxWidth: "100%",
    "--media-object-fit": "contain",
    "--media-object-position": "center"
  }}
  // Player preferences
  preferPlayback="mse"
  playbackRates={[0.5, 1, 1.5, 2]}
  // Event handlers
  onPlay={() => console.log("Video started playing")}
  onPause={() => console.log("Video paused")}
  onEnded={() => console.log("Video ended")}
  onError={(error) => console.error("Playback error:", error)}
  // Accessibility
  aria-label="Product demonstration video"
  // Analytics
  metadata={{
    video_title: "Product Demo",
    viewer_user_id: "user-id-123",
    custom_data: "any-json-serializable-data"
  }}
/>
```

Learn more about Mux Player features and customization in the [Mux Player Documentation](https://docs.mux.com/player).

[Working With Images](/working-with-images "Working With Images")[Image metadata extraction pipeline](/enhancement/image-metadata-extraction-pipeline "Image metadata extraction pipeline")