'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  width?: 'fit-content' | '100%'
}

export default function Reveal({ children, width = 'fit-content' }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true }) // Animasyonun sadece bir kez çalışmasını sağlar
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView, mainControls])

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  )
}