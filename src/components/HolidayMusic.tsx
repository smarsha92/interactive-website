import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';

interface HolidayMusicProps {
  isHolidayTheme: boolean;
}

export function HolidayMusic({ isHolidayTheme }: HolidayMusicProps) {
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const melody = [
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'E4', duration: 0.25 },
    { note: 'G4', duration: 0.25 },
    { note: 'C4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'E4', duration: 1 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.125 },
    { note: 'E4', duration: 0.125 },
    { note: 'E4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'D4', duration: 0.5 },
    { note: 'G4', duration: 0.5 },
  ];

  const noteFrequencies: Record<string, number> = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
  };

  useEffect(() => {
    if (!isHolidayTheme) {
      stopMusic();
    }
  }, [isHolidayTheme]);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const playNote = (frequency: number, startTime: number, duration: number) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const noteGain = audioContextRef.current.createGain();
    
    oscillator.connect(noteGain);
    noteGain.connect(gainNodeRef.current);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    noteGain.gain.setValueAtTime(0.3, startTime);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    
    oscillatorsRef.current.push(oscillator);
  };

  const playMelody = () => {
    if (!audioContextRef.current) return;

    let currentTime = audioContextRef.current.currentTime;
    let totalDuration = 0;

    melody.forEach(({ note, duration }) => {
      const frequency = noteFrequencies[note];
      if (frequency) {
        playNote(frequency, currentTime, duration);
        currentTime += duration;
        totalDuration += duration;
      }
    });

    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        playMelody();
      }
    }, totalDuration * 1000);
  };

  const startMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.3;
    }

    setIsPlaying(true);
    playMelody();
  };

  const stopMusic = () => {
    setIsPlaying(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    oscillatorsRef.current.forEach(oscillator => {
      try {
        oscillator.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
    });
    oscillatorsRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null;
      });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  if (!isHolidayTheme) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleMusic}
          className="h-14 w-14 rounded-full shadow-lg relative overflow-hidden"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, oklch(0.75 0.18 330), oklch(0.65 0.15 10))'
              : 'oklch(0.20 0.04 290)',
          }}
        >
          {isPlaying && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          )}
          <motion.div
            animate={isPlaying ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.1,
            }}
          >
            {isPlaying ? (
              <SpeakerHigh size={24} weight="fill" />
            ) : (
              <SpeakerSlash size={24} weight="fill" />
            )}
          </motion.div>
          {isPlaying && (
            <motion.span
              className="absolute -top-1 -right-1 text-xl"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
              }}
            >
              🎵
            </motion.span>
          )}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
