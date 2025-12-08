import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface HolidayMusicProps {
  isHolidayTheme: boolean;
}

export function HolidayMusic({ isHolidayTheme }: HolidayMusicProps) {
  const oscillatorsRef = useRef<OscillatorNode[]>([]

    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'E4', duration: 0.25 },

    { note: 'C4', duration: 0
    { note: 'E4', duration: 1 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 }
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.125 }
    { note: 'E4', duration: 0.25 }
    { note: 'D4', duration: 0.25 },
    { note: 'D4', duration: 0.5 },
  ];
  const noteFrequencies: Record<str
    'D4': 293.66,
    'F4': 349.23,
    'A4': 440.00,
  };
  useEffect(() => {
      stopMusic();
  }, [isHolidayTheme]);
  useEffect(() => {
      stopMusic();
  }, []);
  const playNote = (frequency: numb

    const noteGain = audioContextRe
    oscillator.type = 'sine';

    noteGain.gain.linearRampToValu


    oscillator.start(startTime);

  };
  const playMelod


      const frequ
        playNote(
    

    timeoutRef.curr
        playMelody();
    }, totalDurati

    if (!audioContextRe

      gainNodeRef.c

      audioContext

    playM

    setIsPlaying(false);
    if (timeoutRef.current) {


      try {

      }
    oscillatorsRef.current = [];

        audioContextRef.current = null;
      });
  };

      stopMusic();
      startMusic();

  if (!isHolidayTheme) return nu
  return (

        animate={{ opacity: 1, y: 0 }}
    

          onClick={toggleMus
          className="h-14 w-14 rounded-fu

              : 'oklch(0.20 0.04 290)',

          {isPlaying && (
              className="absolute inset-0 bg-gradie
                x: ['-
              transition={{
                repeat: Infinity,
       
       

            } : {}}
              duration: 0.5,
              repeatDe
          >
       
              <SpeakerSlash size={2
    

            className="absol
              rotate: [0, 10, -10, 
            transition={{
              repeat: Infinity,
            }}
            🎵
     

}















































































































