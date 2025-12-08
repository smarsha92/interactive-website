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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 h-64 glass-panel rounded-xl overflow-hidden flex flex-col shadow-2xl origin-bottom-right"
          >
            <div className="flex items-center justify-between p-2 bg-black/20 border-b border-white/10">
              <span className="text-xs font-mono text-[var(--color-primary)] ml-2">mini-term</span>
              <div className="flex gap-1">
                <button 
                   onClick={onOpenTerminal}
                   className="p-1 hover:text-[var(--color-accent)] transition-colors"
                   title="Expand to full terminal"
                >
                  <Maximize2 size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            
            <div 
              className="flex-1 p-3 font-mono text-xs overflow-y-auto custom-scrollbar font-bold text-[var(--color-text)]"
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
            >
              <div className="mb-2 text-[var(--color-secondary)]">RetroTerminal Mini [v1.0]</div>
              
              {history.map((item, idx) => (
                <div key={idx} className="mb-1 break-words leading-relaxed">
                  {item.type === 'cmd' ? (
                    <div className="flex gap-2 text-[var(--color-secondary)]">
                      <span className="text-[var(--color-primary)]">$</span>
                      <span className="text-[var(--color-text)]">{item.content}</span>
                    </div>
                  ) : (
                    <div className="text-[var(--color-text)] opacity-90">{item.content}</div>
                  )}
                </div>
              ))}

              <div className="flex gap-2 items-center">
                <span className="text-[var(--color-primary)]">$</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-[var(--color-text)] caret-transparent p-0 m-0"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span 
                    className="absolute top-0 pointer-events-none"
                    style={{ left: `${input.length}ch` }}
                  >
                    <span className="inline-block w-2 h-3.5 bg-[var(--color-primary)] animate-[blink_1s_step-end_infinite] align-middle" />
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
        className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-black flex items-center justify-center shadow-[0_0_20px_var(--color-primary)] hover:shadow-[0_0_30px_var(--color-accent)] transition-shadow duration-300"
      >
         {isOpen ? <X size={24} /> : <TerminalIcon size={24} />}
      </motion.button>
    </div>
  );
};

export default FAB;
