'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

type AnimatedNumberProps = {
  toValue: number
}

export default function AnimatedNumber({ toValue }: AnimatedNumberProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const controls = animate(0, toValue, {
      duration: 1,
      onUpdate(value) {
        // Ondalıklı sayıları yuvarlayarak tam sayı gösteriyoruz
        node.textContent = Math.round(value).toString()
      },
    })

    // Component ekrandan kalktığında animasyonu temizle
    return () => controls.stop()
  }, [toValue]) // Sadece 'toValue' değiştiğinde animasyonu tekrar çalıştır

  return <span ref={nodeRef}>0</span>
}