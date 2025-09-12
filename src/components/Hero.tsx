import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Terminal, Zap, Sparkles, Rocket, Coffee, Heart } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const texts = [
      'DevOps Engineer',
      'Cloud Architect', 
      'AWS Specialist',
      'CI/CD Expert'
    ];
    
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex]);

  // Enhanced particle generation with colors
  const generateParticles = () => {
    const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-emerald-400', 'bg-orange-400', 'bg-cyan-400'];
    return Array.from({ length: 80 }, (_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 rounded-full ${colors[Math.floor(Math.random() * colors.length)]} opacity-70 animate-pulse`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
  };

  // Floating icons data
  const floatingIcons = [
    { Icon: Code2, color: 'text-blue-400', size: 40, position: 'top-1/4 left-1/4' },
    { Icon: Terminal, color: 'text-emerald-400', size: 35, position: 'top-1/3 right-1/4' },
    { Icon: Zap, color: 'text-yellow-400', size: 30, position: 'bottom-1/3 left-1/3' },
    { Icon: Sparkles, color: 'text-purple-400', size: 28, position: 'top-1/2 right-1/3' },
    { Icon: Rocket, color: 'text-orange-400', size: 32, position: 'bottom-1/4 right-1/2' },
    { Icon: Coffee, color: 'text-amber-400', size: 26, position: 'top-3/4 left-1/2' }
  ];

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20 pb-28"
    >
      {/* Particle Background */}
      <div className="particles absolute inset-0 -z-20">
        {generateParticles()}
      </div>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 via-blue-900/20 via-gray-900 to-emerald-900/30"></div>
        <div className="w-full h-full bg-gradient-to-t from-pink-900/10 via-transparent to-cyan-900/10"></div>
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15)_0%,transparent_50%)] bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.15)_0%,transparent_50%)] bg-[radial-gradient(circle_at_40%_40%,rgba(14,165,233,0.15)_0%,transparent_50%)]"></div>
      </div>

      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 -z-5">
        {floatingIcons.map(({ Icon, color, size, position }, index) => (
          <Icon 
            key={index}
            className={`absolute ${position} ${color} opacity-20 hover:opacity-60 transition-all duration-300 cursor-pointer transform hover:scale-110 ${index % 2 === 0 ? 'floating' : 'floating-delayed'}`}
            size={size}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <span className="relative text-sm font-mono text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 mb-4 inline-block group hover:scale-105 transition-all duration-300">
                  💻 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">Currently @ Appsquadz Software</span>
                  <Heart className="inline-block ml-2 text-red-400 animate-pulse" size={16} />
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">
              <span className="block text-gray-300 text-lg md:text-xl font-normal mb-4 animate-fade-in">Hey there, I'm</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x bg-300% hover:scale-105 transition-transform duration-300">
                Abhishek Mishra
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 font-medium">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono animate-gradient-x bg-300%">{currentText}</span>
                <span className="typing-cursor text-pink-400 animate-pulse"></span>
              </span>
            </h1>
            
            <div className="relative group modern-blur rounded-3xl p-8 mx-auto max-w-4xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center mb-6">
                  Transforming complex cloud architectures into 
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold"> scalable, automated solutions</span> that power the next generation of applications
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { text: 'AWS Certified', color: 'from-orange-400 to-yellow-400' },
                    { text: 'Kubernetes Expert', color: 'from-blue-400 to-cyan-400' },
                    { text: 'CI/CD Specialist', color: 'from-green-400 to-emerald-400' },
                    { text: 'Cloud Architect', color: 'from-purple-400 to-pink-400' }
                  ].map((skill, index) => (
                    <span key={index} className={`relative group/badge px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${skill.color} text-white hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg`}>
                      <span className="relative z-10">{skill.text}</span>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-0 group-hover/badge:opacity-20 blur transition-opacity duration-300`}></div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12 animate-fade-in-delay-1">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-10"></div>
              <p className="relative text-base md:text-lg text-gray-300 leading-relaxed bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30">
                Passionate about automating infrastructure, optimizing cloud architectures, and delivering reliable
                production systems. Currently driving digital transformation at 
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-300 cursor-pointer"> Appsquadz Software</span> with expertise
                in AWS, Kubernetes, and modern DevOps practices.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-3 mt-8">
            <a
              href="#projects"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Rocket className="animate-bounce" size={20} />
                <span className="group-hover:text-white transition-colors duration-300">Explore My Work</span>
              </div>
            </a>
            <a
              href="#contact"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-10 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-2xl group-hover:border-emerald-400 transition-colors duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Heart className="text-emerald-400 animate-pulse" size={20} />
                <span className="text-emerald-400 group-hover:text-white transition-colors duration-300">Let's Connect</span>
              </div>
            </a>
            <a
              href="#about"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-gray-600/50 rounded-2xl group-hover:border-purple-400 transition-colors duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Code2 className="text-gray-300 group-hover:text-white transition-colors duration-300" size={20} />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">About Me</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm p-3 rounded-full border border-gray-700/50 group-hover:border-purple-400/50 transition-all duration-300">
            <ChevronDown className="text-gray-400 group-hover:text-purple-400 animate-bounce transition-colors duration-300" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
