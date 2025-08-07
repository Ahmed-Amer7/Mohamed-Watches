import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// https://zkrj5mfb.api.sanity.io/v2025-08-07/data/query/production?query=*%5B_type+%3D%3D+%22watch%22%5D%7B_id%2C+title%2C+body%2C+price%2C+images%2C+category%2C+quantity%7D&perspective=drafts


export const sanityClient = createClient({
  projectId: 'zkrj5mfb',      // your actual project ID
  dataset: 'production',      // or your dataset
  apiVersion: '2025-08-06',   // use today's or a fixed date
  useCdn: true,               // use false if you need fresh data
  perspective: 'published',   // or 'previewDrafts' for drafts
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}