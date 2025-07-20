import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import PageWrapper from '@/components/PageWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Yeni logo fontumuzu tanımlıyoruz
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Adil Futbol',
  description: 'Futbolun adalet merceği.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      {/* Her iki font değişkenini de body'ye ekleyerek tüm sitede kullanılabilir hale getiriyoruz */}
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <Header />
        <PageWrapper>
          <main>{children}</main>
        </PageWrapper>
        <footer className="py-6 text-center text-secondary-text text-sm">
          <p>© 2025 Adil Futbol. Tüm hakları saklıdır.</p>
        </footer>
      </body>
    </html>
  )
}