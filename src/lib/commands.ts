export interface CommandResult {
  output: string[];
  error?: boolean;
}

export const HELP_TEXT = [
  'Available commands:',
  '  help     - Show this help message',
  '  start    - Launch the full website view',
  '  themes   - Browse and select themes visually',
  '  network  - Open network packet simulator',
  '  clear    - Clear the terminal screen',
  '  about    - Learn about this project',
  '  random   - Apply a random theme',
  '',
  'Theme commands (or use "themes" for visual browser):',
  '  cyan, default, matrix, amber, purple, sunset',
  '  ocean, neon, forest, rose, gold, ice',
  '  synthwave, cyberpunk, xmas',
];

export const ABOUT_TEXT = [
  'Terminal Interface v1.0',
  '',
  'A retro-inspired terminal interface that bridges',
  'classic command-line aesthetics with modern web design.',
  '',
  'Built with React, TypeScript, and Tailwind CSS.',
];

export const WELCOME_TEXT = [
  'Welcome to the Terminal Interface',
  '',
  'Type "help" for available commands.',
  'Type "start" to launch the full website.',
  'Type "themes" to browse visual theme options.',
];

const THEME_NAMES = [
  'cyan', 'default', 'matrix', 'amber', 'purple', 'sunset',
  'ocean', 'neon', 'forest', 'rose', 'gold', 'ice',
  'synthwave', 'cyberpunk', 'xmas'
];

export function processCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase();

  if (!cmd) {
    return { output: [] };
  }

  switch (cmd) {
    case 'help':
      return { output: HELP_TEXT };
    
    case 'about':
      return { output: ABOUT_TEXT };
    
    case 'clear':
      return { output: ['__CLEAR__'] };
    
    case 'start':
      return { output: ['Launching website...', '__START__'] };
    
    case 'end':
      return { output: ['Returning to terminal...', '__END__'] };
    
    case 'themes':
      return { output: ['__THEMES__'] };
    
    case 'network':
      return { output: ['__NETWORK__'] };
    
    case 'random':
      const randomTheme = THEME_NAMES[Math.floor(Math.random() * THEME_NAMES.length)];
      return { output: [`Randomly selected: ${randomTheme}`, `__THEME_${randomTheme.toUpperCase()}__`] };
    
    case 'cyan':
    case 'default':
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
    case 'xmas':
      return { output: [`Theme changed to ${cmd}`, `__THEME_${cmd.toUpperCase()}__`] };
    
    default:
      return {
        output: [`Command not found: ${input}`, 'Type "help" for available commands.'],
        error: true,
      };
  }
}
