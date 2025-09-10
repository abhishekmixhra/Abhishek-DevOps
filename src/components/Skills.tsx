import React from 'react';
import { Cpu, Cloud, Code, Database, Shield } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: "AWS Cloud", icon: <Cloud size={28} className="text-blue-400" /> },
    { name: "Kubernetes", icon: <Cpu size={28} className="text-emerald-400" /> },
    { name: "Docker", icon: <Code size={28} className="text-purple-400" /> },
    { name: "CI/CD (GitHub Actions)", icon: <Database size={28} className="text-orange-400" /> },
    { name: "Security & Monitoring", icon: <Shield size={28} className="text-red-400" /> },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          My Skills
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              {skill.icon}
              <h3 className="mt-4 text-lg font-semibold text-white">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
