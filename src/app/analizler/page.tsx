import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'
import { MotionDiv } from '@/components/ClientMotion' // motion yerine MotionDiv import ediyoruz
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Tüm Analizler ve Haftalık Değerlendirmeler | Adil Futbol',
  description: "Futbol gündemindeki kritik kararlar, VAR incelemeleri ve maç analizleri. Adil Futbol'un tüm değerlendirme arşivi.",
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}

const query = groq`*[_type == "post"] | order(publishedAt desc)`

export default async function AnalizlerPage() {
  const posts: Post[] = await client.fetch(query)

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="pt-24">
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary-text mb-12">
          Tüm Analizler
        </h1>

        {posts && posts.length > 0 ? (
          // motion.div yerine artık MotionDiv kullanıyoruz
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <MotionDiv key={post._id} variants={itemVariant}>
                <PostCard post={post} />
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <p className="text-xl text-secondary-text">Henüz yayınlanmış bir yazı bulunmuyor.</p>
        )}
      </section>
    </div>
  )
}