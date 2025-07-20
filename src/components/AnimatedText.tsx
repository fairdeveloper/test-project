'use client'

import { Variants } from 'framer-motion'
// motion'ı doğrudan framer-motion'dan değil, kendi köprümüzden alıyoruz
import { MotionH1, MotionSpan } from './ClientMotion'

interface AnimatedTextProps {
  text: string
  className?: string
}

const quote: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
}

const singleWord: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden">
      <MotionH1 // motion.h1 yerine MotionH1 kullanıyoruz
        className={`inline-block w-full text-primary-text font-bold ${className}`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {text.split(' ').map((word, index) => (
          <MotionSpan // motion.span yerine MotionSpan kullanıyoruz
            key={word + '-' + index}
            className="inline-block"
            variants={singleWord}
          >
            {word}&nbsp;
          </MotionSpan>
        ))}
      </MotionH1>
    </div>
  )
}