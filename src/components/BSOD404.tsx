import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SmileyXEyes } from '@phosphor-icons/react';

interface BSOD404Props {
  onBack: () => void;
  pageName: string;
}

export function BSOD404({ onBack, pageName }: BSOD404Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0078D7] text-white flex items-center justify-center p-8"
    >
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <SmileyXEyes className="w-24 h-24 md:w-32 md:h-32" weight="thin" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-light mb-2">:(</h1>
              <p className="text-lg md:text-xl font-light">
                Your PC ran into a problem and needs to restart. We're
                <br className="hidden md:block" />
                just collecting some error info, and then we'll restart for you.
              </p>
            </div>
          </div>

          <div className="space-y-6 font-mono text-sm md:text-base">
            <div className="space-y-2">
              <p className="opacity-80">
                <span className="inline-block w-32">ERROR CODE:</span>
                <span className="font-bold">PAGE_NOT_FOUND</span>
              </p>
              <p className="opacity-80">
                <span className="inline-block w-32">MODULE:</span>
                <span>{pageName.toUpperCase()}_MODULE</span>
              </p>
              <p className="opacity-80">
                <span className="inline-block w-32">STATUS:</span>
                <span>0x00000404</span>
              </p>
            </div>

            <div className="bg-white/10 p-4 md:p-6 rounded space-y-2 backdrop-blur-sm">
              <p className="text-xs md:text-sm opacity-90">
                What failed: {pageName}_handler.sys
              </p>
              <p className="text-xs md:text-sm opacity-90">
                The requested module is currently under construction and cannot be loaded.
              </p>
              <p className="text-xs md:text-sm opacity-90 mt-4">
                This feature is coming soon. Please check back later or return to the home page.
              </p>
            </div>

            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
              className="h-1 bg-white rounded-full"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={onBack}
                variant="secondary"
                size="lg"
                className="bg-white text-[#0078D7] hover:bg-white/90 font-semibold"
              >
                Return to Home
              </Button>
              <Button
                onClick={onBack}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20 border border-white/30"
              >
                Restart Terminal
              </Button>
            </div>
          </div>

          <div className="text-xs md:text-sm opacity-60 font-mono space-y-1">
            <p>For more information about this issue and possible fixes, visit:</p>
            <p className="underline">https://terminal.web/support/404</p>
            <p className="mt-4">
              If you call a support person, give them this info:
            </p>
            <p>Stop code: PAGE_NOT_FOUND_EXCEPTION</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
