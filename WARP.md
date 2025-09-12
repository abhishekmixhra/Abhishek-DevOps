# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite. The site showcases Abhishek Mishra's profile as a DevOps Engineer, featuring sections for About, Skills, Experience, Projects, and Contact information.

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
- **Styling**: Tailwind CSS 3.4+ with PostCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Email Service**: EmailJS for contact form functionality
- **Code Quality**: ESLint with TypeScript and React plugins

### Project Structure
```
src/
├── App.tsx              # Main app component with routing structure
├── main.tsx             # React root and app mounting
├── index.css            # Global styles, Tailwind imports, custom utilities
├── vite-env.d.ts        # Vite type definitions
└── components/          # All React components
    ├── Header.tsx       # Navigation with responsive mobile menu
    ├── Hero.tsx         # Landing section with hero content
    ├── About.tsx        # Personal introduction section
    ├── Skills.tsx       # Technical skills showcase
    ├── Experience.tsx   # Work experience timeline
    ├── Projects.tsx     # Portfolio projects gallery
    ├── Contact.tsx      # Contact form and social links
    └── Footer.tsx       # Site footer
```

### Component Architecture
- **Single Page Application**: All components are rendered in `App.tsx` as sections
- **Responsive Design**: Mobile-first approach with Tailwind responsive classes
- **Smooth Scrolling**: Navigation uses anchor links with smooth scroll behavior
- **Animation System**: Custom CSS animations with utility classes for fade-in effects
- **State Management**: Local component state using React hooks (no external state library)

### Key Features
- **Responsive Navigation**: Collapsible mobile menu with scroll-based styling
- **Contact Integration**: Form submissions use EmailJS or mailto fallback
- **Custom Styling**: Glass effect utilities, custom scrollbar, and gradient text
- **Performance Optimizations**: Vite's ESM-based dev server and optimized production builds

### Development Notes
- TypeScript configuration uses project references (`tsconfig.app.json`, `tsconfig.node.json`)
- ESLint configured for React Hooks and React Refresh patterns
- Tailwind content paths include `index.html` and all source files
- Vite excludes `lucide-react` from optimization for better dev experience
- Custom CSS utilities defined in `@layer utilities` for reusable styles

### Styling System
- **Color Scheme**: Dark theme with gray-900 base, blue and emerald accents
- **Typography**: Inter font family with custom text shadows
- **Layout**: Container-based responsive design with consistent padding
- **Animations**: Staggered fade-in animations with custom timing delays
- **Glass Effects**: Backdrop blur with alpha transparency for modern UI elements
