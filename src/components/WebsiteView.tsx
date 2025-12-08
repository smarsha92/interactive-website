import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Terminal as TerminalIcon, ArrowDown } from '@phosphor-icons/react';
import { Terminal } from './Terminal';

interface WebsiteViewProps {
  onCommand: (command: string) => void;
}

export function WebsiteView({ onCommand }: WebsiteViewProps) {
  const [showMiniTerminal, setShowMiniTerminal] = useState(false);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground terminal-font">
            <span className="text-accent">{'>'}</span> Terminal.web
          </h1>
          <div className="flex gap-6">
            <a href="#features" className="text-foreground hover:text-accent transition-colors">Features</a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
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
            Retro Terminal
            <br />
            <span className="text-accent">Meets Modern Web</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the nostalgia of classic command-line interfaces
            <br />
            reimagined with glassmorphic design and smooth interactions
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
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
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interactive Terminal',
                description: 'Classic command-line experience with modern polish and real-time feedback',
              },
              {
                title: '15 Unique Themes',
                description: 'Customize your experience with carefully crafted color schemes',
              },
              {
                title: 'Network Simulator',
                description: 'Visualize packet routing across different network topologies',
              },
              {
                title: 'Glassmorphism',
                description: 'Beautiful semi-transparent effects with backdrop blur',
              },
              {
                title: 'Smooth Animations',
                description: 'Purposeful transitions that enhance the user experience',
              },
              {
                title: 'Persistent State',
                description: 'Your preferences and settings are saved across sessions',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
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
            About This Project
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
                <span className="text-accent">{'>'}</span> This application bridges the gap between retro terminal aesthetics
                and modern web design principles.
              </p>
              <p className="text-foreground mb-4">
                <span className="text-accent">{'>'}</span> Built with React, TypeScript, and Tailwind CSS, it demonstrates
                how nostalgia can coexist with contemporary UI patterns.
              </p>
              <p className="text-foreground">
                <span className="text-accent">{'>'}</span> Every interaction is carefully crafted to feel both familiar
                and delightfully modern.
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
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 terminal-font">
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
