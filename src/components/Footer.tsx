import React from 'react';
import { Heart, Linkedin, Github, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-900/70 border-t border-gray-800 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm flex items-center space-x-2">
            <span>© {new Date().getFullYear()} DevOps Engineer Portfolio.</span>
            <span>Built with</span>
            <Heart className="text-red-400" size={14} />
            <span>React</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="hidden md:block">Automating the future, one pipeline at a time.</span>
            <div className="flex space-x-3">
              <a href="https://linkedin.com/in/abhishek-mishra-14b538221" className="hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/abhishekmixhra" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
              </a>
              <a href="https://instagram.com/abhishekmishra6121" className="hover:text-pink-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com/channel/UCy5pB_taMNCPe7mssaBF56A" className="hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
