# Planning Guide

A retro-inspired terminal interface web application that transitions between a command-line experience and a modern website, offering theme customization and interactive elements with glassmorphic design aesthetics.

**Experience Qualities**:
1. **Nostalgic** - Evokes the feeling of classic command-line interfaces with authentic terminal interactions and typing animations
2. **Polished** - Features smooth transitions, glassmorphic effects, and refined UI details like functional traffic lights and hover effects
3. **Playful** - Includes festive themes, interactive commands, and whimsical elements like bouncing scroll indicators

**Complexity Level**: Complex Application (advanced functionality with multiple views)
The app manages multiple views (terminal, website, network simulator), advanced canvas animations with pathfinding algorithms, theme switching, customization settings, command parsing with persistent state, and real-time simulation with interactive controls.

## Essential Features

**Terminal Interface**
- Functionality: Displays an interactive command-line interface with typing animations and command processing
- Purpose: Creates an engaging entry point and provides a unique navigation mechanism
- Trigger: Default view on application load
- Progression: App loads → Welcome message types out → Cursor blinks → User types commands → Commands execute → State changes
- Success criteria: Smooth typing animation, responsive command input, accurate command parsing

**Theme System**
- Functionality: Allows users to switch between predefined color schemes and special themes (including Christmas) with an interactive visual browser
- Purpose: Provides visual customization and seasonal engagement through an immersive theme preview experience
- Trigger: User types 'themes' command or specific theme name
- Progression: Command entered → Theme browser modal opens → Animated preview cards display with color swatches → User hovers/clicks theme → Live preview shows glowing animations → Theme selected → Colors/styles update instantly → Preference saved
- Success criteria: Smooth color transitions, animated theme previews with glow effects, persistent theme selection across sessions, intuitive visual browsing

Available themes:
1. **Cyan** (default) - Classic terminal blue aesthetic
2. **Default** - Classic black & green terminal
3. **Matrix** - Iconic green terminal inspired by The Matrix
4. **Amber** - Warm retro amber terminal glow
5. **Purple** - Deep purple haze with rich tones
6. **Sunset** - Orange and red warmth reminiscent of dusk
7. **Ocean** - Deep blue waters with aquatic vibes
8. **Neon** - Electric pink and cyan cyberpunk style
9. **Forest** - Natural green tones with earthy feel
10. **Rose** - Soft pink elegance with romantic touch
11. **Gold** - Luxurious golden glow with premium feel
12. **Ice** - Cool arctic blue with frosty aesthetic
13. **Synthwave** - Retro 80s neon vibes with pink and purple
14. **Cyberpunk** - Futuristic neon streets with cyan and magenta
15. **Xmas** (special) - Festive Christmas theme with red, green, and gold

**Terminal Appearance Controls**
- Functionality: Adjustable opacity, blur, and transparency controls via UI toggle
- Purpose: Allows users to customize terminal window appearance for readability and aesthetics
- Trigger: User interacts with settings controls on terminal window
- Progression: User clicks settings icon → Controls appear → Sliders adjusted → Visual effect updates in real-time → Settings saved to localStorage
- Success criteria: Real-time visual feedback, smooth adjustments, persistent settings

**Traffic Light Controls**
- Functionality: macOS-style window controls (close, minimize, maximize)
- Purpose: Adds authentic terminal window aesthetics and provides intuitive controls
- Trigger: Hover over terminal window header
- Progression: Mouse hovers → Traffic lights appear/brighten → Click red → Terminal closes/minimizes → Click yellow → Minimize animation → Click green → Maximize toggle
- Success criteria: Authentic appearance, smooth hover effects, functional interactions

**Full Website View**
- Functionality: Complete website with navigation, hero sections, scroll animations, and mini-terminal FAB
- Purpose: Demonstrates full site capabilities while maintaining terminal aesthetic
- Trigger: User types 'start' command
- Progression: Command entered → Terminal fades out → Website fades in → Scroll indicator bounces → User scrolls/navigates → Can access mini-terminal → Type 'end' to return
- Success criteria: Smooth view transitions, functional navigation, working scroll triggers

**Floating Action Button (FAB) Mini-Terminal**
- Functionality: Compact terminal window accessible from website view
- Purpose: Maintains command-line access while browsing the full site
- Trigger: Click FAB button in website view
- Progression: FAB clicked → Mini-terminal expands → User types commands → Commands execute → Click outside or close to collapse
- Success criteria: Smooth expand/collapse animations, functional command processing

**Theme Preview Browser**
- Functionality: Visual modal displaying all available themes with animated color swatches and live previews
- Purpose: Provides intuitive theme selection through visual exploration rather than memorizing command names
- Trigger: User types 'themes' command in terminal
- Progression: Command entered → Modal fades in with backdrop blur → Theme cards stagger-animate in → Color swatches pulse with glow effects → User hovers (scale animation + gradient sweep) → Click selects theme → Modal fades out → Theme applies
- Success criteria: Smooth modal transitions, staggered card animations, pulsing glow effects on color swatches, responsive hover states, active theme indicator

**Network Packet Simulator**
- Functionality: Real-time interactive visualization of network packet routing across different network topologies (mesh, star, ring)
- Purpose: Educational tool demonstrating how packets traverse networks through routers, switches, and servers with visual feedback
- Trigger: User types 'network' command in terminal
- Progression: Command entered → Simulator modal opens with canvas → Network topology renders with labeled nodes → Packets auto-generate and animate along paths → Users can play/pause, change speed, switch topologies, manually send packets → Statistics track packets sent, delivered, in transit, and dropped → Close returns to terminal
- Success criteria: Smooth 60fps canvas animations, accurate pathfinding algorithms, intuitive topology switching, responsive controls, clear visual distinction between node types (routers, switches, servers, clients) and packet types (TCP, UDP, HTTP, DNS)

**Holiday Music Toggle**
- Functionality: Floating action button that plays synthesized holiday music (Jingle Bells melody) using Web Audio API
- Purpose: Adds festive ambiance and audio feedback during the Christmas theme experience
- Trigger: Automatically appears when Christmas theme is active (xmas)
- Progression: Christmas theme activated → Music button fades in bottom-right → User clicks button → Music starts playing in loop → Button animates with pulsing icon and musical note emoji → Click again to stop → Music stops and button returns to muted state
- Success criteria: Smooth synthesized melody loop, responsive toggle, synchronized visual feedback, automatic cleanup when theme changes

## Edge Case Handling
- **Invalid Commands**: Display "Command not found" message with suggestion to type 'help'
- **Empty Input**: Ignore empty submissions, keep cursor blinking
- **Rapid Theme Changes**: Debounce theme transitions to prevent visual glitches
- **Missing localStorage**: Gracefully fallback to default settings if storage is unavailable
- **Long Content Overflow**: Terminal window scrolls automatically, maintains cursor visibility
- **Mobile Responsiveness**: Terminal scales appropriately, touch-friendly controls
- **Audio Context Suspension**: Resume audio context when user interacts with music button
- **Music Cleanup**: Properly stop and dispose of audio oscillators and context when theme changes or component unmounts
- **Multiple Audio Instances**: Prevent multiple simultaneous audio loops through proper state management

## Design Direction
The design should evoke the aesthetic of classic terminal emulators reimagined with modern glassmorphism effects, creating a bridge between retro computing nostalgia and contemporary web design. It should feel technical yet approachable, mysterious yet inviting.

## Color Selection

**Primary Color**: Deep cyan/terminal green (oklch(0.65 0.15 195)) - Represents classic terminal text, communicates technical proficiency and digital authenticity
**Secondary Colors**: 
  - Dark slate background (oklch(0.15 0.02 240)) - Creates depth and terminal window contrast
  - Muted gray (oklch(0.45 0.01 240)) - For secondary text and UI chrome
**Accent Color**: Bright neon cyan (oklch(0.75 0.18 195)) - Commands, highlights, interactive elements, creates visual excitement
**Foreground/Background Pairings**:
  - Primary cyan text (oklch(0.65 0.15 195)) on dark background (oklch(0.15 0.02 240)) - Ratio 7.2:1 ✓
  - Bright cyan accent (oklch(0.75 0.18 195)) on dark background (oklch(0.15 0.02 240)) - Ratio 9.8:1 ✓
  - White text (oklch(0.95 0 0)) on dark background (oklch(0.15 0.02 240)) - Ratio 12.5:1 ✓
  - Muted text (oklch(0.45 0.01 240)) on dark background (oklch(0.15 0.02 240)) - Ratio 4.1:1 ✓

## Font Selection
The typeface should communicate technical precision and monospace authenticity while remaining highly readable. **JetBrains Mono** for all terminal text provides excellent code aesthetics with ligature support. **Space Grotesk** for website headings and UI chrome creates a technical yet modern contrast.

**Typographic Hierarchy**:
- Terminal Text: JetBrains Mono Regular/16px/1.5 line-height
- Terminal Commands: JetBrains Mono Bold/16px - user input distinction
- Website H1: Space Grotesk Bold/48px/tight tracking
- Website H2 (Section Headers): Space Grotesk SemiBold/36px/tight tracking
- Website Body: Space Grotesk Regular/16px/1.6 line-height
- Mini-Terminal: JetBrains Mono Regular/14px - compact variant

## Animations
Animations should feel purposeful and technically inspired - terminal typing effects that mimic real command-line input, smooth glassmorphic transitions that feel like digital glass shifting, and scroll-triggered reveals that guide users through content with subtle momentum.

**Key Animations**:
- Typing effect: 50ms per character with cursor blink every 530ms
- Theme transitions: 300ms color fade with easing
- Terminal window: 400ms scale and fade with spring physics
- Glow effect: 200ms intensity shift on hover
- FAB expand: 300ms with bounce easing
- Scroll arrow: 1.5s infinite bounce with ease-in-out
- Traffic lights: 150ms opacity fade on hover
- Theme browser modal: 300ms fade-in with backdrop blur, 200ms fade-out
- Theme preview cards: 50ms stagger delay per card with 300ms opacity/translate-y animation
- Color swatch glow: 2s infinite pulse animation cycling box-shadow intensity
- Theme card hover: 200ms scale to 1.02, gradient sweep animation across surface
- Active theme indicator: Scale from 0 to 1 with 200ms spring animation
- Music button: 300ms fade-in/out, pulsing scale animation (1 to 1.2) every 0.5s when playing
- Music note emoji: 1s rotate animation (-10° to 10°) with infinite repeat when playing
- Music button shimmer: 2s linear gradient sweep from left to right when playing

## Component Selection

**Components**: 
- **Card** (Terminal Window): Modified with glassmorphic backdrop-blur, custom border-radius, glow effects via box-shadow
- **Button** (Traffic Lights, FAB): Circular variants with precise sizing, custom colors, hover states
- **Input** (Command Line): Invisible native input with custom text rendering for terminal aesthetic
- **Slider** (Opacity/Blur Controls): Custom styling to match terminal theme
- **Dialog** (Settings Panel): For appearance customization controls
- **Modal** (Theme Browser): Full-screen overlay with backdrop blur, grid layout for theme cards
- **Separator**: Dividers between terminal sections
- Custom Terminal Component: Core command processing and display logic
- Custom ThemePreview Component: Animated card with color swatches, glow effects, hover states
- Custom ThemeBrowser Component: Modal container with grid layout and staggered animations

**Customizations**:
- Terminal Window: Glassmorphic card with backdrop-filter blur(20px), semi-transparent dark background
- Traffic Lights: Absolute positioned circles (12px diameter) with gradients mimicking macOS appearance
- Glow Effect: Multi-layered box-shadow with cyan/accent color, intensity increases on hover
- Command Prompt: Custom span with blinking animation using CSS keyframes
- FAB: Fixed position bottom-right, circular with icon, smooth expansion to mini-terminal
- Theme Browser Modal: Full-screen overlay with bg-background/80 backdrop-blur-md, centered card container
- Theme Preview Cards: Glassmorphic cards with border transitions, color swatch grid, pulsing glow animations
- Color Swatches: Rounded rectangles displaying theme colors with animated box-shadow pulsing
- Active Theme Badge: Circular check icon with scale animation and primary color background

**States**:
- Terminal Window: Default (subtle glow), Hover (enhanced glow), Active input (pulsing cursor)
- Traffic Lights: Hidden (no hover), Visible (hover), Active (click feedback)
- Commands: Typing (character-by-character reveal), Complete (static text), Error (red color)
- FAB: Collapsed (icon only), Expanded (mini-terminal visible), Processing (loading indicator)
- View State: Terminal mode (centered terminal), Website mode (full layout with FAB)
- Theme Browser: Closed (hidden), Opening (fade in with scale), Open (fully visible), Closing (fade out)
- Theme Preview Card: Default (subtle border), Hover (scaled 1.02, gradient sweep, enhanced glow), Active (highlighted border, check badge), Selected (border-primary)
- Color Swatches: Default (static color), Animated (pulsing glow 2s infinite), Hover (scaled 1.05)
- Music Button: Hidden (non-xmas theme), Visible (xmas theme active), Playing (icon pulsing, note animating, shimmer effect), Muted (static muted icon)

**Icon Selection**:
- Terminal: `Terminal` icon for FAB
- Settings: `Gear` or `SlidersHorizontal` for appearance controls
- Scroll indicator: `ArrowDown` or `CaretDown` for bounce animation
- Traffic lights: Custom circular divs with color fills (red #FF5F57, yellow #FFBD2E, green #28C840)
- Close modal: `X` icon for theme browser exit
- Active theme: `Check` icon with circular background
- Music on: `SpeakerHigh` icon (filled) for playing state
- Music off: `SpeakerSlash` icon (filled) for muted state
- Music note: 🎵 emoji for visual feedback when playing

**Spacing**:
- Terminal padding: p-6 (24px) for content area
- Command line spacing: mb-2 (8px) between lines
- Section gaps: gap-24 (96px) between hero sections
- FAB margin: m-6 (24px) from viewport edges
- Header height: h-8 (32px) for terminal window chrome

**Mobile**:
- Terminal: Full-width with reduced padding (p-4), maintains aspect ratio
- Traffic lights: Larger touch targets (16px) with increased spacing
- FAB: Slightly larger (56px) for thumb-friendly interaction
- Sections: Reduced gap-12 (48px), single column layout
- Font scaling: Terminal 14px, headings proportionally reduced
- Controls: Stack vertically in settings panel
