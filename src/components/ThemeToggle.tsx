import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl glass-effect border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 text-yellow-400 transition-all duration-500 ${
            isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          size={24}
        />
        <Moon 
          className={`absolute inset-0 text-blue-400 transition-all duration-500 ${
            isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`}
          size={24}
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
        isDarkMode 
          ? 'group-hover:shadow-lg group-hover:shadow-blue-400/20' 
          : 'group-hover:shadow-lg group-hover:shadow-yellow-400/20'
      }`}></div>
    </button>
  );
};

export default ThemeToggle;
