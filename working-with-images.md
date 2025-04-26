---
sidebarTitle: Working with Images
title: Working with Images
__path__: '[{"title":"Working with Images","route":"/working-with-images"}]'
---

# Working with images

Use Unbody’s Image API powered by [Imgix](https://www.imgix.com/) to efficiently fetch, transform and analyze images. Capabilities include dynamic resizing, format conversion, advanced cropping, and intelligent image analysis.

## Basic Image Query

When working with image collections, you need a quick way to retrieve essential information about your images. [Learn more about Image Fetching](/image-api/api-reference#example-1---fetching-your-image-url).

SDK (.ts)GraphQL

```
const {
  data: { payload },
} = await unbody.get
                .imageBlock
                .limit(5)
                .select("originalName", "autoOCR", "autoCaption")
                .exec();
```

```
{
  Get {
    ImageBlock(limit: 5) {
      originalName
      autoOCR
      autoCaption
    }
  }
}
```

## 

Response

## Similar Image Search

When you want to find visually similar images based on a reference image, such as exploring a collection of electric vehicles, this method allows you to retrieve images that share visual characteristics. [Learn more about Visual similarity](/content-api/search/visual-similarity)

SDK (.ts)GraphQL

```
const {
  data: { payload },
} = await unbody.get
                .imageBlock
                .similar.image(
                  "https://www.treadfirst.co.uk/wp-content/uploads/2023/05/riseBlog.jpg" // Image about an electric car
                )
                .limit(5)
                .select("originalName", "url", "autoOCR", "mimeType")
                .exec();
```

```
{
  Get {
    ImageBlock(
      nearImage: {
        image: "https://www.treadfirst.co.uk/wp-content/uploads/2023/05/riseBlog.jpg"
      }
      limit: 5
    ) {
      _additional {
        certainty
        distance
      }
      originalName
      url
      autoOCR
      mimeType
    }
  }
}
```

## 

Response

## Creating a Face Gallery

Imagine building a digital yearbook or a mood board of portraits. You want to quickly gather and showcase a collection of human faces from your image library. This example demonstrates how to extract and display faces dynamically, turning a scattered image collection into a compelling visual narrative. [Learn more about Image Transformation](/image-api/api-reference#api-reference)

```
// Fetch images with semantic search
const { data: { payload: images } } = await unbody.get
                                                  .imageBlock
                                                  .search.about("Human Face")
                                                  .select("url")
                                                  .exec();
  
// Render face gallery
<div className="grid grid-cols-3 gap-4">
	{images.map((image, index) => (
		  <div key={index}>
		    <img
		      src={`${image.url}?fit=facearea&facepad=2.0&w=300&h=300`}
		      alt="Face"
		      className="w-full h-full"
		      loading="lazy"
		    />
		  </div>
	))}
</div>
```

## Face Detection and Cropping Using `react-imgix`

Intelligent face detection allows you to automatically center and crop images to highlight the most important part of a portrait.

```
import Imgix from "react-imgix";
 
// Face detection and cropping
const FaceCroppedImage = () => (
	  <Imgix
	    src="https://images.cdn.unbody.io/your-image-path.jpg"
	    width={300}
	    height={300}
	    imgixParams={{
	      fit: "facearea",
	      facepad: 2.0
	    }}
	  />
);
```

## Responsive Image Handling

When you need to create responsive images that look great on devices from mobile phones to large desktop monitors and ensure performance, this approach ensures your images adapt seamlessly to different screen sizes and resolutions.

```
const ResponsiveImage = () => {
  const src = "https://images.cdn.unbody.io/a2f450e8-2638-4201-8dab-f2cca67df9ce/image/a4f0d82b-6a6f-5224-a9e7-d7621e4f134a.webp";
  
  return (
    <img
      src={`${src}?w=800&h=400&fit=crop&crop=focalpoint`}
      sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 50vw,
             800px"
      srcSet={`
        ${src}?w=400&h=200&fit=crop&crop=focalpoint 400w,
        ${src}?w=800&h=400&fit=crop&crop=focalpoint 800w,
        ${src}?w=1200&h=600&fit=crop&crop=focalpoint 1200w
      `}
      alt="Movie scene"
      className="w-full h-auto"
    />
  );
};
```

Learn more about advanced image features in our [Image Api Guide](/image-api/overview).

[Use vars inside a prompt](/prompting/use-vars-inside-a-prompt "Use vars inside a prompt")[Working With Videos](/working-with-videos "Working With Videos")