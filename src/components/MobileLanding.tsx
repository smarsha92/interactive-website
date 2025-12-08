import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MobileLandingProps {
  onEnter: () => void;
  currentTheme: string;
  gradient: string;
}

export function MobileLanding({ onEnter, currentTheme, gradient }: MobileLandingProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          background: gradient,
          backgroundSize: ['200% 200%', '220% 220%', '200% 200%'],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          opacity: { duration: 0.4 },
          backgroundSize: { 
            duration: 120, 
            ease: 'easeInOut', 
            repeat: Infinity,
            repeatType: 'reverse'
          },
          backgroundPosition: { 
            duration: 120, 
            ease: 'easeInOut', 
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
      />
      
      <div className="absolute inset-0 z-10 bg-black/30" />
      
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )`
          }}
        />
      </div>

      <div className="relative z-30 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <Card 
            className="p-8 space-y-8"
            style={{
              background: `rgba(0, 0, 0, ${0.4})`,
              backdropFilter: `blur(20px)`,
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15 
                }}
                className="flex justify-center"
              >
                <div className="p-4 rounded-2xl bg-primary/20 border-2 border-primary">
                  <TerminalIcon size={48} className="text-primary" weight="duotone" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold text-foreground terminal-font">
                  Terminal Interface
                </h1>
                <p className="text-muted-foreground text-sm">
                  A powerful command-line experience
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Multiple themes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Network simulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Customizable experience</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileTap={{ scale: 0.98 }}
                onTapStart={() => setIsPressed(true)}
                onTap={() => {
                  setIsPressed(false);
                  setTimeout(() => onEnter(), 150);
                }}
                onTapCancel={() => setIsPressed(false)}
              >
                <Button
                  size="lg"
                  className="w-full text-base font-semibold h-14 group relative overflow-hidden"
                  style={{
                    background: isPressed 
                      ? 'var(--primary)' 
                      : 'var(--accent)',
                    color: isPressed 
                      ? 'var(--primary-foreground)' 
                      : 'var(--accent-foreground)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'linear'
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    Enter Terminal
                    <ArrowRight 
                      size={20} 
                      className="group-hover:translate-x-1 transition-transform" 
                      weight="bold" 
                    />
                  </span>
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground">
                Tap to launch the full terminal experience
              </p>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Theme: <span className="text-primary font-semibold terminal-font">
              {currentTheme.toUpperCase()}
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
