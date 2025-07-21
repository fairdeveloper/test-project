import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import FeaturedPostCard from '@/components/FeaturedPostCard'
import PostCard from '@/components/PostCard'
import { MotionDiv } from '@/components/ClientMotion'
import { FiArrowDown } from 'react-icons/fi'
import HomePageDashboard from '@/components/HomePageDashboard'

// Bu satır, sayfanın Vercel'de dinamik olarak render edilmesini sağlar
export const revalidate = 0; 

// Gerekli tipler
interface Post { _id: string; title: string; slug: { current: string }; publishedAt: string; }
interface SiteAyarlari { anaSayfaManseti?: string; anaSayfaAltBasligi?: string; }

// Ana sayfa artık 'async' ve veriyi sunucuda çekiyor
export default async function HomePage() {
  const query = groq`{
    "siteAyarlari": *[_type == "siteAyarlari"][0],
    "featuredPost": *[_type == "post"] | order(publishedAt desc)[0],
    "recentPosts": *[_type == "post"] | order(publishedAt desc)[1..3]
  }`;

  const { siteAyarlari, featuredPost, recentPosts }: {
    siteAyarlari: SiteAyarlari | null,
    featuredPost: Post | null,
    recentPosts: Post[] | null
  } = await client.fetch(query);

  const manset = siteAyarlari?.anaSayfaManseti || featuredPost?.title || "Skor Tabelasının Ötesinde.";
  const altBaslik = siteAyarlari?.anaSayfaAltBasligi || "Haftanın panoraması ve en güncel analizler için aşağı kaydırın.";

  return (
    <main>
      {/* Bölüm 1: Tam Ekran Manşet */}
      <section className="min-h-screen flex flex-col items-center justify-center relative p-4 text-center">
        <div>
          <AnimatedText 
            text={manset}
            className="!text-5xl md:text-7xl lg:!text-8xl !tracking-tighter"
          />
          <p className="mt-6 text-lg text-secondary-text max-w-2xl mx-auto">
            {altBaslik}
          </p>
        </div>
        <div className="absolute bottom-10">
          <MotionDiv animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}>
            <FiArrowDown className="text-2xl text-secondary-text" />
          </MotionDiv>
        </div>
      </section>

      {/* Bölüm 2: İnteraktif Dashboard (Client Component) */}
      <HomePageDashboard />

      {/* Bölüm 3: Analizler (Server Component'ten gelen veriyle) */}
      <section className="container mx-auto px-4 md:px-6 mt-16 border-t border-subtle-border pt-16 pb-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-text">Analizler</h2>
        </div>
        <div className="space-y-12">
            {featuredPost && <FeaturedPostCard post={featuredPost} />}
            {recentPosts && recentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (<PostCard key={post._id} post={post} />))}
            </div>
            )}
            <div className="text-center pt-8">
                <Link href="/analizler" className="font-semibold text-accent-start hover:underline">Tüm Analizleri Gör →</Link>
            </div>
        </div>
    </section>
    </main>
  )
}