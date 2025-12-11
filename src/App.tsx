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
    } else if (!isMobile) {
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
    setViewMode('website');
  };

  const handleThemeSelect = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  const currentThemeData = themes[currentTheme || 'cyan'];
  const globalGradient = currentThemeData?.gradient || 'radial-gradient(circle at 50% 45%, #00d4ff 0%, transparent 25%), radial-gradient(ellipse at 40% 50%, #0099cc 0%, transparent 35%), radial-gradient(ellipse at 60% 50%, #6b5aff 0%, transparent 35%), radial-gradient(circle at 50% 55%, #4d3dcc 0%, transparent 30%), linear-gradient(180deg, #001428 0%, #000811 100%)';

  return (
    <div className="min-h-screen bg-background text-foreground text-base font-mono relative">
      <motion.div 
        key={`bg-${currentTheme}`}
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
        }}
        transition={{
          opacity: { duration: 0.6 }
        }}
        style={{
          background: globalGradient,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative z-10">
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
                gradient={globalGradient}
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
              <div className="relative z-20 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
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
    </div>
  );
}

export default App;