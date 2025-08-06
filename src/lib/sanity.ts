import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'sll62rbs',      // your actual project ID
  dataset: 'production',      // or your dataset
  apiVersion: '2025-08-06',   // use today's or a fixed date
  useCdn: true,               // use false if you need fresh data
  perspective: 'published',   // or 'previewDrafts' for drafts
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}