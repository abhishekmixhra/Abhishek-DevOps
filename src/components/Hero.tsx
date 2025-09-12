import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Terminal, Zap, Sparkles, Rocket, Coffee, Heart } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const texts = [
      'DevOps Engineer',
      'Cloud Enthusiast', 
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

  // Subtle particle generation
  const generateParticles = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-blue-500/20 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${4 + Math.random() * 6}s`
        }}
      />
    ));
  };

  // Professional floating icons
  const floatingIcons = [
    { Icon: Code2, color: 'text-blue-400/40', size: 32, position: 'top-1/4 left-1/4' },
    { Icon: Terminal, color: 'text-green-400/40', size: 28, position: 'top-1/3 right-1/4' },
    { Icon: Zap, color: 'text-yellow-400/40', size: 24, position: 'bottom-1/3 left-1/3' }
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
      
      {/* Professional Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-slate-900"></div>
        <div className="w-full h-full bg-gradient-to-t from-blue-100/20 to-gray-100/10 dark:from-blue-900/5 dark:via-transparent dark:to-slate-800/10"></div>
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08)_0%,transparent_70%)]"></div>
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
              <div className="inline-block">
                <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30 mb-4 inline-block hover:bg-blue-500/20 transition-all duration-300">
                  💻 Currently @ <span className="text-blue-300 font-semibold">Appsquadz Software</span>
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">
              <span className="block text-gray-700 dark:text-gray-400 text-lg md:text-xl font-normal mb-4">Hey there, I'm</span>
              <span className="block text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-300">
                Abhishek Mishra
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 font-medium">
                <span className="text-blue-400 font-mono">{currentText}</span>
                <span className="typing-cursor text-blue-400 animate-pulse"></span>
              </span>
            </h1>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-4xl border border-gray-300/30 dark:border-gray-700/30 hover:border-blue-500/30 transition-all duration-300">
              <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed text-center mb-6">
                Transforming complex cloud architectures into 
                <span className="text-blue-400 font-semibold"> scalable, automated solutions</span> that power modern applications
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'AWS Certified',
                  'Kubernetes Expert', 
                  'CI/CD Specialist',
                  'Cloud Architect'
                ].map((skill, index) => (
                  <span key={index} className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:text-white transition-all duration-300 cursor-pointer">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-12 animate-fade-in-delay-1">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed text-center">
              Passionate about automating infrastructure, optimizing cloud architectures, and delivering reliable
              production systems. Currently driving digital transformation at 
              <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300"> Appsquadz Software</span> with expertise
              in AWS, Kubernetes, and modern DevOps practices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3 mt-8">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              🚀 Explore My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              💬 Let's Connect
            </a>
            <a
              href="#about"
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              👨‍💻 About Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="text-gray-400 animate-bounce hover:text-blue-400 transition-colors duration-300 cursor-pointer" size={28} />
      </div>
    </section>
  );
};

export default Hero;
