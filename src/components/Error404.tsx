import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from '@phosphor-icons/react';

interface Error404Props {
  onBack: () => void;
}

export function Error404({ onBack }: Error404Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <XCircle className="w-32 h-32 text-destructive mx-auto" weight="duotone" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl md:text-9xl font-bold mb-4 text-foreground terminal-font"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground terminal-font"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mb-8 terminal-font"
        >
          <span className="text-accent">{'>'}</span> ERROR: The requested resource could not be located
          <br />
          <span className="text-accent">{'>'}</span> File path does not exist in current directory
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            size="lg" 
            onClick={onBack}
            className="text-lg px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
