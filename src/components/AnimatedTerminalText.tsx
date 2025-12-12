import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimatedTerminalTextProps {
  text: string
  type: 'output' | 'input' | 'error'
  delay?: number
  speed?: number
}

export function AnimatedTerminalText({ text, type, delay = 0, speed = 20 }: AnimatedTerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (text.length === 0) {
      setDisplayedText('')
      setIsComplete(true)
      return
    }

    setDisplayedText('')
    setIsComplete(false)

    let currentIndex = 0
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay, speed])

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={`mb-1.5 leading-relaxed transition-all duration-300 hover:translate-x-1 hover:brightness-110 break-words ${
        type === 'input'
          ? 'text-accent font-bold hover:drop-shadow-[0_0_4px_rgba(100,200,255,0.4)]'
          : type === 'error'
          ? 'text-destructive hover:drop-shadow-[0_0_4px_rgba(255,100,100,0.4)]'
          : 'text-primary hover:drop-shadow-[0_0_4px_rgba(100,200,255,0.25)]'
      }`}
    >
      {displayedText}
      {!isComplete && text.length > 0 && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-2 h-4 ml-0.5 bg-accent/70 shadow-[0_0_8px_rgba(100,200,255,0.6)]"
        />
      )}
    </motion.div>
  )
}
