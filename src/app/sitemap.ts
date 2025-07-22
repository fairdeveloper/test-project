import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adilfutbol.com'

  // Statik sayfalarımızı manuel olarak ekliyoruz
  const staticRoutes = [
    '', // Ana Sayfa
    '/analizler',
    '/hakkimizda',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    priority: route === '' ? 1 : 0.8,
  }))

  // Dinamik analiz sayfalarını Sanity'den çekiyoruz
  const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }`
  const posts: { slug: string, _updatedAt: string }[] = await client.fetch(postsQuery);

  const dynamicRoutes = posts.map(post => ({
    url: `${baseUrl}/analizler/${post.slug}`,
    lastModified: post._updatedAt,
    priority: 0.6
  }))

  return [...staticRoutes, ...dynamicRoutes]
}