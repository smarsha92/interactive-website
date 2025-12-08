import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 100) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    const words = text.split(' ');
    let currentWordIndex = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText((prev) => {
          if (currentWordIndex === 0) {
            return words[currentWordIndex];
          }
          return prev + ' ' + words[currentWordIndex];
        });
        currentWordIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return displayedText;
}
