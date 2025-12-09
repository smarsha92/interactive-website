import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Rocket, Code, Sparkle } from '@phosphor-icons/react';

interface ComingSoonProps {
  feature: string;
  onBack: () => void;
}

export function ComingSoon({ feature, onBack }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className="p-6 sm:p-8 md:p-12 text-center backdrop-blur-xl bg-card/80 border-2">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8 flex justify-center gap-2 sm:gap-4"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-accent" weight="duotone" />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <Sparkle className="w-8 h-8 sm:w-12 sm:h-12 text-primary" weight="fill" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Code className="w-12 h-12 sm:w-16 sm:h-16 text-accent" weight="duotone" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground terminal-font"
          >
            <span className="text-accent">{'>'}</span> Coming Soon
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-primary"
          >
            {feature}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 sm:mb-8 terminal-font text-sm sm:text-base md:text-lg space-y-2 sm:space-y-3"
          >
            <p className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> This feature is currently under development
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> Check back soon for updates
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> Great things are on the way!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={onBack}
              className="terminal-font gap-2"
            >
              <ArrowLeft weight="bold" />
              Back to Home
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border"
          >
            <p className="text-xs sm:text-sm text-muted-foreground terminal-font">
              <span className="text-accent">{'>'}</span> Want to be notified? Keep exploring other features in the meantime!
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
