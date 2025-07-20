import AnimatedText from "@/components/AnimatedText";
import type { Metadata } from 'next'
import { FiTarget, FiCheckSquare, FiAward } from "react-icons/fi"; // İkonlar için
import Reveal from "@/components/Reveal"; // Kaydırma animasyonu için

export const metadata: Metadata = {
  title: 'Hakkımızda | Adil Futbol',
  description: "AdilFutbol, Türk futbolunda adalet duygusunu zedeleyen yapısal sorunlara dikkat çekmek amacıyla kurulmuş bağımsız bir analiz platformudur.",
}

// Her bir ilke için bir component oluşturalım
function Ilke({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div className="bg-surface p-6 rounded-lg border border-subtle-border">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-2xl text-accent-start">{icon}</div>
        <h3 className="text-xl font-bold text-primary-text">{title}</h3>
      </div>
      <p className="text-secondary-text">{children}</p>
    </div>
  )
}

export default function HakkimizdaPage() {
  return (
    <div className="pt-24">
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <AnimatedText 
          text="Hakkımızda" 
          className="!text-4xl !md:text-6xl !tracking-tighter !text-left mb-16"
        />
        
        {/* Üç ana ilkeyi grid yapısında gösteriyoruz */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Reveal>
            <Ilke icon={<FiAward />} title="Platformumuz">
              AdilFutbol, Türk futbolunda adalet duygusunu zedeleyen yapısal sorunlara dikkat çekmek amacıyla kurulmuş bağımsız bir analiz platformudur.
            </Ilke>
          </Reveal>
          <Reveal>
            <Ilke icon={<FiTarget />} title="Merceğimiz">
              Merceğimizde; liyakatsiz yöneticiler, tarafsızlığını yitirmiş federatif yapılar, manipülasyona açık hakem düzeni ve gerçeği çarpıtan medya söylemleri yer alır.
            </Ilke>
          </Reveal>
          <Reveal>
            <Ilke icon={<FiCheckSquare />} title="Amacımız">
              Amacımız; futbolda adaleti yeniden merkeze alan, nesnel ve sorgulayıcı bir bakış açısı sunmaktır.
            </Ilke>
          </Reveal>
        </div>

        {/* İletişim bölümü */}
        <div className="max-w-4xl mx-auto text-center border-t border-subtle-border pt-12">
            <h3 className="text-2xl font-bold text-primary-text mb-4">İletişim</h3>
            <p className="text-lg text-secondary-text">
              Tüm öneri, eleştiri veya katkılarınız için bize <a 
                href="mailto:infoadilfutbol@gmail.com" 
                className="font-semibold text-accent-start hover:text-accent-end transition-colors underline underline-offset-4"
              >infoadilfutbol@gmail.com</a> adresinden ulaşabilirsiniz.
            </p>
        </div>
      </section>
    </div>
  );
}