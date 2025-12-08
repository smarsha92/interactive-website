import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKV } from '@github/spark/hooks';
import { Toaster } from '@/components/ui/sonner';
import { Terminal } from './components/Terminal';
import { WebsiteView } from './components/WebsiteView';
import { ThemeBrowser } from './components/ThemeBrowser';
import { NetworkSimulator } from './components/NetworkSimulator';
import { SnowEffect } from './components/SnowEffect';
import { HolidayMusic } from './components/HolidayMusic';
import { MobileLanding } from './components/MobileLanding';
import { themes, applyTheme } from './lib/themes';
import { useIsMobile } from './hooks/use-mobile';

type ViewMode = 'landing' | 'terminal' | 'website';

function App() {
  const isMobile = useIsMobile();
  const [hasEnteredTerminal, setHasEnteredTerminal] = useKV<boolean>('has-entered-terminal', false);
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [showThemeBrowser, setShowThemeBrowser] = useState(false);
  const [showNetworkSim, setShowNetworkSim] = useState(false);
  const [currentTheme, setCurrentTheme] = useKV<string>('terminal-theme', 'cyan');
  const [opacity] = useKV<number>('terminal-opacity', 90);
  const [blur] = useKV<number>('terminal-blur', 20);

  useEffect(() => {
    const theme = themes[currentTheme || 'cyan'];
    if (theme) {
      applyTheme(theme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (isMobile && !hasEnteredTerminal) {
      setViewMode('landing');
    } else {
      setViewMode('terminal');
    }
  }, [isMobile, hasEnteredTerminal]);

  const handleCommand = (command: string) => {
    if (command === '__START__') {
      setViewMode('website');
    } else if (command === '__END__') {
      setViewMode('terminal');
    } else if (command === '__THEMES__') {
      setShowThemeBrowser(true);
    } else if (command === '__NETWORK__') {
      setShowNetworkSim(true);
    } else if (command.startsWith('__THEME_')) {
      const themeName = command.replace('__THEME_', '').toLowerCase();
      setCurrentTheme(themeName);
    }
  };

  const handleEnterTerminal = () => {
    setHasEnteredTerminal(true);
    setViewMode('terminal');
  };

  const handleThemeSelect = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground text-base font-mono">
      <AnimatePresence mode="wait">
        {viewMode === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MobileLanding 
              onEnter={handleEnterTerminal}
              currentTheme={currentTheme || 'cyan'}
              gradient={themes[currentTheme || 'cyan']?.gradient || 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'}
            />
          </motion.div>
        )}

        {viewMode === 'terminal' && (
          <motion.div
            key={`terminal-${currentTheme}-${opacity}-${blur}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-screen"
          >
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                background: themes[currentTheme || 'cyan']?.gradient || 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                backgroundSize: ['200% 200%', '220% 220%', '200% 200%'],
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                opacity: { duration: 0.4 },
                background: { duration: 0.8, ease: 'easeInOut' },
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
            <div className="absolute inset-0 z-10 bg-black/20" />
            <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
              <Terminal onCommand={handleCommand} opacity={opacity ?? 90} blur={blur ?? 20} />
            </div>
          </motion.div>
        )}

        {viewMode === 'website' && (
          <motion.div
            key="website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WebsiteView onCommand={handleCommand} />
          </motion.div>
        )}
      </AnimatePresence>
      <ThemeBrowser
        isOpen={showThemeBrowser}
        onClose={() => setShowThemeBrowser(false)}
        onSelectTheme={handleThemeSelect}
        currentTheme={currentTheme || 'cyan'}
      />
      <NetworkSimulator
        isOpen={showNetworkSim}
        onClose={() => setShowNetworkSim(false)}
      />
      {currentTheme === 'xmas' && <SnowEffect />}
      <HolidayMusic isHolidayTheme={currentTheme === 'xmas'} />
      <Toaster />
    </div>
  );
}

export default App;