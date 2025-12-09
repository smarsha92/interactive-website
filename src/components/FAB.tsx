import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FABProps {
  onOpenTerminal: () => void;
  onCommand: (cmd: string) => Promise<string | React.ReactNode>;
}

interface MiniHistoryItem {
  type: 'cmd' | 'out';
  content: React.ReactNode;
}

const FAB: React.FC<FABProps> = ({ onOpenTerminal, onCommand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<MiniHistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      const cmd = input.trim();
      setInput('');
      
      if (!cmd) return;

      setHistory(prev => [...prev, { type: 'cmd', content: cmd }]);
      setIsProcessing(true);

      try {
        const result = await onCommand(cmd);
        setHistory(prev => [...prev, { type: 'out', content: result }]);
      } catch (err) {
        setHistory(prev => [...prev, { type: 'out', content: <span className="text-red-400">Error executing command</span> }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-3 sm:mb-4 w-[calc(100vw-2rem)] max-w-md sm:w-[540px] h-[60vh] sm:h-[450px] rounded-lg overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] origin-bottom-right border border-primary/30 theme-transition"
            style={{
              background: 'oklch(0.12 0.02 240)',
              transition: 'background-color 0.6s ease-in-out, border-color 0.6s ease-in-out'
            }}
          >
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-primary/30 theme-transition" style={{ 
              background: 'oklch(0.08 0.02 240)',
              transition: 'background-color 0.6s ease-in-out, border-color 0.6s ease-in-out'
            }}>
              <span className="text-xs sm:text-sm terminal-font text-primary">mini-term</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button 
                   onClick={onOpenTerminal}
                   className="p-1 hover:text-accent transition-colors text-muted-foreground"
                   title="Expand to full terminal"
                >
                  <Maximize2 size={14} className="sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-red-400 transition-colors text-muted-foreground"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            
            <div 
              className="flex-1 p-3 sm:p-4 terminal-font text-xs sm:text-sm overflow-y-auto"
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'oklch(0.35 0.08 195) transparent',
              }}
            >
              <div className="mb-4 text-muted-foreground">RetroTerminal Mini [v1.0]</div>
              
              {history.map((item, idx) => (
                <div key={idx} className="mb-2 break-words leading-relaxed">
                  {item.type === 'cmd' ? (
                    <div className="flex gap-2">
                      <span className="text-primary">$</span>
                      <span className="text-foreground">{item.content}</span>
                    </div>
                  ) : (
                    <div className="text-foreground/80 ml-4">{item.content}</div>
                  )}
                </div>
              ))}

              <div className="flex gap-2 items-start">
                <span className="text-primary mt-0.5">$</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-foreground caret-transparent p-0 m-0 terminal-font text-sm"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isProcessing}
                  />
                  <span 
                    className="absolute top-0 pointer-events-none"
                    style={{ left: `${input.length * 0.6}em` }}
                  >
                    <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--accent)] transition-all duration-500"
        style={{
          transition: 'background-color 0.6s ease-in-out, color 0.6s ease-in-out, box-shadow 0.6s ease-in-out, transform 0.2s ease-in-out'
        }}
      >
         {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <TerminalIcon size={20} className="sm:w-6 sm:h-6" />}
      </motion.button>
    </div>
  );
};

export default FAB;
