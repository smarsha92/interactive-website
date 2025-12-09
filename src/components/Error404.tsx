import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface Error404Props {
  onBack: () => void;
}

export function Error404({ onBack }: Error404Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <XCircle className="w-24 h-24 sm:w-32 sm:h-32 text-destructive mx-auto" weight="duotone" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold mb-3 sm:mb-4 text-foreground"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 px-4"
        >
          <span className="text-accent">Page not found.</span> The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onBack}
            size="lg"
            className="gap-2"
          >
            <ArrowLeft weight="bold" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
