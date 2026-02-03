// /lib/contentful.ts
import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID!;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

// PROD (Published content)
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;

// DEV (Draft/Preview content) - optional
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;

const usePreview = process.env.CONTENTFUL_USE_PREVIEW === "true" && !!previewToken;

export const contentful = createClient({
  space,
  environment,
  accessToken: usePreview ? previewToken! : deliveryToken,
  host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
});

export async function getHomePage() {
  const slug = process.env.CONTENTFUL_HOME_SLUG || "home";

  const res = await contentful.getEntries({
    content_type: "homePage-2", // MUST match Contentful "API Identifier"
    "fields.slug": slug,
    include: 10,
    limit: 1,
  });

  return (res.items?.[0] as any) || null;
}
