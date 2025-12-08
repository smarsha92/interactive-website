import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Terminal as TerminalIcon, ArrowDown } from '@phosphor-icons/react';
import { Terminal } from './Terminal';
import { useTypewriter } from '@/hooks/use-typewriter';

interface WebsiteViewProps {
  onCommand: (command: string) => void;
}

export function WebsiteView({ onCommand }: WebsiteViewProps) {
  const [showMiniTerminal, setShowMiniTerminal] = useState(false);
  
  const navTitle = useTypewriter('Terminal.web', 120);
  const navFeatures = useTypewriter('Features', 120);
  const navAbout = useTypewriter('About', 120);
  const navContact = useTypewriter('Contact', 120);
  const btnGetStarted = useTypewriter('Get Started', 120);
  const btnLearnMore = useTypewriter('Learn More', 120);
  
  const heroTitle1 = useTypewriter('Retro Terminal', 120);
  const heroTitle2 = useTypewriter('Meets Modern Web', 120);
  const heroSubtitle1 = useTypewriter('Experience the nostalgia of classic command-line interfaces', 120);
  const heroSubtitle2 = useTypewriter('reimagined with glassmorphic design and smooth interactions', 120);
  
  const featuresHeading = useTypewriter('Key Features', 120);
  const feature1Title = useTypewriter('Interactive Terminal', 120);
  const feature1Desc = useTypewriter('Classic command-line experience with modern polish and real-time feedback', 120);
  const feature2Title = useTypewriter('15 Unique Themes', 120);
  const feature2Desc = useTypewriter('Customize your experience with carefully crafted color schemes', 120);
  const feature3Title = useTypewriter('Network Simulator', 120);
  const feature3Desc = useTypewriter('Visualize packet routing across different network topologies', 120);
  const feature4Title = useTypewriter('Glassmorphism', 120);
  const feature4Desc = useTypewriter('Beautiful semi-transparent effects with backdrop blur', 120);
  const feature5Title = useTypewriter('Smooth Animations', 120);
  const feature5Desc = useTypewriter('Purposeful transitions that enhance the user experience', 120);
  const feature6Title = useTypewriter('Persistent State', 120);
  const feature6Desc = useTypewriter('Your preferences and settings are saved across sessions', 120);
  
  const aboutHeading = useTypewriter('About This Project', 120);
  const about1 = useTypewriter('This application bridges the gap between retro terminal aesthetics and modern web design principles.', 120);
  const about2 = useTypewriter('Built with React, TypeScript, and Tailwind CSS, it demonstrates how nostalgia can coexist with contemporary UI patterns.', 120);
  const about3 = useTypewriter('Every interaction is carefully crafted to feel both familiar and delightfully modern.', 120);
  
  const contactHeading = useTypewriter('Get In Touch', 120);
  const contact1 = useTypewriter('Ready to explore more?', 120);
  const contact2 = useTypewriter('Type "end" in the terminal to return', 120);
  const contact3 = useTypewriter('Or keep scrolling to see what\'s possible', 120);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground terminal-font">
            <span className="text-accent">{'>'}</span> {navTitle || ''}
          </h1>
          <div className="flex gap-6">
            <a href="#features" className="text-foreground hover:text-accent transition-colors">{navFeatures || ''}</a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">{navAbout || ''}</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">{navContact || ''}</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            {heroTitle1 || ''}
            <br />
            <span className="text-accent">{heroTitle2 || ''}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {heroSubtitle1 || ''}
            <br />
            {heroSubtitle2 || ''}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              {btnGetStarted || ''}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              {btnLearnMore || ''}
            </Button>
          </div>
          <motion.div
            className="mt-16 bounce-slow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-8 h-8 text-accent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="min-h-screen flex items-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-16 text-center text-foreground"
          >
            {featuresHeading || ''}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature1Title || ''}</h3>
                <p className="text-muted-foreground">{feature1Desc || ''}</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature2Title || ''}</h3>
                <p className="text-muted-foreground">{feature2Desc || ''}</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature3Title || ''}</h3>
                <p className="text-muted-foreground">{feature3Desc || ''}</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature4Title || ''}</h3>
                <p className="text-muted-foreground">{feature4Desc || ''}</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature5Title || ''}</h3>
                <p className="text-muted-foreground">{feature5Desc || ''}</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature6Title || ''}</h3>
                <p className="text-muted-foreground">{feature6Desc || ''}</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-8 text-foreground"
          >
            {aboutHeading || ''}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="terminal-font text-lg leading-relaxed"
          >
            <Card className="p-8 text-left">
              <p className="text-foreground mb-4">
                <span className="text-accent">{'>'}</span> {about1 || ''}
              </p>
              <p className="text-foreground mb-4">
                <span className="text-accent">{'>'}</span> {about2 || ''}
              </p>
              <p className="text-foreground">
                <span className="text-accent">{'>'}</span> {about3 || ''}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center px-6 py-24">
        <div className="max-w-2xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-8 text-center text-foreground"
          >
            {contactHeading || ''}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 terminal-font">
              <div className="space-y-4 text-foreground">
                <p><span className="text-accent">{'>'}</span> {contact1 || ''}</p>
                <p><span className="text-accent">{'>'}</span> {contact2 || ''}</p>
                <p><span className="text-accent">{'>'}</span> {contact3 || ''}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {!showMiniTerminal ? (
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-2xl"
            onClick={() => setShowMiniTerminal(true)}
          >
            <TerminalIcon className="w-6 h-6" weight="bold" />
          </Button>
        ) : (
          <div className="w-96 max-w-[calc(100vw-3rem)]">
            <div className="relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-10 right-0 z-10"
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
