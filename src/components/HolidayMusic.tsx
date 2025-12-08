import { useEffect, useRef, useState } from 'react';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface HolidayMusicProps {
  isHolidayTheme: boolean;
}

export function HolidayMusic({ isHolidayTheme }: HolidayMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const jingleBellsMelody = [
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
    'B4': 493.88,
  };

  useEffect(() => {
    if (!isHolidayTheme && isPlaying) {
      stopMusic();
    }
  }, [isHolidayTheme]);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const playNote = (frequency: number, duration: number, startTime: number) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const noteGain = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);

    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
    noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    oscillatorsRef.current.push(oscillator);
  };

  const playMelody = () => {
    if (!audioContextRef.current) return;

    let currentTime = audioContextRef.current.currentTime;

    jingleBellsMelody.forEach((note) => {
      const frequency = noteFrequencies[note.note];
      if (frequency) {
        playNote(frequency, note.duration, currentTime);
        currentTime += note.duration;
      }
    });

    const totalDuration = jingleBellsMelody.reduce((sum, note) => sum + note.duration, 0);
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        playMelody();
      }
    }, totalDuration * 1000 + 500);
  };

  const startMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.3;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
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

    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
      }
    });
    oscillatorsRef.current = [];

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null;
        gainNodeRef.current = null;
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
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleMusic}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg relative overflow-hidden"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, oklch(0.55 0.22 25) 0%, oklch(0.45 0.12 150) 100%)'
              : 'oklch(0.20 0.04 290)',
            border: '2px solid oklch(0.45 0.12 150)',
          }}
        >
          {isPlaying && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
          <motion.div
            animate={isPlaying ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isPlaying ? Infinity : 0,
              repeatDelay: 0.2,
            }}
          >
            {isPlaying ? (
              <SpeakerHigh size={28} weight="fill" className="text-white relative z-10" />
            ) : (
              <SpeakerSlash size={28} weight="fill" className="text-muted-foreground relative z-10" />
            )}
          </motion.div>
        </Button>
        {isPlaying && (
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            🎵
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
