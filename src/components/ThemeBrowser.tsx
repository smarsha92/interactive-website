import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Check } from '@phosphor-icons/react';
import { themes, type Theme } from '@/lib/themes';

interface ThemeBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (themeName: string) => void;
  currentTheme: string;
}

export function ThemeBrowser({ isOpen, onClose, onSelectTheme, currentTheme }: ThemeBrowserProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSelectTheme = (themeName: string) => {
    onSelectTheme(themeName);
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--background) 80%, transparent)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-4 sm:p-6 relative">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Choose Your Theme</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Object.values(themes).map((theme, index) => (
                  <motion.div
                    key={theme.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ThemePreviewCard
                      theme={theme}
                      isActive={currentTheme === theme.name}
                      isHovered={hoveredTheme === theme.name}
                      onHover={() => setHoveredTheme(theme.name)}
                      onLeave={() => setHoveredTheme(null)}
                      onClick={() => handleSelectTheme(theme.name)}
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ThemePreviewCardProps {
  theme: Theme;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function ThemePreviewCard({ theme, isActive, isHovered, onHover, onLeave, onClick }: ThemePreviewCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <Card
        className={`p-3 sm:p-4 transition-all duration-200 ${
          isActive ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-accent'
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.card})`
            : theme.colors.background,
        }}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="font-bold text-sm sm:text-base" style={{ color: theme.colors.foreground }}>
            {theme.label}
          </h3>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: theme.colors.primaryForeground }} weight="bold" />
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          <ColorSwatch color={theme.colors.primary} label="Primary" />
          <ColorSwatch color={theme.colors.accent} label="Accent" />
          <ColorSwatch color={theme.colors.secondary} label="Secondary" />
          <ColorSwatch color={theme.colors.border} label="Border" />
        </div>

        <div
          className="mt-2 sm:mt-3 p-1.5 sm:p-2 rounded text-[10px] sm:text-xs terminal-font"
          style={{
            backgroundColor: theme.colors.card,
            color: theme.colors.foreground,
            borderLeft: `2px solid ${theme.colors.accent}`,
          }}
        >
          <span style={{ color: theme.colors.accent }}>{'>'}</span> theme preview
        </div>
      </Card>
    </motion.div>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
}

function ColorSwatch({ color, label }: ColorSwatchProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-full h-7 sm:h-8 rounded transition-transform hover:scale-105 active:scale-95"
        style={{
          backgroundColor: color,
        }}
        title={label}
      />
    </div>
  );
}
