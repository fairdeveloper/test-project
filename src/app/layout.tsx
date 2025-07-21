import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${jakarta.variable} font-sans bg-background text-primary-text`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <PageWrapper>
            <main>{children}</main>
          </PageWrapper>
          {/* Footer gibi diğer sabit elementler buraya eklenebilir */}
        </div>
      </body>
    </html>
  )
}