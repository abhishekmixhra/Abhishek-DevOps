import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, Shield, GitBranch, Container 
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud size={28} className="text-blue-400" />,
      skills: [
        { name: "AWS", level: 95, color: "from-orange-500 to-yellow-500" },
        { name: "GCP", level: 80, color: "from-blue-500 to-cyan-500" },
        { name: "Azure", level: 70, color: "from-blue-600 to-purple-500" }
      ]
    },
    {
      title: "Containers & Orchestration", 
      icon: <Container size={28} className="text-purple-400" />,
      skills: [
        { name: "Docker", level: 90, color: "from-blue-500 to-blue-700" },
        { name: "Kubernetes", level: 88, color: "from-blue-600 to-cyan-600" },
        { name: "EKS/GKE", level: 85, color: "from-emerald-500 to-teal-500" }
      ]
    },
    {
      title: "CI/CD & Automation",
      icon: <GitBranch size={28} className="text-emerald-400" />,
      skills: [
        { name: "GitHub Actions", level: 92, color: "from-gray-700 to-gray-900" },
        { name: "Jenkins", level: 80, color: "from-blue-500 to-indigo-600" },
        { name: "Terraform", level: 87, color: "from-purple-500 to-pink-500" }
      ]
    },
    {
      title: "Monitoring & Security",
      icon: <Shield size={28} className="text-red-400" />,
      skills: [
        { name: "Prometheus", level: 85, color: "from-orange-500 to-red-500" },
        { name: "SonarQube", level: 82, color: "from-blue-500 to-teal-500" },
        { name: "AWS Security", level: 90, color: "from-red-500 to-orange-500" }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">
              ⚙️ Technical Expertise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white hover:text-blue-400 transition-colors duration-300">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Full-stack DevOps expertise from 
            <span className="text-emerald-400 font-semibold">cloud infrastructure</span> to 
            <span className="text-blue-400 font-semibold">deployment automation</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors group-hover:font-semibold">
                        {skill.name}
                      </span>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative text-xs font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 group-hover:border-purple-400/40 transition-all duration-300">
                          {isVisible ? skill.level : 0}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden group-hover:h-4 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
                      <div
                        className={`relative h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out overflow-hidden`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 3 + skillIndex) * 0.2}s`
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-x opacity-60"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "3+", label: "Years Experience", icon: "⏰" },
            { value: "50+", label: "Projects Completed", icon: "🚀" },
            { value: "10+", label: "AWS Services", icon: "☁️" },
            { value: "100%", label: "Client Satisfaction", icon: "⭐" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 glass-effect rounded-xl border border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 hover-glow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
