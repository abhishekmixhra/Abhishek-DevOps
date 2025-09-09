import React from 'react';
import { Heart, Linkedin, Github, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <p className="flex items-center space-x-2">
              <span>© 2024 DevOps Engineer Portfolio. Built with</span>
              <Heart className="text-red-400" size={16} />
              <span>and React</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-gray-400 mr-6">
              <p>Automating the future, one pipeline at a time.</p>
            </div>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com/in/abhishek-mishra-14b538221"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/abhishekmixhra"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://instagram.com/abhishekmishra6121"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/channel/UCy5pB_taMNCPe7mssaBF56A"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
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