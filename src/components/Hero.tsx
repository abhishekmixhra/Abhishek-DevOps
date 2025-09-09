import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-emerald-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-emerald-400 bg-clip-text text-transparent animate-fade-in">
            Abhishek Mishra
          </h1>
          <div className="mb-8 animate-fade-in-delay-1">
            <p className="text-2xl md:text-3xl font-semibold text-white mb-2">
              DevOps Engineer
            </p>
            <p className="text-lg md:text-xl text-gray-300">
              Specializing in AWS cloud infrastructure, CI/CD automation, and scalable solutions
            </p>
          </div>
          <p className="text-base md:text-lg text-gray-400 mb-12 animate-fade-in-delay-2 max-w-3xl mx-auto leading-relaxed">
            Passionate about automating infrastructure, optimizing cloud architectures, and delivering reliable production systems. 
            Currently driving digital transformation at Appsquadz Software with expertise in AWS, Kubernetes, and modern DevOps practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-3">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-white"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400" size={32} />
      </div>
    </section>
  );
};

export default Hero;