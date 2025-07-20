'use client' 

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // SİZİN BELİRTTİĞİNİZ DOĞRU LİNK LİSTESİ
  const navLinks = [
    { href: '/analizler', label: 'Analizler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-logo text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent-start to-accent-end">
            Adil Futbol
          </Link>
          
          {/* MASAÜSTÜ NAVİGASYONU (Aktif link stili eklendi) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`transition-colors ${isActive ? 'text-primary-text' : 'text-secondary-text hover:text-primary-text'}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* MOBİL MENÜ BUTONU */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary-text text-2xl">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBİL MENÜ EKRANI */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{duration: 0.2}}
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background p-8 md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                 <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-3xl font-bold text-primary-text transition-colors hover:text-accent-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}