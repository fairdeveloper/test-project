import { createClient } from 'next-sanity'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

// Canlı sitede Sanity'nin hızlı CDN'ini kullanmasını,
// yerel geliştirme sırasında ise en güncel veriyi çekmesini sağlıyoruz.
export const useCdn = process.env.NODE_ENV === 'production'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})