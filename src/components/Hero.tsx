import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Terminal, Zap } from 'lucide-react';

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

  // Particle generation
  const generateParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${15 + Math.random() * 10}s`
        }}
      />
    ));
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20 pb-28"
    >
      {/* Particle Background */}
      <div className="particles absolute inset-0 -z-20">
        {generateParticles()}
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-gray-900 to-emerald-900/20"></div>
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 -z-5">
        <Code2 className="absolute top-1/4 left-1/4 text-blue-400/30 floating" size={40} />
        <Terminal className="absolute top-1/3 right-1/4 text-emerald-400/30 floating-delayed" size={35} />
        <Zap className="absolute bottom-1/3 left-1/3 text-orange-400/30 floating" size={30} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block">
                <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/30 mb-4 inline-block">
                  💻 Currently @ Appsquadz Software
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">
              <span className="block text-gray-300 text-lg md:text-xl font-normal mb-4">Hey there, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Abhishek Mishra
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-gray-400 font-medium">
                <span className="text-gradient-blue font-mono">{currentText}</span>
                <span className="typing-cursor text-emerald-400"></span>
              </span>
            </h1>
            
            <div className="modern-blur rounded-3xl p-8 mx-auto max-w-4xl glow-on-hover">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center mb-6">
                Transforming complex cloud architectures into 
                <span className="text-gradient-emerald font-semibold"> scalable, automated solutions</span> that power the next generation of applications
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['AWS Certified', 'Kubernetes Expert', 'CI/CD Specialist', 'Cloud Architect'].map((skill, index) => (
                  <span key={index} className="badge-modern px-4 py-2 rounded-full text-sm font-medium text-blue-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-12 animate-fade-in-delay-1">
            <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Passionate about automating infrastructure, optimizing cloud architectures, and delivering reliable
              production systems. Currently driving digital transformation at 
              <span className="text-emerald-400 font-semibold"> Appsquadz Software</span> with expertise
              in AWS, Kubernetes, and modern DevOps practices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-3 mt-8">
            <a
              href="#projects"
              className="group interactive-card bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 glow-on-hover"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>Explore My Work</span>
              </div>
            </a>
            <a
              href="#contact"
              className="group interactive-card modern-blur border border-emerald-400/50 text-emerald-400 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:border-emerald-400"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>Let's Connect</span>
              </div>
            </a>
            <a
              href="#about"
              className="group interactive-card modern-blur border border-gray-600/50 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>👨‍💻</span>
                <span>About Me</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400" size={32} />
      </div>
    </section>
  );
};

export default Hero;
