import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Terminal as TerminalIcon, ArrowDown, List, X } from '@phosphor-icons/react';
import { Terminal } from './Terminal';
import { Error404 } from './Error404';
import { ComingSoon } from './ComingSoon';

interface WebsiteViewProps {
  onCommand: (command: string) => void;
}

export function WebsiteView({ onCommand }: WebsiteViewProps) {
  const [showMiniTerminal, setShowMiniTerminal] = useState(false);
  const [show404, setShow404] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (page === 'theme') {
      onCommand('__THEMES__');
    } else if (page === 'learning') {
      setShow404(true);
    } else if (page === 'exam') {
      setComingSoonFeature('Exam');
    } else if (page === 'glossary') {
      setComingSoonFeature('Glossary');
    }
  };

  if (show404) {
    return <Error404 onBack={() => setShow404(false)} />;
  }

  if (comingSoonFeature) {
    return <ComingSoon feature={comingSoonFeature} onBack={() => setComingSoonFeature(null)} />;
  }

  return (
    <div className="min-h-screen relative">
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-foreground terminal-font">
            <span className="text-accent">{'>'}</span> Terminal.web
          </h1>
          <div className="hidden md:flex gap-4 lg:gap-6 terminal-font text-sm">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-foreground hover:text-accent transition-colors">[Home]</a>
            <a href="#learning" onClick={(e) => handleNavClick(e, 'learning')} className="text-foreground hover:text-accent transition-colors">[Learning]</a>
            <a href="#exam" onClick={(e) => handleNavClick(e, 'exam')} className="text-foreground hover:text-accent transition-colors">[Exam]</a>
            <a href="#glossary" onClick={(e) => handleNavClick(e, 'glossary')} className="text-foreground hover:text-accent transition-colors">[Glossary]</a>
            <a href="#theme" onClick={(e) => handleNavClick(e, 'theme')} className="text-foreground hover:text-accent transition-colors">[Theme]</a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" weight="bold" />
            ) : (
              <List className="w-5 h-5" weight="bold" />
            )}
          </Button>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <div className="flex flex-col terminal-font text-sm py-2">
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, 'home')} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors px-4 py-3"
                >
                  [Home]
                </a>
                <a 
                  href="#learning" 
                  onClick={(e) => handleNavClick(e, 'learning')} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors px-4 py-3"
                >
                  [Learning]
                </a>
                <a 
                  href="#exam" 
                  onClick={(e) => handleNavClick(e, 'exam')} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors px-4 py-3"
                >
                  [Exam]
                </a>
                <a 
                  href="#glossary" 
                  onClick={(e) => handleNavClick(e, 'glossary')} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors px-4 py-3"
                >
                  [Glossary]
                </a>
                <a 
                  href="#theme" 
                  onClick={(e) => handleNavClick(e, 'theme')} 
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors px-4 py-3"
                >
                  [Theme]
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl w-full"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-foreground terminal-font leading-tight px-2">
            C:\Networking\Guide{'>'} 
            <br />
            <span className="text-accent">Welcome to Networking Mastery</span>
          </h2>
          <motion.div
            className="mt-8 sm:mt-16 bounce-slow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-16 text-center text-foreground"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Interactive Terminal</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Classic command-line experience with modern polish and real-time feedback</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">15 Unique Themes</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Customize your experience with carefully crafted color schemes</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Network Simulator</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Visualize packet routing across different network topologies</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Glassmorphism</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Beautiful semi-transparent effects with backdrop blur</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Smooth Animations</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Purposeful transitions that enhance the user experience</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">Persistent State</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Your preferences and settings are saved across sessions</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-foreground"
          >
            About This Project
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="terminal-font text-base sm:text-lg leading-relaxed"
          >
            <Card className="p-6 sm:p-8 text-left">
              <p className="text-foreground mb-4">
                <span className="text-accent">{'>'}</span> This application bridges the gap between retro terminal aesthetics and modern web design principles.
              </p>
              <p className="text-foreground mb-4">
                <span className="text-accent">{'>'}</span> Built with React, TypeScript, and Tailwind CSS, it demonstrates how nostalgia can coexist with contemporary UI patterns.
              </p>
              <p className="text-foreground">
                <span className="text-accent">{'>'}</span> Every interaction is carefully crafted to feel both familiar and delightfully modern.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center text-foreground"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 sm:p-8 terminal-font">
              <div className="space-y-4 text-foreground">
                <p><span className="text-accent">{'>'}</span> Ready to explore more?</p>
                <p><span className="text-accent">{'>'}</span> Type "end" in the terminal to return</p>
                <p><span className="text-accent">{'>'}</span> Or keep scrolling to see what's possible</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        {!showMiniTerminal ? (
          <Button
            size="lg"
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-2xl"
            onClick={() => setShowMiniTerminal(true)}
          >
            <TerminalIcon className="w-5 h-5 sm:w-6 sm:h-6" weight="bold" />
          </Button>
        ) : (
          <div className="w-[calc(100vw-2rem)] max-w-md sm:w-96">
            <div className="relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-8 sm:-top-10 right-0 z-10 text-xs sm:text-sm"
                onClick={() => setShowMiniTerminal(false)}
              >
                Close
              </Button>
              <Terminal mini={true} onCommand={onCommand} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
