'use client' 

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import FeaturedPostCard from '@/components/FeaturedPostCard'
import PostCard from '@/components/PostCard'
import { MotionDiv } from '@/components/ClientMotion'
import { FiArrowDown, FiCalendar, FiInfo } from 'react-icons/fi'
import AnimatedNumber from '@/components/AnimatedNumber'

// Tipler
interface PuanDurumuSatiri {
  _key: string; pozisyon: number; takim: string; puan: number;
  oynananMac?: number; galibiyet?: number; beraberlik?: number;
  maglubiyet?: number; averaj?: number;
  kritikNotlar?: { _key: string; hafta: number; aciklama: string }[];
}
interface PuanDurumu {
  sezon: string; hafta: number; tabloSatirlari: PuanDurumuSatiri[];
}
interface Post { _id: string; title: string; slug: { current: string }; publishedAt: string; }
interface Mac { _key: string; tarih: string; evSahibi: { isim: string }; deplasman: { isim: string }; skor: string; }
interface FiksturHaftasi { hafta: number; maclar: Mac[]; }
interface SiteAyarlari { anaSayfaManseti?: string; anaSayfaAltBasligi?: string; }
interface HomePageData { 
  siteAyarlari: SiteAyarlari | null;
  featuredPost: Post | null; 
  recentPosts: Post[] | null; 
}

// PuanTablosu component'ini artık bu dosyanın içinde tanımlıyoruz
function PuanTablosu({ baslik, tablo }: { baslik: string, tablo?: PuanDurumu }) {
  if (!tablo || !tablo.tabloSatirlari) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-3 text-primary-text">{baslik}</h2>
        <div className="bg-surface rounded-lg border border-subtle-border p-8 text-center text-secondary-text min-h-[400px] flex items-center justify-center">
          Bu hafta için veri girilmemiş.
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-primary-text">{baslik}</h2>
      <div className="overflow-x-auto bg-surface rounded-xl border border-subtle-border">
        <table className="min-w-full text-left">
          <thead className='border-b border-subtle-border'>
            <tr>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">#</th>
              <th className="p-3 text-xs font-semibold text-secondary-text">Takım</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">O</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">G</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">B</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">M</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">Avj</th>
              <th className="p-3 text-xs font-semibold text-secondary-text text-center">Puan</th>
            </tr>
          </thead>
          <tbody>
            {tablo.tabloSatirlari?.sort((a, b) => a.pozisyon - b.pozisyon).map((sira) => (
              <tr key={sira._key} className="border-t border-subtle-border/50 hover:bg-slate-800/50 transition-colors">
                <td className="p-3 text-sm text-secondary-text text-center">{sira.pozisyon}</td>
                <td className="p-3 text-sm font-semibold text-primary-text flex items-center">
                  {sira.takim}
                </td>
                <td className="p-3 text-sm text-secondary-text text-center"><AnimatedNumber toValue={sira.oynananMac || 0} /></td>
                <td className="p-3 text-sm text-secondary-text text-center"><AnimatedNumber toValue={sira.galibiyet || 0} /></td>
                <td className="p-3 text-sm text-secondary-text text-center"><AnimatedNumber toValue={sira.beraberlik || 0} /></td>
                <td className="p-3 text-sm text-secondary-text text-center"><AnimatedNumber toValue={sira.maglubiyet || 0} /></td>
                <td className="p-3 text-sm text-secondary-text text-center"><AnimatedNumber toValue={sira.averaj || 0} /></td>
                <td className="p-3 text-sm font-bold text-primary-text text-center"><AnimatedNumber toValue={sira.puan} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dashboard Component'i
function HomePageDashboard() {
  const [puanDurumu, setPuanDurumu] = useState<PuanDurumu | null>(null);
  const [fikstur, setFikstur] = useState<FiksturHaftasi[]>([]);
  const [seciliHafta, setSeciliHafta] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = groq`{
      "puanDurumu": *[_type == "resmiPuanDurumu"] | order(sezon desc, hafta desc)[0],
      "fikstur": *[_type == "fiksturHaftasi"]{
        hafta, maclar[]{ _key, tarih, skor, "evSahibi": evSahibi->{isim}, "deplasman": deplasman->{isim} }
      } | order(hafta asc)
    }`;
    const fetchData = async () => {
      setLoading(true);
      const data = await client.fetch(query);
      setPuanDurumu(data.puanDurumu);
      setFikstur(data.fikstur);
      setSeciliHafta(data.puanDurumu?.hafta || 1);
      setLoading(false);
    };
    fetchData();
  }, []);

  const gosterilecekMaclar = fikstur.find(f => f.hafta === seciliHafta)?.maclar || [];
  const toplamHafta = 34;
  const devreArasi = 17;
  const haftalar = Array.from({ length: toplamHafta }, (_, i) => i + 1);
  
  if (loading) {
    return <div className="text-center p-16">Yükleniyor...</div>;
  }

  return (
    <section className="container mx-auto px-4 md:px-6 py-16">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-2">
             <div className='flex justify-between items-center mb-4'>
                <h3 className="text-2xl font-bold text-primary-text">Fikstür</h3>
                {seciliHafta && <div className="text-sm text-secondary-text">Hafta: {seciliHafta}</div>}
             </div>
             <div className="mb-4 p-3 bg-surface rounded-lg border border-subtle-border space-y-3">
                <div className="flex flex-wrap justify-center gap-1.5">{haftalar.slice(0, devreArasi).map(hafta => (<button key={hafta} onClick={() => setSeciliHafta(hafta)} className={`w-8 h-8 text-xs rounded-md transition-colors ${ seciliHafta === hafta ? 'bg-accent-start text-white font-bold' : 'bg-slate-700 hover:bg-slate-600 text-secondary-text' }`}>{hafta}</button>))}</div>
                <div className="flex flex-wrap justify-center gap-1.5">{haftalar.slice(devreArasi).map(hafta => (<button key={hafta} onClick={() => setSeciliHafta(hafta)} className={`w-8 h-8 text-xs rounded-md transition-colors ${ seciliHafta === hafta ? 'bg-accent-start text-white font-bold' : 'bg-slate-700 hover:bg-slate-600 text-secondary-text' }`}>{hafta}</button>))}</div>
             </div>
             <div className="bg-surface rounded-lg border border-subtle-border min-h-[400px] flex items-center justify-center">
                { gosterilecekMaclar.length > 0 ? (<div className="w-full">{gosterilecekMaclar.map(mac => (<div key={mac._key} className="flex items-center justify-between p-3 border-b border-subtle-border last:border-none"><span className="text-primary-text font-semibold text-base w-2/5 text-right">{mac.evSahibi?.isim}</span><span className="text-secondary-text font-bold mx-2 bg-background px-3 py-1 rounded-md text-lg">{mac.skor || '-'}</span><span className="text-primary-text font-semibold text-base w-2/5 text-left">{mac.deplasman?.isim}</span></div>))}</div>) : <div className="p-8 text-center">Bu hafta için maç verisi bulunamadı.</div> }
             </div>
          </div>
          <div className="space-y-8">
            <PuanTablosu baslik="Puan Durumu" tablo={puanDurumu || undefined} />
          </div>
        </div>
    </section>
  )
}

// Analizler Bölümü
function AnalizlerBolumu({ postsData }: { postsData: HomePageData | null }) {
    if (!postsData?.featuredPost) return null;
    return (
        <section className="container mx-auto px-4 md:px-6 mt-16 border-t border-subtle-border pt-16 pb-24">
            <div className="text-center mb-12"> <h2 className="text-3xl md:text-4xl font-bold text-primary-text">Analizler</h2> </div>
            <div className="space-y-12">
                <FeaturedPostCard post={postsData.featuredPost} />
                {postsData.recentPosts && postsData.recentPosts.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{postsData.recentPosts.map((post) => (<PostCard key={post._id} post={post} />))}</div>)}
                <div className="text-center pt-8"> <Link href="/analizler" className="font-semibold text-accent-start hover:underline">Tüm Analizleri Gör →</Link> </div>
            </div>
        </section>
    )
}

// Ana Sayfa
export default function HomePage() {
  const [data, setData] = useState<HomePageData | null>(null);

  useEffect(() => {
    const homePageQuery = groq`{
        "siteAyarlari": *[_type == "siteAyarlari"][0],
        "featuredPost": *[_type == "post"] | order(publishedAt desc)[0],
        "recentPosts": *[_type == "post"] | order(publishedAt desc)[1..3]
    }`;
    const fetchHomePageData = async () => {
        const response: HomePageData = await client.fetch(homePageQuery, {}, { cache: 'no-store' });
        setData(response);
    }
    fetchHomePageData();
  }, [])
      
  const manset = data?.siteAyarlari?.anaSayfaManseti || data?.featuredPost?.title || "Skor Tabelasının Ötesinde.";
  const altBaslik = data?.siteAyarlari?.anaSayfaAltBasligi || "Haftanın panoraması ve en güncel analizler için aşağı kaydırın.";

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center relative p-4 text-center">
        <div>
          <AnimatedText text={manset} className="!text-5xl md:text-7xl lg:!text-8xl !tracking-tighter" />
          <p className="mt-6 text-lg text-secondary-text max-w-2xl mx-auto"> {altBaslik} </p>
        </div>
        <div className="absolute bottom-10">
          <MotionDiv animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}>
            <FiArrowDown className="text-2xl text-secondary-text" />
          </MotionDiv>
        </div>
      </section>
      <HomePageDashboard />
      <AnalizlerBolumu postsData={data} />
    </main>
  )
}