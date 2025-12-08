export interface Theme {
  name: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    secondary: string;
    border: string;
    input: string;
    ring: string;
    muted: string;
    mutedForeground: string;
  };
}

export const themes: Record<string, Theme> = {
  cyan: {
    name: 'cyan',
    label: 'Cyan',
    colors: {
      background: 'oklch(0.15 0.02 240)',
      foreground: 'oklch(0.65 0.15 195)',
      card: 'oklch(0.18 0.03 240)',
      cardForeground: 'oklch(0.65 0.15 195)',
      primary: 'oklch(0.65 0.15 195)',
      primaryForeground: 'oklch(0.15 0.02 240)',
      accent: 'oklch(0.75 0.18 195)',
      accentForeground: 'oklch(0.15 0.02 240)',
      secondary: 'oklch(0.25 0.03 240)',
      border: 'oklch(0.35 0.08 195)',
      input: 'oklch(0.35 0.08 195)',
      ring: 'oklch(0.75 0.18 195)',
      muted: 'oklch(0.25 0.03 240)',
      mutedForeground: 'oklch(0.45 0.01 240)',
    },
  },
  default: {
    name: 'default',
    label: 'Default',
    colors: {
      background: 'oklch(0.10 0 0)',
      foreground: 'oklch(0.60 0.18 145)',
      card: 'oklch(0.13 0 0)',
      cardForeground: 'oklch(0.60 0.18 145)',
      primary: 'oklch(0.60 0.18 145)',
      primaryForeground: 'oklch(0.10 0 0)',
      accent: 'oklch(0.70 0.20 145)',
      accentForeground: 'oklch(0.10 0 0)',
      secondary: 'oklch(0.20 0 0)',
      border: 'oklch(0.30 0.10 145)',
      input: 'oklch(0.30 0.10 145)',
      ring: 'oklch(0.70 0.20 145)',
      muted: 'oklch(0.20 0 0)',
      mutedForeground: 'oklch(0.45 0.08 145)',
    },
  },
  matrix: {
    name: 'matrix',
    label: 'Matrix',
    colors: {
      background: 'oklch(0.08 0.02 145)',
      foreground: 'oklch(0.60 0.18 145)',
      card: 'oklch(0.11 0.03 145)',
      cardForeground: 'oklch(0.60 0.18 145)',
      primary: 'oklch(0.60 0.18 145)',
      primaryForeground: 'oklch(0.08 0.02 145)',
      accent: 'oklch(0.70 0.20 145)',
      accentForeground: 'oklch(0.08 0.02 145)',
      secondary: 'oklch(0.18 0.03 145)',
      border: 'oklch(0.35 0.12 145)',
      input: 'oklch(0.35 0.12 145)',
      ring: 'oklch(0.70 0.20 145)',
      muted: 'oklch(0.18 0.03 145)',
      mutedForeground: 'oklch(0.40 0.10 145)',
    },
  },
  amber: {
    name: 'amber',
    label: 'Amber',
    colors: {
      background: 'oklch(0.12 0.03 75)',
      foreground: 'oklch(0.70 0.15 75)',
      card: 'oklch(0.15 0.04 75)',
      cardForeground: 'oklch(0.70 0.15 75)',
      primary: 'oklch(0.70 0.15 75)',
      primaryForeground: 'oklch(0.12 0.03 75)',
      accent: 'oklch(0.80 0.18 75)',
      accentForeground: 'oklch(0.12 0.03 75)',
      secondary: 'oklch(0.22 0.05 75)',
      border: 'oklch(0.40 0.10 75)',
      input: 'oklch(0.40 0.10 75)',
      ring: 'oklch(0.80 0.18 75)',
      muted: 'oklch(0.22 0.05 75)',
      mutedForeground: 'oklch(0.50 0.08 75)',
    },
  },
  purple: {
    name: 'purple',
    label: 'Purple',
    colors: {
      background: 'oklch(0.12 0.04 290)',
      foreground: 'oklch(0.65 0.20 290)',
      card: 'oklch(0.15 0.05 290)',
      cardForeground: 'oklch(0.65 0.20 290)',
      primary: 'oklch(0.65 0.20 290)',
      primaryForeground: 'oklch(0.12 0.04 290)',
      accent: 'oklch(0.75 0.22 290)',
      accentForeground: 'oklch(0.12 0.04 290)',
      secondary: 'oklch(0.22 0.06 290)',
      border: 'oklch(0.40 0.14 290)',
      input: 'oklch(0.40 0.14 290)',
      ring: 'oklch(0.75 0.22 290)',
      muted: 'oklch(0.22 0.06 290)',
      mutedForeground: 'oklch(0.48 0.12 290)',
    },
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset',
    colors: {
      background: 'oklch(0.14 0.05 45)',
      foreground: 'oklch(0.70 0.20 45)',
      card: 'oklch(0.17 0.06 45)',
      cardForeground: 'oklch(0.70 0.20 45)',
      primary: 'oklch(0.70 0.20 45)',
      primaryForeground: 'oklch(0.14 0.05 45)',
      accent: 'oklch(0.75 0.22 25)',
      accentForeground: 'oklch(0.14 0.05 45)',
      secondary: 'oklch(0.30 0.08 45)',
      border: 'oklch(0.45 0.14 45)',
      input: 'oklch(0.45 0.14 45)',
      ring: 'oklch(0.75 0.22 25)',
      muted: 'oklch(0.30 0.08 45)',
      mutedForeground: 'oklch(0.52 0.12 45)',
    },
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    colors: {
      background: 'oklch(0.12 0.04 230)',
      foreground: 'oklch(0.60 0.16 230)',
      card: 'oklch(0.15 0.05 230)',
      cardForeground: 'oklch(0.60 0.16 230)',
      primary: 'oklch(0.60 0.16 230)',
      primaryForeground: 'oklch(0.12 0.04 230)',
      accent: 'oklch(0.70 0.18 210)',
      accentForeground: 'oklch(0.12 0.04 230)',
      secondary: 'oklch(0.28 0.05 230)',
      border: 'oklch(0.38 0.12 230)',
      input: 'oklch(0.38 0.12 230)',
      ring: 'oklch(0.70 0.18 210)',
      muted: 'oklch(0.28 0.05 230)',
      mutedForeground: 'oklch(0.45 0.10 230)',
    },
  },
  neon: {
    name: 'neon',
    label: 'Neon',
    colors: {
      background: 'oklch(0.10 0.05 330)',
      foreground: 'oklch(0.75 0.25 330)',
      card: 'oklch(0.13 0.06 330)',
      cardForeground: 'oklch(0.75 0.25 330)',
      primary: 'oklch(0.75 0.25 330)',
      primaryForeground: 'oklch(0.10 0.05 330)',
      accent: 'oklch(0.70 0.24 180)',
      accentForeground: 'oklch(0.10 0.05 330)',
      secondary: 'oklch(0.30 0.08 330)',
      border: 'oklch(0.45 0.18 330)',
      input: 'oklch(0.45 0.18 330)',
      ring: 'oklch(0.70 0.24 180)',
      muted: 'oklch(0.30 0.08 330)',
      mutedForeground: 'oklch(0.50 0.15 330)',
    },
  },
  forest: {
    name: 'forest',
    label: 'Forest',
    colors: {
      background: 'oklch(0.10 0.03 160)',
      foreground: 'oklch(0.58 0.14 160)',
      card: 'oklch(0.13 0.04 160)',
      cardForeground: 'oklch(0.58 0.14 160)',
      primary: 'oklch(0.58 0.14 160)',
      primaryForeground: 'oklch(0.10 0.03 160)',
      accent: 'oklch(0.68 0.16 140)',
      accentForeground: 'oklch(0.10 0.03 160)',
      secondary: 'oklch(0.28 0.06 160)',
      border: 'oklch(0.38 0.10 160)',
      input: 'oklch(0.38 0.10 160)',
      ring: 'oklch(0.68 0.16 140)',
      muted: 'oklch(0.28 0.06 160)',
      mutedForeground: 'oklch(0.42 0.08 160)',
    },
  },
  rose: {
    name: 'rose',
    label: 'Rose',
    colors: {
      background: 'oklch(0.12 0.04 350)',
      foreground: 'oklch(0.68 0.20 350)',
      card: 'oklch(0.15 0.05 350)',
      cardForeground: 'oklch(0.68 0.20 350)',
      primary: 'oklch(0.68 0.20 350)',
      primaryForeground: 'oklch(0.12 0.04 350)',
      accent: 'oklch(0.75 0.22 10)',
      accentForeground: 'oklch(0.12 0.04 350)',
      secondary: 'oklch(0.30 0.07 350)',
      border: 'oklch(0.42 0.14 350)',
      input: 'oklch(0.42 0.14 350)',
      ring: 'oklch(0.75 0.22 10)',
      muted: 'oklch(0.30 0.07 350)',
      mutedForeground: 'oklch(0.48 0.12 350)',
    },
  },
  gold: {
    name: 'gold',
    label: 'Gold',
    colors: {
      background: 'oklch(0.14 0.03 95)',
      foreground: 'oklch(0.72 0.13 95)',
      card: 'oklch(0.17 0.04 95)',
      cardForeground: 'oklch(0.72 0.13 95)',
      primary: 'oklch(0.72 0.13 95)',
      primaryForeground: 'oklch(0.14 0.03 95)',
      accent: 'oklch(0.78 0.15 75)',
      accentForeground: 'oklch(0.14 0.03 95)',
      secondary: 'oklch(0.32 0.05 95)',
      border: 'oklch(0.48 0.09 95)',
      input: 'oklch(0.48 0.09 95)',
      ring: 'oklch(0.78 0.15 75)',
      muted: 'oklch(0.32 0.05 95)',
      mutedForeground: 'oklch(0.52 0.08 95)',
    },
  },
  ice: {
    name: 'ice',
    label: 'Ice',
    colors: {
      background: 'oklch(0.12 0.02 250)',
      foreground: 'oklch(0.70 0.12 250)',
      card: 'oklch(0.15 0.03 250)',
      cardForeground: 'oklch(0.70 0.12 250)',
      primary: 'oklch(0.70 0.12 250)',
      primaryForeground: 'oklch(0.12 0.02 250)',
      accent: 'oklch(0.80 0.14 200)',
      accentForeground: 'oklch(0.12 0.02 250)',
      secondary: 'oklch(0.30 0.04 250)',
      border: 'oklch(0.45 0.08 250)',
      input: 'oklch(0.45 0.08 250)',
      ring: 'oklch(0.80 0.14 200)',
      muted: 'oklch(0.30 0.04 250)',
      mutedForeground: 'oklch(0.50 0.07 250)',
    },
  },
  synthwave: {
    name: 'synthwave',
    label: 'Synthwave',
    colors: {
      background: 'oklch(0.12 0.05 300)',
      foreground: 'oklch(0.72 0.26 330)',
      card: 'oklch(0.15 0.06 300)',
      cardForeground: 'oklch(0.72 0.26 330)',
      primary: 'oklch(0.72 0.26 330)',
      primaryForeground: 'oklch(0.12 0.05 300)',
      accent: 'oklch(0.70 0.25 260)',
      accentForeground: 'oklch(0.12 0.05 300)',
      secondary: 'oklch(0.25 0.08 300)',
      border: 'oklch(0.35 0.15 330)',
      input: 'oklch(0.35 0.15 330)',
      ring: 'oklch(0.70 0.25 260)',
      muted: 'oklch(0.25 0.08 300)',
      mutedForeground: 'oklch(0.48 0.18 330)',
    },
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    colors: {
      background: 'oklch(0.08 0.04 180)',
      foreground: 'oklch(0.75 0.28 180)',
      card: 'oklch(0.11 0.05 180)',
      cardForeground: 'oklch(0.75 0.28 180)',
      primary: 'oklch(0.75 0.28 180)',
      primaryForeground: 'oklch(0.08 0.04 180)',
      accent: 'oklch(0.78 0.26 330)',
      accentForeground: 'oklch(0.08 0.04 180)',
      secondary: 'oklch(0.22 0.06 180)',
      border: 'oklch(0.40 0.18 180)',
      input: 'oklch(0.40 0.18 180)',
      ring: 'oklch(0.78 0.26 330)',
      muted: 'oklch(0.22 0.06 180)',
      mutedForeground: 'oklch(0.52 0.20 180)',
    },
  },
  xmas: {
    name: 'xmas',
    label: 'Christmas',
    colors: {
      background: 'oklch(0.08 0.02 290)',
      foreground: 'oklch(0.55 0.22 25)',
      card: 'oklch(0.11 0.03 290)',
      cardForeground: 'oklch(0.55 0.22 25)',
      primary: 'oklch(0.55 0.22 25)',
      primaryForeground: 'oklch(0.95 0 0)',
      accent: 'oklch(0.75 0.15 85)',
      accentForeground: 'oklch(0.08 0.02 290)',
      secondary: 'oklch(0.45 0.12 150)',
      border: 'oklch(0.45 0.12 150)',
      input: 'oklch(0.45 0.12 150)',
      ring: 'oklch(0.75 0.15 85)',
      muted: 'oklch(0.20 0.04 290)',
      mutedForeground: 'oklch(0.45 0.12 150)',
    },
  },
};

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--background', theme.colors.background);
  root.style.setProperty('--foreground', theme.colors.foreground);
  root.style.setProperty('--card', theme.colors.card);
  root.style.setProperty('--card-foreground', theme.colors.cardForeground);
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--primary-foreground', theme.colors.primaryForeground);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--accent-foreground', theme.colors.accentForeground);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--border', theme.colors.border);
  root.style.setProperty('--input', theme.colors.input);
  root.style.setProperty('--ring', theme.colors.ring);
  root.style.setProperty('--muted', theme.colors.muted);
  root.style.setProperty('--muted-foreground', theme.colors.mutedForeground);
}
