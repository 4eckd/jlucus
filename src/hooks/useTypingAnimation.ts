import { useState, useEffect } from 'react'

interface UseTypingAnimationOptions {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

interface UseTypingAnimationReturn {
  displayText: string
  currentWordIndex: number
  isTyping: boolean
}

/**
 * Custom hook for typing animation effect
 * Replaces the legacy Typed.js library with a native React implementation
 *
 * @param options - Configuration for the typing animation
 * @returns Object containing display text, current word index, and typing state
 */
export function useTypingAnimation({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}: UseTypingAnimationOptions): UseTypingAnimationReturn {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[currentWordIndex]

    // Pause after finishing typing
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsTyping(false)
      }, pauseDuration)

      return () => clearTimeout(pauseTimer)
    }

    // Typing animation
    if (isTyping) {
      if (currentText === currentWord) {
        setIsPaused(true)
        return
      }

      const typingTimer = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(typingTimer)
    }

    // Deleting animation
    if (!isTyping && !isPaused) {
      if (currentText === '') {
        // Move to next word
        setIsTyping(true)

        if (loop || currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
        return
      }

      const deletingTimer = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, deletingSpeed)

      return () => clearTimeout(deletingTimer)
    }
  }, [
    currentText,
    currentWordIndex,
    isTyping,
    isPaused,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ])

  return {
    displayText: currentText,
    currentWordIndex,
    isTyping,
  }
}
