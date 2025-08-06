import { useQuery } from "@tanstack/react-query";
import { sanityClient } from '../lib/sanity'
import { type PortableTextBlock } from '@portabletext/types';

export interface Watch {
    _id: string;
    title: string;
    body: PortableTextBlock[],
    category: Category,
    images: SanityImage[],
    price: number;
    quantity: number;
}

export type SanityImage = {
  _type: 'image'
  _key?: string
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export type Category = "Audemars Piguet" | "Rolex" | "Cartier" | "Patek Philippe" | "Omega" | "Citizen";


export const useGetWatches = () => {
  return useQuery<Watch[]>({
    queryKey: ['watches'],
    queryFn: async () => {
      const query = `*[_type == "watch"]{_id, title, body, price, images, category}`
      const data = await sanityClient.fetch<Watch[]>(query)
      return data
    },
  })
}