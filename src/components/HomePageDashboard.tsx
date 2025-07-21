'use client' 

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import PuanTablosu, { PuanDurumu } from '@/components/PuanTablosu'
import { FiCalendar } from 'react-icons/fi'

interface Mac { _key: string; tarih: string; evSahibi: { isim: string }; deplasman: { isim: string }; skor: string; }
interface FiksturHaftasi { hafta: number; maclar: Mac[]; }

export default function HomePageDashboard() {
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

  return (
    <section className="container mx-auto px-4 md:px-6 py-16">
       <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text">Haftanın Panoraması</h2>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-2">
             <div className='flex justify-between items-center mb-4'>
                <h3 className="text-2xl font-bold text-primary-text">Fikstür</h3>
                {seciliHafta && <div className="text-sm text-secondary-text">Hafta: {seciliHafta}</div>}
             </div>
             <div className="mb-4 p-3 bg-surface rounded-lg border border-subtle-border space-y-3">
                <div className="flex flex-wrap justify-center gap-1.5">
                    {haftalar.slice(0, devreArasi).map(hafta => (
                        <button key={hafta} onClick={() => setSeciliHafta(hafta)}
                            className={`w-8 h-8 text-xs rounded-md transition-colors ${ seciliHafta === hafta ? 'bg-accent-start text-white font-bold' : 'bg-slate-700 hover:bg-slate-600 text-secondary-text' }`}
                        >{hafta}</button>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                    {haftalar.slice(devreArasi).map(hafta => (
                        <button key={hafta} onClick={() => setSeciliHafta(hafta)}
                            className={`w-8 h-8 text-xs rounded-md transition-colors ${ seciliHafta === hafta ? 'bg-accent-start text-white font-bold' : 'bg-slate-700 hover:bg-slate-600 text-secondary-text' }`}
                        >{hafta}</button>
                    ))}
                </div>
             </div>
             <div className="bg-surface rounded-lg border border-subtle-border min-h-[400px] flex items-center justify-center">
                {loading ? <div className="p-8 text-center">Yükleniyor...</div> : 
                 gosterilecekMaclar.length > 0 ? (
                    <div className="w-full">
                      {gosterilecekMaclar.map(mac => (
                          <div key={mac._key} className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-subtle-border last:border-none">
                              <div className='text-xs text-secondary-text flex items-center mb-2 md:mb-0 md:mr-4 shrink-0'>
                                <FiCalendar className="mr-2"/>
                                {mac.tarih ? new Date(mac.tarih).toLocaleString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : 'Tarih Belirsiz'}
                              </div>
                              <div className="flex items-center justify-center flex-grow w-full">
                                <span className="text-primary-text font-semibold text-base md:text-lg text-right w-2/5 truncate">{mac.evSahibi?.isim}</span>
                                <span className="text-primary-text font-bold mx-2 bg-background px-4 py-2 rounded-md text-xl">{mac.skor || '-'}</span>
                                <span className="text-primary-text font-semibold text-base md:text-lg text-left w-2/5 truncate">{mac.deplasman?.isim}</span>
                              </div>
                          </div>
                      ))}
                    </div>
                 ) : <div className="p-8 text-center">Bu hafta için maç verisi bulunamadı.</div>
                }
             </div>
          </div>
          <div className="space-y-8 mt-8 lg:mt-10">
            <PuanTablosu tablo={puanDurumu || undefined} />
          </div>
        </div>
    </section>
  )
}