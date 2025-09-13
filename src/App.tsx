import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveParticles from './components/InteractiveParticles';
import InteractiveTerminal from './components/InteractiveTerminal';

function App() {
  useEffect(() => {
    // Cursor shadow effect
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-shadow') as HTMLElement;
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white scroll-smooth transition-colors duration-300 relative">
        {/* Interactive Particle System */}
        <InteractiveParticles />
        
        {/* Cursor Shadow */}
        <div className="cursor-shadow fixed w-20 h-20 pointer-events-none z-50 rounded-full bg-blue-500/10 blur-md transition-opacity duration-300 opacity-80" style={{ transform: 'translate(-50%, -50%)' }}></div>
        
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        
        {/* Interactive Terminal */}
        <InteractiveTerminal />
      </div>
    </ThemeProvider>
  );
}

export default App;
