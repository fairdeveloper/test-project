'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import { FiCalendar } from 'react-icons/fi'
import AnimatedNumber from '@/components/AnimatedNumber'

// Tipleri doğrudan bu dosyada tanımlıyoruz
interface PuanDurumuSatiri {
  _key: string; pozisyon: number; takim: string; puan: number;
  oynananMac?: number; galibiyet?: number; beraberlik?: number;
  maglubiyet?: number; averaj?: number;
}
interface PuanDurumu {
  sezon: string; hafta: number; tabloSatirlari: PuanDurumuSatiri[];
}
interface Mac { _key: string; tarih: string; evSahibi: { isim: string }; deplasman: { isim: string }; skor: string; }
interface FiksturHaftasi { hafta: number; maclar: Mac[]; }

// PuanTablosu component'ini artık bu dosyanın içine alıyoruz
function PuanTablosu({ tablo }: { tablo?: PuanDurumu }) {
  if (!tablo || !tablo.tabloSatirlari) {
    return (
        <div className="bg-surface rounded-lg border border-subtle-border p-8 text-center text-secondary-text min-h-[400px] flex items-center justify-center">
          Bu hafta için veri girilmemiş.
        </div>
    );
  }
  return (
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
              <td className="p-3 text-sm font-semibold text-primary-text">{sira.takim}</td>
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
  );
}


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
          <div>
            <h3 className="text-2xl font-bold text-primary-text mb-4">Puan Durumu</h3>
            <PuanTablosu tablo={puanDurumu || undefined} />
          </div>
        </div>
    </section>
  )
}