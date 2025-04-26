---
sidebarTitle: API Reference
title: API Reference
__path__: >-
  [{"title":"image-api","route":"/image-api"},{"title":"API
  Reference","route":"/image-api/api-reference"}]
---

# API reference

Unbody’s Image API, powered by [Imgix](https://www.imgix.com/), offers developers a seamless way to host, transform, and optimize images for their applications. The API uses IMGIX’s robust image processing features, allowing you to deliver high-quality images with minimal loading times.

This documentation will guide you through using the Unbody Image API, helping you to leverage IMGIX’s functionality to enhance your image content.

## Usage

### Example 1 - Fetching Your Image URL

Every image synced with Unbody is accessible through our GraphQL endpoint. Given below is a basic query to fetch an image URL.

SDK (.ts)GraphQL

```
await unbody.get
            .imageBlock
            .where({ path: '/your/image/path'},  )
            .select('url', 'alt', 'width', 'height')
            .exec()
```

```
query {
  Get {
    ImageBlock(where: { path: "/your/image/path" }) {
      url
      alt
      width
      height
    }
  }
}
```

With the `url` obtained, you can perform a variety of operations using IMGIX parameters directly in the URL.

### Example 2 - Basic Image Transformation

To apply IMGIX transformations, you can append parameters to the image URL. Given below is a simple transformation that resizes the image to a width of 300 pixels.

```
image.cdn.unbody.io/[path_to_image]?w=300
```

## API Reference

The Unbody Image API with IMGIX includes a suite of operations that you can directly apply via URL parameters. Given below is a condensed reference of the most commonly used functionalities.

### Resizing and Cropping

-   **Resize (w, h)**: It sets the width and height of your image.
    -   For example: `?w=300&h=200`
-   **Crop (crop)**: You can crop your image to a specific aspect ratio or dimension.
    -   For example: `?crop=top,left&h=100`

### Image Adjustments

-   **Brightness (bri)**: You can also adjust the brightness of the image.
    -   For example: `?bri=10`
-   **Contrast (con)**: It you wish to adjust the contrast of the image, you can use the `con` parameter.
    -   For example: `?con=20`

### Format and Compression

-   **Format (fm)**: You can specify the output format of your image (e.g. jpg, png, webp).
    -   For example: `?fm=webp`
-   **Quality (q)**: You can even control the output quality of your image for size optimization with the help of this parameter.
    -   For example: `?q=75`

### Advanced Features

-   **Auto Enhance (auto)**: This parameter applies automatic enhancements to your image.
    -   For example: `?auto=format,compress`
-   **Text Overlay (txt)**: This parameter will overlay text onto your image.
    -   For example: `?txt=Hello%20World`

These are just a glimpse of what you can achieve with Unbody’s Image API. For a full list of parameters and detailed usage, you can refer to the IMGIX documentation linked at the end of this page.

## Best Practices

When using the Unbody Image API with IMGIX, you may consider following the best practices given below.

-   **Lazy Loading**: You may implement lazy loading to defer loading off-screen images. This helps in optimizing the user experience.
-   **Responsive Images**: You can use the `srcset` attribute in `<img>` tags for responsive image delivery.

Take a look at the Best Practices page given below for more details on best practices.

[Best practices](/image-api/best-practices)

[Overview](/image-api/overview "Overview")[Best Practices](/image-api/best-practices "Best Practices")