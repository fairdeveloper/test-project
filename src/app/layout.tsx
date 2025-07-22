import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script' // Next.js'in Script component'ini import ediyoruz
import './globals.css'
import Header from '@/components/Header'
import PageWrapper from '@/components/PageWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Adil Futbol',
  description: 'Futbolun adalet merceği.',
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      {/* GOOGLE ANALYTICS KODUNU BURAYA EKLİYORUZ */}
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>

      <body className={`${inter.variable} ${jakarta.variable} font-sans bg-background text-primary-text`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <PageWrapper>
            <main>{children}</main>
          </PageWrapper>
          <footer className="py-6 text-center text-secondary-text text-sm">
            <p>© 2025 Adil Futbol. Tüm hakları saklıdır.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}