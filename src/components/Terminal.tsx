import { useState, useEffect, useRef } from 'react'
import { X, Minus, Square, Sliders } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { ThemeBrowser } from './ThemeBrowser'
import { NetworkSimulator } from './NetworkSimulator'

interface TerminalWindowProps {
  onStartWebsite: () => void
  onStartHtmlOnly: () => void
  onThemeChange: (theme: string) => void
  currentTheme: string
  className?: string
  mini?: boolean
  onClose?: () => void
  onEndWebsite?: () => void
  onMinimize?: () => void
  isMinimized?: boolean
  onMaximize?: () => void
  isMaximized?: boolean
}

interface TerminalLine {
  type: 'output' | 'input' | 'error'
  text: string
}

export function TerminalWindow({ 
  onStartWebsite,
  onStartHtmlOnly, 
  onThemeChange, 
  currentTheme,
  className = '',
  mini = false,
  onClose,
  onEndWebsite,
  onMinimize,
  isMinimized = false,
  onMaximize,
  isMaximized = false
}: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showThemeBrowser, setShowThemeBrowser] = useState(false)
  const [showNetworkSimulator, setShowNetworkSimulator] = useState(false)
  const [opacity, setOpacity] = useState(() => {
    const saved = localStorage.getItem('terminal-opacity')
    return saved ? parseInt(saved) : 90
  })
  const [blur, setBlur] = useState(() => {
    const saved = localStorage.getItem('terminal-blur')
    return saved ? parseInt(saved) : 20
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [trafficLightHover, setTrafficLightHover] = useState(false)

  const welcomeMessage = "Welcome to Networking Mastery"

  useEffect(() => {
    if (!mini) {
      let index = 0
      const interval = setInterval(() => {
        if (index <= welcomeMessage.length) {
          setLines([{ type: 'output', text: welcomeMessage.slice(0, index) }])
          index++
        } else {
          clearInterval(interval)
          setIsTyping(false)
          setLines(prev => [
            ...prev,
            { type: 'output', text: '' },
            { type: 'output', text: 'Type "help" for more commands' }
          ])
        }
      }, 50)
      return () => clearInterval(interval)
    } else {
      setIsTyping(false)
      setLines([
        { type: 'output', text: 'Mini Terminal' },
        { type: 'output', text: '' },
        { type: 'output', text: 'Type "help" for commands or "end" to return' }
      ])
    }
  }, [mini])

  useEffect(() => {
    localStorage.setItem('terminal-opacity', opacity.toString())
  }, [opacity])

  useEffect(() => {
    localStorage.setItem('terminal-blur', blur.toString())
  }, [blur])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    setLines(prev => [...prev, { type: 'input', text: `$ ${cmd}` }])

    if (trimmedCmd === '') return

    switch (trimmedCmd) {
      case 'help':
        const helpLines = [
          { type: 'output' as const, text: 'Available commands:' },
          { type: 'output' as const, text: '  start    - Launch the full website' },
          { type: 'output' as const, text: '  ps       - Launch HTML-only version of website' },
          { type: 'output' as const, text: '  network  - Open network packet simulator' },
          { type: 'output' as const, text: '  themes   - View available color themes' },
          { type: 'output' as const, text: '  xmas     - Enable festive Christmas theme' },
          { type: 'output' as const, text: '  90s      - Enable retro 8-bit pixel theme' },
          { type: 'output' as const, text: '  effects  - Toggle 90s CRT effects (90s theme only)' },
          { type: 'output' as const, text: '  version  - Display version information' },
          { type: 'output' as const, text: '  whoami   - Display current user information' },
          { type: 'output' as const, text: '  date     - Show current date and time' },
          { type: 'output' as const, text: '  fortune  - Get a random fortune' },
          { type: 'output' as const, text: '  joke     - Hear a networking joke' },
          { type: 'output' as const, text: '  status   - Check system status' },
          { type: 'output' as const, text: '  about    - Learn about this terminal' },
          { type: 'output' as const, text: '  secret   - ???' },
          { type: 'output' as const, text: '  clear    - Clear the terminal' },
          { type: 'output' as const, text: '  help     - Show this help message' }
        ]
        if (mini) {
          helpLines.splice(1, 0, { type: 'output' as const, text: '  end      - Return to main terminal' })
        }
        setLines(prev => [...prev, ...helpLines])
        break
      case 'start':
        setLines(prev => [...prev, { type: 'output', text: 'Launching website...' }])
        setTimeout(() => onStartWebsite(), 500)
        break
      case 'ps':
        setLines(prev => [...prev, { type: 'output', text: 'Launching HTML-only website...' }])
        setTimeout(() => onStartHtmlOnly(), 500)
        break
      case 'network':
        setLines(prev => [...prev, { type: 'output', text: 'Initializing network simulator...' }])
        setTimeout(() => setShowNetworkSimulator(true), 300)
        break
      case 'themes':
        setShowThemeBrowser(true)
        setLines(prev => [
          ...prev,
          { type: 'output', text: 'Opening theme browser...' }
        ])
        break
      case 'default':
        onThemeChange('default')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Default' }])
        break
      case 'cyan':
        onThemeChange('cyan')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Cyan' }])
        break
      case 'matrix':
        onThemeChange('matrix')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Matrix Green' }])
        break
      case 'amber':
        onThemeChange('amber')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Amber' }])
        break
      case 'purple':
        onThemeChange('purple')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Purple' }])
        break
      case 'xmas':
        onThemeChange('xmas')
        setLines(prev => [
          ...prev,
          { type: 'output', text: '🎄 Ho ho ho! Merry Christmas! 🎅' },
          { type: 'output', text: 'Festive theme activated!' }
        ])
        break
      case 'sunset':
        onThemeChange('sunset')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Sunset' }])
        break
      case 'ocean':
        onThemeChange('ocean')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Ocean' }])
        break
      case 'neon':
        onThemeChange('neon')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Neon' }])
        break
      case 'forest':
        onThemeChange('forest')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Forest' }])
        break
      case 'rose':
        onThemeChange('rose')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Rose' }])
        break
      case 'gold':
        onThemeChange('gold')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Gold' }])
        break
      case 'ice':
        onThemeChange('ice')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Ice' }])
        break
      case 'synthwave':
        onThemeChange('synthwave')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Synthwave' }])
        break
      case 'cyberpunk':
        onThemeChange('cyberpunk')
        setLines(prev => [...prev, { type: 'output', text: 'Theme set to: Cyberpunk' }])
        break
      case '90s':
        onThemeChange('90s')
        setLines(prev => [
          ...prev,
          { type: 'output', text: '🎮 RADICAL! Activating 8-bit pixel theme!' },
          { type: 'output', text: 'Welcome to the 90s, dude! 🕹️' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Tip: Type "effects" to toggle scanlines & CRT effects' }
        ])
        break
      case 'effects':
        if (currentTheme === '90s') {
          const currentValue = localStorage.getItem('90s-effects-enabled')
          const newValue = currentValue === 'false' ? 'true' : 'false'
          localStorage.setItem('90s-effects-enabled', newValue)
          
          window.spark.kv.set('90s-effects-enabled', newValue === 'true')
          
          const root = document.documentElement
          if (newValue === 'true') {
            root.classList.add('retro-effects-enabled')
            setLines(prev => [
              ...prev,
              { type: 'output', text: '📺 CRT Effects: ENABLED' },
              { type: 'output', text: 'Scanlines, vignette, and filters activated!' }
            ])
          } else {
            root.classList.remove('retro-effects-enabled')
            setLines(prev => [
              ...prev,
              { type: 'output', text: '📺 CRT Effects: DISABLED' },
              { type: 'output', text: 'Effects turned off for cleaner display' }
            ])
          }
        } else {
          setLines(prev => [
            ...prev,
            { type: 'error', text: 'Error: "effects" command only works with 90s theme' },
            { type: 'output', text: 'Type "90s" to enable the retro theme first!' }
          ])
        }
        break
      case 'version':
        setLines(prev => [
          ...prev,
          { type: 'output', text: 'Networking Mastery Terminal v1.0.0' },
          { type: 'output', text: 'Hamper Edition' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Build: 2024.12.HAMPER' },
          { type: 'output', text: 'Engine: Interactive Terminal Framework' }
        ])
        break
      case 'whoami':
        setLines(prev => [
          ...prev,
          { type: 'output', text: 'user@networking-mastery' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Role: Network Enthusiast' },
          { type: 'output', text: 'Level: Intermediate' },
          { type: 'output', text: 'Skills: TCP/IP, Routing, Security' },
          { type: 'output', text: 'Status: Learning mode activated ✨' }
        ])
        break
      case 'date':
        const now = new Date()
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLines(prev => [
          ...prev,
          { type: 'output', text: `${dateStr}` },
          { type: 'output', text: `${timeStr}` },
          { type: 'output', text: '' },
          { type: 'output', text: 'System Time: Synchronized' }
        ])
        break
      case 'fortune':
        const fortunes = [
          'A network engineer never gets lost - they just take the scenic route.',
          'The future belongs to those who believe in the beauty of their packets.',
          'Your next great connection is just a handshake away.',
          'In networking, as in life, redundancy is your friend.',
          'A broadcast storm is brewing, but your skills will clear the skies.',
          'The path to mastery is paved with dropped packets and lessons learned.',
          'Today is a good day to optimize your routing tables.',
          'Trust the process, verify the checksums.',
          'Your bandwidth capacity exceeds your current utilization - reach higher!',
          'The best time to learn networking was yesterday. The second best time is now.'
        ]
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
        setLines(prev => [
          ...prev,
          { type: 'output', text: '🔮 Your Fortune:' },
          { type: 'output', text: '' },
          { type: 'output', text: `"${randomFortune}"` }
        ])
        break
      case 'joke':
        const jokes = [
          'Why did the network administrator go broke?\nToo many packet losses!',
          'How do routers greet each other?\n"Hello, neighbor! What\'s your metric?"',
          'Why don\'t networks ever get tired?\nThey always have plenty of bandwidth to spare!',
          'What did the router say to the doctor?\n"It hurts when IP!"',
          'Why did the firewall break up with the router?\nToo many trust issues!',
          'How does a network engineer fix a problem?\nThey just switch to a better solution!',
          'Why was the subnet always calm?\nBecause it knew how to mask its feelings!',
          'What\'s a network\'s favorite type of music?\nHeavy packet metal!'
        ]
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
        setLines(prev => [
          ...prev,
          { type: 'output', text: '😄 Here\'s one for you:' },
          { type: 'output', text: '' },
          { type: 'output', text: randomJoke }
        ])
        break
      case 'status':
        const uptime = Math.floor(Math.random() * 48) + 1
        const memUsage = Math.floor(Math.random() * 30) + 40
        const cpuUsage = Math.floor(Math.random() * 25) + 15
        setLines(prev => [
          ...prev,
          { type: 'output', text: '═══════════════════════════════════' },
          { type: 'output', text: '    SYSTEM STATUS REPORT' },
          { type: 'output', text: '═══════════════════════════════════' },
          { type: 'output', text: '' },
          { type: 'output', text: `⚡ Uptime:         ${uptime} hours` },
          { type: 'output', text: `💾 Memory Usage:   ${memUsage}%` },
          { type: 'output', text: `🔥 CPU Load:       ${cpuUsage}%` },
          { type: 'output', text: '🌐 Network:       Connected' },
          { type: 'output', text: '🔒 Security:      Enabled' },
          { type: 'output', text: '📡 Latency:       Low' },
          { type: 'output', text: '' },
          { type: 'output', text: '✓ All systems operational' }
        ])
        break
      case 'about':
        setLines(prev => [
          ...prev,
          { type: 'output', text: '┌─────────────────────────────────────┐' },
          { type: 'output', text: '│  NETWORKING MASTERY TERMINAL        │' },
          { type: 'output', text: '└─────────────────────────────────────┘' },
          { type: 'output', text: '' },
          { type: 'output', text: 'An interactive learning platform for' },
          { type: 'output', text: 'networking enthusiasts and professionals.' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Features:' },
          { type: 'output', text: '  • Interactive terminal interface' },
          { type: 'output', text: '  • Multiple aesthetic themes' },
          { type: 'output', text: '  • Real-time command execution' },
          { type: 'output', text: '  • Customizable appearance' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Built with passion for networking ❤️' }
        ])
        break
      case 'secret':
        const secrets = [
          ['🎮 KONAMI CODE DETECTED!', 'Achievement Unlocked: Old School Gamer', 'You found the secret command!', '', '↑ ↑ ↓ ↓ ← → ← → B A'],
          ['🔐 ACCESS GRANTED', '', 'Welcome to the inner circle.', 'You are now part of the 1% who explore.', '', 'Keep being curious! 🚀'],
          ['👾 EASTER EGG FOUND!', '', 'Congratulations, explorer!', 'The best admins always check the docs.', '', 'Here\'s a virtual cookie: 🍪'],
          ['🌟 SECRET UNLOCKED', '', 'You\'ve discovered the hidden command!', 'May your packets always find their destination', 'and your latency remain low.', '', '- The Networking Mastery Team']
        ]
        const randomSecret = secrets[Math.floor(Math.random() * secrets.length)]
        setLines(prev => [...prev, ...randomSecret.map(text => ({ type: 'output' as const, text }))])
        break
      case 'clear':
        setLines([])
        break
      case 'end':
        if (mini && onEndWebsite) {
          setLines(prev => [...prev, { type: 'output', text: 'Returning to terminal...' }])
          setTimeout(() => onEndWebsite(), 500)
        } else if (!mini) {
          setLines(prev => [...prev, { type: 'error', text: 'Command only available in website mode' }])
        }
        break
      default:
        setLines(prev => [
          ...prev,
          { type: 'error', text: `Command not found: ${trimmedCmd}` },
          { type: 'output', text: 'Type "help" for available commands' }
        ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleCommand(currentInput)
      setCurrentInput('')
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  return (
    <>
      <ThemeBrowser
        isOpen={showThemeBrowser}
        onClose={() => setShowThemeBrowser(false)}
        currentTheme={currentTheme}
        onThemeChange={(theme) => {
          onThemeChange(theme)
          setShowThemeBrowser(false)
          setLines(prev => [
            ...prev,
            { type: 'output', text: `Theme set to: ${theme}` }
          ])
        }}
      />

      {showNetworkSimulator && (
        <NetworkSimulator onClose={() => setShowNetworkSimulator(false)} />
      )}
      
      <Card 
        className={`glassmorphic relative overflow-hidden transition-all duration-300 ${className}`}
        style={{
          backgroundColor: isMinimized ? `oklch(0.15 0.02 240 / 25%)` : `oklch(0.15 0.02 240 / ${opacity}%)`,
          backdropFilter: isMinimized ? `blur(10px)` : `blur(${blur}px)`,
        }}
        onMouseEnter={() => setTrafficLightHover(true)}
        onMouseLeave={() => setTrafficLightHover(false)}
      >
      <div className="absolute top-0 left-0 right-0 h-8 bg-card/30 flex items-center px-4 gap-2 border-b border-border/30">
        <div className={`flex gap-2 transition-opacity duration-150 ${trafficLightHover ? 'opacity-100' : 'opacity-40'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all group relative"
            title="Close"
          >
            <X 
              size={8} 
              weight="bold" 
              className="absolute inset-0 m-auto text-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize?.()
            }}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all group relative"
            title="Minimize"
          >
            <Minus 
              size={8} 
              weight="bold" 
              className="absolute inset-0 m-auto text-[#8B6914] opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize?.()
            }}
            className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all group relative"
            title="Maximize"
          >
            <Square 
              size={8} 
              weight="bold" 
              className="absolute inset-0 m-auto text-[#0D5018] opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
          terminal
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Sliders size={16} />
        </button>
      </div>

      {showSettings && (
        <div className="absolute top-8 right-0 w-64 bg-card/95 backdrop-blur-xl border border-border/50 rounded-bl-lg p-4 z-10 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-2 block">
                Opacity: {opacity}%
              </label>
              <Slider
                value={[opacity]}
                onValueChange={(val) => setOpacity(val[0])}
                min={30}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            <Separator />
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-2 block">
                Blur: {blur}px
              </label>
              <Slider
                value={[blur]}
                onValueChange={(val) => setBlur(val[0])}
                min={0}
                max={40}
                step={2}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div 
        ref={terminalRef}
        className={`font-mono text-sm p-6 pt-12 overflow-y-auto transition-all duration-300 ${mini ? 'h-64' : 'h-96'} ${isMinimized ? 'opacity-40' : 'opacity-100'}`}
        onClick={() => {
          if (isMinimized && onMinimize) {
            onMinimize()
          } else {
            inputRef.current?.focus()
          }
        }}
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`mb-1 ${
              line.type === 'input'
                ? 'text-accent font-bold'
                : line.type === 'error'
                ? 'text-destructive'
                : 'text-primary'
            }`}
          >
            {line.text}
          </div>
        ))}

        {isTyping && (
          <span className="text-primary terminal-cursor">█</span>
        )}

        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-accent mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-accent font-bold caret-accent"
              autoFocus
              spellCheck={false}
            />
            {showCursor && <span className="text-accent terminal-cursor">█</span>}
          </form>
        )}
      </div>
    </Card>
    </>
  )
}
