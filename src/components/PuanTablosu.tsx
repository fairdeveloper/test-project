import AnimatedNumber from './AnimatedNumber';
import { FiInfo } from 'react-icons/fi';

export interface PuanDurumuSatiri {
  _key: string; pozisyon: number; takim: string; puan: number;
  oynananMac?: number; galibiyet?: number; beraberlik?: number;
  maglubiyet?: number; averaj?: number;
  kritikNotlar?: { _key: string; hafta: number; aciklama: string }[];
}
export interface PuanDurumu {
  sezon: string; hafta: number; tabloSatirlari: PuanDurumuSatiri[];
}

// Component artık dışarıdan sadece 'tablo' verisini alıyor
export default function PuanTablosu({ tablo }: { tablo?: PuanDurumu }) {
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
              <td className="p-3 text-sm font-semibold text-primary-text flex items-center">
                {sira.takim}
                {sira.kritikNotlar && sira.kritikNotlar.length > 0 && (
                  <span title={sira.kritikNotlar.map(n => `Hafta ${n.hafta}: ${n.aciklama}`).join(' | ')}>
                    <FiInfo className="ml-2 text-accent-start/80" />
                  </span>
                )}
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
  );
}