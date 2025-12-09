import { useState, useEffect, useRef } from 'react'
import { X, Minus, Square, Sliders, Eye, CaretRight } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useKV } from '@github/spark/hooks'
import { themes } from '@/lib/themes'

interface TerminalProps {
  onCommand: (command: string) => void
  opacity?: number
  blur?: number
  mini?: boolean
}

interface TerminalLine {
  type: 'output' | 'input' | 'error'
  text: string
}

export function Terminal({ 
  onCommand,
  opacity: initialOpacity = 90,
  blur: initialBlur = 20,
  mini = false
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [opacity, setOpacity] = useKV<number>('terminal-opacity', initialOpacity)
  const [blur, setBlur] = useKV<number>('terminal-blur', initialBlur)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [trafficLightHover, setTrafficLightHover] = useState(false)
  const [commandHistory, setCommandHistory] = useKV<string[]>('terminal-history', [])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentTheme] = useKV<string>('terminal-theme', 'cyan')
  const [lastLogin, setLastLogin] = useKV<string>('last-login', '')
  const [lastJokeIndex, setLastJokeIndex] = useKV<number>('last-joke-index', -1)
  const [lastFortuneIndex, setLastFortuneIndex] = useKV<number>('last-fortune-index', -1)
  const [lastSecretIndex, setLastSecretIndex] = useKV<number>('last-secret-index', -1)
  
  const theme = themes[currentTheme || 'cyan']

  useEffect(() => {
    const now = new Date()
    const currentLoginTime = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric'
    })
    
    const welcomeText = mini ? 'Mini Terminal' : theme.welcomeMessage
    const helpText = mini ? 'Type "help" for commands or "end" to return' : theme.helpPrompt
    
    const initialLines: TerminalLine[] = []
    
    if (lastLogin) {
      initialLines.push({ type: 'output', text: `Last login: ${lastLogin}` })
      initialLines.push({ type: 'output', text: '' })
    }
    
    initialLines.push({ type: 'output', text: welcomeText })
    initialLines.push({ type: 'output', text: '' })
    initialLines.push({ type: 'output', text: helpText })
    
    setLines(initialLines)
    
    setLastLogin(currentLoginTime)
  }, [mini, theme.welcomeMessage, theme.helpPrompt])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    setLines(prev => [...prev, { type: 'input', text: `$ ${cmd}` }])

    if (trimmedCmd === '') return

    switch (trimmedCmd) {
      case 'help':
        const helpLines = [
          { type: 'output' as const, text: 'Available commands:' },
          { type: 'output' as const, text: '  start        - Launch the full website' },
          { type: 'output' as const, text: '  network      - Open network packet simulator' },
          { type: 'output' as const, text: '  themes       - View available color themes' },
          { type: 'output' as const, text: '  random       - Apply a random theme' },
          { type: 'output' as const, text: '  highcontrast - Toggle high contrast mode' },
          { type: 'output' as const, text: '  xmas         - Enable festive Christmas theme' },
          { type: 'output' as const, text: '  version      - Display version information' },
          { type: 'output' as const, text: '  whoami       - Display current user information' },
          { type: 'output' as const, text: '  date         - Show current date and time' },
          { type: 'output' as const, text: '  fortune      - Get a random fortune' },
          { type: 'output' as const, text: '  joke         - Hear a networking joke' },
          { type: 'output' as const, text: '  status       - Check system status' },
          { type: 'output' as const, text: '  about        - Learn about this terminal' },
          { type: 'output' as const, text: '  history      - View command history' },
          { type: 'output' as const, text: '  secret       - ???' },
          { type: 'output' as const, text: '  clear        - Clear the terminal' },
          { type: 'output' as const, text: '  help         - Show this help message' }
        ]
        if (mini) {
          helpLines.splice(1, 0, { type: 'output' as const, text: '  end      - Return to main terminal' })
        }
        setLines(prev => [...prev, ...helpLines])
        break
      case 'start':
        setLines(prev => [...prev, { type: 'output', text: 'Launching website...' }])
        setTimeout(() => onCommand('__START__'), 500)
        break
      case 'network':
        setLines(prev => [...prev, { type: 'output', text: 'Initializing network simulator...' }])
        setTimeout(() => onCommand('__NETWORK__'), 300)
        break
      case 'themes':
        setLines(prev => [...prev, { type: 'output', text: 'Opening theme browser...' }])
        setTimeout(() => onCommand('__THEMES__'), 300)
        break
      case 'random':
        const themeKeys = Object.keys(themes)
        const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)]
        onCommand(`__THEME_${randomTheme.toUpperCase()}`)
        setLines(prev => [
          ...prev,
          { type: 'output', text: '🎲 Rolling the dice...' },
          { type: 'output', text: `Theme randomly set to: ${themes[randomTheme].label}` }
        ])
        break
      case 'default':
      case 'cyan':
      case 'matrix':
      case 'amber':
      case 'purple':
      case 'sunset':
      case 'ocean':
      case 'neon':
      case 'forest':
      case 'rose':
      case 'gold':
      case 'ice':
      case 'synthwave':
      case 'cyberpunk':
      case 'highcontrast':
        onCommand(`__THEME_${trimmedCmd.toUpperCase()}`)
        setLines(prev => [...prev, { type: 'output', text: `Theme set to: ${trimmedCmd.charAt(0).toUpperCase() + trimmedCmd.slice(1)}` }])
        break
      case 'xmas':
        onCommand('__THEME_XMAS')
        setLines(prev => [
          ...prev,
          { type: 'output', text: '🎄 Ho ho ho! Merry Christmas! 🎅' },
          { type: 'output', text: 'Festive theme activated!' }
        ])
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
        let fortuneIndex = Math.floor(Math.random() * fortunes.length)
        if (fortunes.length > 1 && fortuneIndex === lastFortuneIndex) {
          fortuneIndex = (fortuneIndex + 1) % fortunes.length
        }
        setLastFortuneIndex(fortuneIndex)
        const randomFortune = fortunes[fortuneIndex]
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
          'What\'s a network\'s favorite type of music?\nHeavy packet metal!',
          'Why did the TCP packet go to therapy?\nIt had too many acknowledgment issues!',
          'What\'s a hacker\'s favorite season?\nPhishing season!',
          'Why do network cables make terrible comedians?\nTheir jokes never land, they just get terminated!',
          'How do you comfort a JavaScript bug?\nYou console it!',
          'Why was the WiFi signal feeling down?\nIt was having connection issues with everyone!',
          'What did the DNS say to the HTTP?\n"I\'ll look you up sometime!"',
          'Why did the network engineer bring a ladder to work?\nTo reach the cloud!',
          'What do you call a router that sings?\nA broadcast!',
          'Why don\'t routers ever lie?\nBecause they always tell the truth tables!',
          'What\'s an IPv6 address\'s favorite game?\nHide and seek - nobody can find them!',
          'Why was the network switch so popular?\nIt knew how to make all the right connections!',
          'What did the Ethernet cable say to the fiber optic?\n"You\'re so transparent!"',
          'Why did the ping command fail at comedy?\nIts timing was off!',
          'How does a network say goodbye?\n"Socket to you later!"',
          'Why did the VLAN throw a party?\nTo separate the traffic from the work!',
          'What\'s a DDoS attack\'s favorite party trick?\nBringing the house down!',
          'Why was the MAC address so unique?\nIt refused to be broadcast!',
          'What did the load balancer say at the buffet?\n"Let me distribute these evenly!"',
          'Why don\'t packets ever get lost in the mail?\nThey have excellent routing!',
          'What\'s a network engineer\'s favorite exercise?\nPacket squats!',
          'Why did the network go to school?\nTo improve its class of service!',
          'What do you call a lazy network?\nA low-throughput individual!'
        ]
        let jokeIndex = Math.floor(Math.random() * jokes.length)
        if (jokes.length > 1 && jokeIndex === lastJokeIndex) {
          jokeIndex = (jokeIndex + 1) % jokes.length
        }
        setLastJokeIndex(jokeIndex)
        const randomJoke = jokes[jokeIndex]
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
        let secretIndex = Math.floor(Math.random() * secrets.length)
        if (secrets.length > 1 && secretIndex === lastSecretIndex) {
          secretIndex = (secretIndex + 1) % secrets.length
        }
        setLastSecretIndex(secretIndex)
        const randomSecret = secrets[secretIndex]
        setLines(prev => [...prev, ...randomSecret.map(text => ({ type: 'output' as const, text }))])
        break
      case 'clear':
        setLines([])
        break
      case 'history':
        if (!commandHistory || commandHistory.length === 0) {
          setLines(prev => [...prev, { type: 'output', text: 'No command history yet.' }])
        } else {
          const historyLines = [
            { type: 'output' as const, text: 'Command History:' },
            { type: 'output' as const, text: '═══════════════════════════════════' }
          ]
          commandHistory.forEach((cmd, idx) => {
            historyLines.push({ type: 'output' as const, text: `  ${idx + 1}. ${cmd}` })
          })
          historyLines.push({ type: 'output' as const, text: '' })
          historyLines.push({ type: 'output' as const, text: 'Use ↑/↓ arrows to navigate history' })
          setLines(prev => [...prev, ...historyLines])
        }
        break
      case 'end':
        if (mini) {
          setLines(prev => [...prev, { type: 'output', text: 'Returning to terminal...' }])
          setTimeout(() => onCommand('__END__'), 500)
        } else {
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
      const trimmedInput = currentInput.trim()
      handleCommand(trimmedInput)
      
      setCommandHistory((prevHistory) => {
        const history = prevHistory || []
        const newHistory = [...history, trimmedInput]
        return newHistory.slice(-50)
      })
      
      setCurrentInput('')
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!commandHistory || commandHistory.length === 0) return
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1)
      
      setHistoryIndex(newIndex)
      setCurrentInput(commandHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!commandHistory || commandHistory.length === 0) return
      
      if (historyIndex === -1) return
      
      const newIndex = historyIndex + 1
      
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setCurrentInput('')
      } else {
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(100,200,255,0.08)] ${mini ? 'w-96 max-w-[calc(100vw-3rem)]' : 'w-full max-w-4xl'}`}
      style={{
        backgroundColor: `oklch(0.15 0.02 240 / ${opacity ?? initialOpacity}%)`,
        backdropFilter: `blur(${blur ?? initialBlur}px)`,
      }}
      onMouseEnter={() => setTrafficLightHover(true)}
      onMouseLeave={() => setTrafficLightHover(false)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-8 bg-card/30 flex items-center px-4 gap-2 border-b border-border/30">
        <div className={`flex gap-2 transition-opacity duration-150 ${trafficLightHover ? 'opacity-100' : 'opacity-40'}`}>
          <button
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
        {!mini && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Sliders size={16} />
          </button>
        )}
      </div>

      {showSettings && !mini && (
        <div className="absolute top-8 right-0 w-64 bg-card/95 backdrop-blur-xl border border-border/50 rounded-bl-lg p-4 z-10 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-3 block">
                Accessibility
              </label>
              <Button
                onClick={() => {
                  if (currentTheme === 'highcontrast') {
                    onCommand('__THEME_CYAN')
                  } else {
                    onCommand('__THEME_HIGHCONTRAST')
                  }
                  setShowSettings(false)
                }}
                variant={currentTheme === 'highcontrast' ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start gap-2"
              >
                <Eye size={16} weight="bold" />
                {currentTheme === 'highcontrast' ? 'Disable' : 'Enable'} High Contrast
              </Button>
            </div>
            <Separator />
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-2 block">
                Opacity: {opacity ?? initialOpacity}%
              </label>
              <Slider
                value={[opacity ?? initialOpacity]}
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
                Blur: {blur ?? initialBlur}px
              </label>
              <Slider
                value={[blur ?? initialBlur]}
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
        className={`relative z-10 terminal-font text-sm p-6 pt-12 overflow-y-auto transition-all duration-300 ${mini ? 'h-64' : 'h-96'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`mb-1 transition-all duration-300 hover:translate-x-1 hover:brightness-110 ${
              line.type === 'input'
                ? 'text-accent font-bold hover:drop-shadow-[0_0_4px_rgba(100,200,255,0.4)]'
                : line.type === 'error'
                ? 'text-destructive hover:drop-shadow-[0_0_4px_rgba(255,100,100,0.4)]'
                : 'text-primary hover:drop-shadow-[0_0_4px_rgba(100,200,255,0.25)]'
            }`}
          >
            {line.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center group/input">
          <span className="text-accent mr-2 transition-all duration-300 group-hover/input:drop-shadow-[0_0_4px_rgba(100,200,255,0.4)] pulsate flex items-center">
            <CaretRight size={16} weight="bold" />
            <span>_</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-accent font-bold caret-accent transition-all duration-300 hover:drop-shadow-[0_0_4px_rgba(100,200,255,0.4)]"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </Card>
  )
}