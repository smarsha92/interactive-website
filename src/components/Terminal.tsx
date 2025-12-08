import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gear } from '@phosphor-icons/react';
import { processCommand, WELCOME_TEXT } from '@/lib/commands';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

interface TerminalProps {
  onCommand?: (command: string) => void;
  mini?: boolean;
  opacity?: number;
  blur?: number;
}

export function Terminal({ onCommand, mini = false, opacity = 80, blur = 20 }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typeWelcome = async () => {
      for (const line of WELCOME_TEXT) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setLines(prev => [...prev, { type: 'output', content: line }]);
      }
      setIsTyping(false);
      inputRef.current?.focus();
    };

    if (!mini) {
      typeWelcome();
    } else {
      setIsTyping(false);
    }
  }, [mini]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = () => {
    if (!currentInput.trim() || isTyping) return;

    const input = currentInput.trim();
    setLines(prev => [...prev, { type: 'input', content: input }]);
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setCurrentInput('');

    const result = processCommand(input);

    if (result.output.includes('__CLEAR__')) {
      setLines([]);
      return;
    }

    if (result.output.some(line => line.startsWith('__'))) {
      const specialCommands = result.output.filter(line => line.startsWith('__'));
      const normalOutput = result.output.filter(line => !line.startsWith('__'));

      normalOutput.forEach(line => {
        setLines(prev => [...prev, { type: result.error ? 'error' : 'output', content: line }]);
      });

      specialCommands.forEach(cmd => {
        if (onCommand) {
          onCommand(cmd);
        }
      });
    } else {
      result.output.forEach(line => {
        setLines(prev => [...prev, { type: result.error ? 'error' : 'output', content: line }]);
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative group">
      <Card
        ref={terminalRef}
        onClick={handleTerminalClick}
        className={`relative terminal-font overflow-hidden transition-all duration-300 ${
          mini ? 'w-full' : 'w-full max-w-3xl mx-auto'
        }`}
        style={{
          backgroundColor: `color-mix(in oklch, var(--card) ${opacity}%, transparent)`,
          backdropFilter: `blur(${blur}px)`,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px var(--accent)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent flex items-center px-4 gap-2">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] cursor-pointer hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] cursor-pointer hover:brightness-110" />
          </div>
          <div className="flex-1" />
          {!mini && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
            >
              <Gear className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className={`${mini ? 'max-h-64 p-4 pt-10' : 'min-h-[500px] max-h-[600px] p-6 pt-12'} overflow-y-auto`}>
          {lines.map((line, i) => (
            <div key={i} className={`mb-2 ${mini ? 'text-sm' : 'text-base'}`}>
              {line.type === 'input' ? (
                <div className="flex gap-2">
                  <span className="text-accent">{'>'}</span>
                  <span className="text-foreground font-bold">{line.content}</span>
                </div>
              ) : (
                <div className={line.type === 'error' ? 'text-destructive' : 'text-foreground opacity-80'}>
                  {line.content}
                </div>
              )}
            </div>
          ))}
          
          {!isTyping && (
            <div className={`flex gap-2 ${mini ? 'text-sm' : 'text-base'}`}>
              <span className="text-accent">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-bold"
                autoFocus
              />
              <span className="cursor-blink text-accent">█</span>
            </div>
          )}
          
          <div ref={bottomRef} />
        </div>
      </Card>
    </div>
  );
}
