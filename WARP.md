# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an interactive personal portfolio website built with React, TypeScript, and Vite. The site showcases Abhishek Mishra's profile as a DevOps Engineer with modern interactive elements, featuring sections for About, Skills, Experience, Projects, and Contact information with enhanced user experience through animations and interactive components.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code linting
npm run lint
```

### Development Workflow
- The dev server supports hot module replacement (HMR)
- Changes to TypeScript/TSX files trigger automatic recompilation
- Tailwind CSS classes are compiled on-demand during development

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5.4+ with React plugin
- **Styling**: Tailwind CSS 3.4+ with PostCSS and custom animations
- **Icons**: Lucide React
- **Animations**: Framer Motion with custom CSS animations
- **Email Service**: EmailJS for contact form functionality
- **Theme System**: React Context-based dark/light mode with system preference detection
- **Interactive Elements**: Custom particle system, 3D tilt effects, terminal simulation
- **Code Quality**: ESLint with TypeScript, React Hooks, and React Refresh plugins

### Project Structure
```
src/
├── App.tsx              # Main app component with particle system and cursor effects
├── main.tsx             # React root and app mounting
├── index.css            # Global styles, Tailwind imports, custom utilities
├── vite-env.d.ts        # Vite type definitions
├── contexts/
│   └── ThemeContext.tsx # Theme provider with localStorage and system preference
├── hooks/
│   ├── useTheme.ts      # Custom theme hook
│   └── use3DTilt.ts     # 3D tilt effect hook
└── components/
    ├── Header.tsx               # Navigation with responsive mobile menu
    ├── Hero.tsx                 # Landing section with hero content
    ├── About.tsx                # Personal introduction section
    ├── Skills.tsx               # Technical skills showcase
    ├── Experience.tsx           # Work experience timeline
    ├── Projects.tsx             # Portfolio projects gallery
    ├── Contact.tsx              # Contact form and social links
    ├── Footer.tsx               # Site footer
    ├── LoadingScreen.tsx        # Loading animation component
    ├── ThemeToggle.tsx          # Dark/light mode toggle button
    ├── InteractiveParticles.tsx # Animated particle background system
    ├── InteractiveTerminal.tsx  # Terminal simulation component
    ├── InteractiveTimeline.tsx  # Animated experience timeline
    ├── InteractiveSkillRadar.tsx# Skills visualization radar chart
    ├── InteractiveCodeEditor.tsx# Code syntax highlighting display
    └── InteractiveContactForm.tsx# Enhanced contact form with animations
```

### Component Architecture
- **Single Page Application**: All components are rendered in `App.tsx` as sections
- **Theme System**: React Context pattern for global dark/light theme state management
- **Custom Hooks**: Reusable hooks for theme management and 3D tilt effects
- **Responsive Design**: Mobile-first approach with Tailwind responsive classes
- **Smooth Scrolling**: Navigation uses anchor links with smooth scroll behavior
- **Animation System**: Multi-layered animations including:
  - Custom CSS animations (fade-in, slide-up, scale-in, float, gradient-shift)
  - Framer Motion for complex interactive elements
  - Particle system with floating animations
  - Cursor shadow tracking effect
- **Interactive Elements**: Modular interactive components for enhanced UX
- **State Management**: React Context for theme + local component state using hooks

### Key Features
- **Responsive Navigation**: Collapsible mobile menu with scroll-based styling
- **Theme System**: Seamless dark/light mode toggle with system preference detection
- **Interactive Particle System**: Floating particle background with mouse interaction
- **Terminal Simulation**: Interactive terminal component with typing animations
- **3D Tilt Effects**: Mouse-based 3D transformations on interactive elements
- **Contact Integration**: Enhanced form submissions with EmailJS and visual feedback
- **Custom Animations**: Comprehensive animation system with staggered timing
- **Performance Optimizations**: Vite's ESM-based dev server and optimized production builds
- **Accessibility**: Theme persistence, system preference detection, and smooth transitions

### Interactive Components Architecture

The codebase features a sophisticated interactive component system:

#### Core Interactive Components
- **InteractiveParticles**: Canvas-based particle system with mouse interaction and performance optimization
- **InteractiveTerminal**: Simulated terminal with typing animations and command history
- **InteractiveTimeline**: Animated work experience timeline with scroll-based reveals
- **InteractiveSkillRadar**: Dynamic skill visualization with radar chart animations
- **InteractiveCodeEditor**: Syntax-highlighted code display with typing effects
- **InteractiveContactForm**: Enhanced form with real-time validation and submission feedback

#### Animation Patterns
- **Staggered Animations**: Components use incremental delays for smooth sequential reveals
- **Mouse Interactions**: 3D tilt effects and particle system respond to cursor movement
- **Scroll-Based Triggers**: Intersection Observer API for performance-optimized scroll animations
- **Theme Transitions**: 300ms duration with `ease` timing for smooth theme switching

### Development Notes
- TypeScript configuration uses project references (`tsconfig.app.json`, `tsconfig.node.json`)
- ESLint configured for React Hooks and React Refresh patterns
- Tailwind content paths include `index.html` and all source files
- Vite excludes `lucide-react` from optimization for better dev experience
- Custom CSS utilities defined in `@layer utilities` for reusable styles
- Theme system persists user preference in localStorage and respects system settings
- Interactive components are performance-optimized with proper cleanup in useEffect hooks

### Styling System
- **Color Scheme**: Dual theme support (dark/light) with gray-900/gray-50 base, blue and emerald accents
- **Typography**: Inter font family with custom text shadows and gradient text effects
- **Layout**: Container-based responsive design with consistent padding and grid systems
- **Custom Animations**: Comprehensive animation library including:
  - `fade-in`, `slide-up`, `scale-in` for entrance effects
  - `float`, `gradient-shift` for continuous animations
  - `blink`, `fill-bar` for progress indicators
  - `particle-float` for particle system (15s infinite)
- **Interactive Effects**: Cursor shadow tracking, particle mouse interaction, 3D tilt transforms
- **Glass Effects**: Backdrop blur with alpha transparency for modern UI elements
- **Theme Transitions**: Smooth 300ms transitions between dark/light modes
