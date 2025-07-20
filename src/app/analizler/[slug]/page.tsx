import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import type { Metadata } from 'next'
import AnimatedText from '@/components/AnimatedText'

// Metadata fonksiyonu aynı kalıyor, dokunmuyoruz.
type MetaProps = { params: { slug: string } }
export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
    const { slug } = params
    const post = await client.fetch(groq`*[_type == "post" && slug.current == $slug][0]{title, excerpt}`, { slug })
    return {
        title: `${post?.title || 'Analiz'} | Adil Futbol`,
        description: post?.excerpt,
    }
}

interface Post {
  title: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  publishedAt,
  body
}`

// --- ANA DEĞİŞİKLİK BURADA ---
// Karmaşık 'Props' tipi yerine 'any' kullanarak TypeScript'in bu noktadaki katı denetimini aşıyoruz.
export default async function AnalizDetayPage({ params }: any) {
  const { slug } = params
  const post: Post = await client.fetch(query, { slug })

  if (!post) {
    return <div className="pt-24 text-center">Analiz bulunamadı.</div>
  }

  return (
    <div className="pt-24">
      <article className="container mx-auto px-4 md:px-6 pb-24">
        <header className="mb-12 text-center">
          <p className="text-lg text-secondary-text mb-4">
            {new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <AnimatedText text={post.title} className="!text-4xl !md:text-6xl !tracking-tighter" />
        </header>

        <div className="prose-custom mx-auto">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  )
}