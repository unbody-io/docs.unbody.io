import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/app.config";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import React, { FC } from "react";

const HeadComponent: FC = () => {
  const router = useRouter();
  const { frontMatter } = useConfig();
  const ogImageTitle = frontMatter.title || SITE_TITLE;
  const ogTitle = `${frontMatter.title || SITE_TITLE} - ${SITE_NAME}`;
  const ogDescription = frontMatter.outline || SITE_DESCRIPTION;

  const myPath: string = router.pathname;
  let mptext;

  if (myPath == "/") {
    mptext = "";
  } else {
    const desctext = myPath.split("/");
    mptext = desctext[1];
  }

  const imageUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?` +
    `title=${encodeURIComponent(ogImageTitle)}` +
    `&mp=${encodeURIComponent(`/${mptext}`)}` +
    `&cover=${encodeURIComponent(frontMatter.image || frontMatter.cover)}`;

  return (
    <>
      <meta charSet="UTF-8" key="charset" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      @ts-ignore
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-light.png"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-dark.png"
        media="(prefers-color-scheme: dark)"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000" />
      <meta name="apple-mobile-web-app-title" content="Unbody" />
      <meta name="description" content={ogDescription} />
      <meta name={"keywords"} content={SITE_KEYWORDS.join(",")} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@unbody_io" />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property={"og:keywords"} content={SITE_KEYWORDS.join(",")} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={`${SITE_URL}${router.pathname}`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
    </>
  );
};

export default HeadComponent;
