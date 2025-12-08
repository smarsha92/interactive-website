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
import { themes, applyTheme } from './lib/themes';

type ViewMode = 'terminal' | 'website';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('terminal');
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

  const handleThemeSelect = (themeName: string) => {
    setCurrentTheme(themeName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground text-base font-mono">
      <AnimatePresence mode="wait">
        {viewMode === 'terminal' && (
          <motion.div
            key={`terminal-${currentTheme}-${opacity}-${blur}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-screen"
          >
            <div 
              className="absolute inset-0 z-0 animated-gradient"
              style={{
                background: themes[currentTheme || 'cyan']?.gradient || 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
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