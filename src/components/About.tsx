import React, { useState, useEffect, useRef } from 'react';
import { Zap, Calendar, Award, Users, MapPin } from 'lucide-react';
import abhImage from "../image/abhi.jpeg"

const About = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    certifications: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const finalStats = {
        experience: 1,
        projects: 50,
        clients: 100,
        certifications: 3
      };
      
      const animateCounters = () => {
        Object.keys(finalStats).forEach(key => {
          const target = finalStats[key];
          const increment = target / 50;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
          }, 30);
        });
      };
      
      animateCounters();
    }
  }, [statsVisible]);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 hover:text-blue-400 transition-colors duration-300">
            👨‍💻 About Me
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
            Transforming complex infrastructure challenges into 
            <span className="text-blue-400 font-semibold"> elegant, scalable solutions</span>
          </p>
        </div>
          
        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { key: 'experience', value: counters.experience, label: 'Years Experience', suffix: '+', icon: Calendar, color: 'text-blue-400' },
            { key: 'projects', value: counters.projects, label: 'Projects Completed', suffix: '+', icon: Award, color: 'text-emerald-400' },
            { key: 'clients', value: counters.clients, label: 'Client Satisfaction', suffix: '%', icon: Users, color: 'text-orange-400' },
            { key: 'certifications', value: counters.certifications, label: 'Certifications', suffix: '+', icon: Zap, color: 'text-purple-400' }
          ].map((stat) => (
            <div key={stat.key} className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <stat.icon className={`${stat.color} mx-auto mb-4`} size={32} />
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative max-w-sm mx-auto">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <img
                  src={abhImage}
                  alt="DevOps Engineer Profile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-effect px-3 py-1 rounded-full border border-blue-500/30">
                <span className="text-xs font-bold text-blue-400">DevOps</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-effect px-3 py-1 rounded-full border border-emerald-500/30">
                <span className="text-xs font-bold text-emerald-400">AWS</span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-xl floating"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-orange-500/20 rounded-full blur-xl floating-delayed"></div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">👋</span> Hello, I'm Abhishek
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                A passionate DevOps Engineer at <span className="text-emerald-400 font-semibold">Appsquadz Software</span>, 
                where I architect and maintain cloud-native solutions that power modern applications. 
                My expertise spans across AWS ecosystem, containerization technologies, and automated deployment pipelines.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                I've successfully orchestrated large-scale migrations, including The Indian Express's transition 
                from GCP to AWS, and built robust CI/CD pipelines that ensure reliable, secure deployments. 
                With my MCA background and hands-on experience, I'm committed to delivering infrastructure 
                solutions that scale with business needs.
              </p>
            </div>
            
            {/* Specialties */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <Zap className="mr-3 text-yellow-400" size={24} />
                Specialties
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "AWS Specialist", desc: "EC2, EKS, Lambda, S3, VPC", color: "blue" },
                  { title: "CI/CD Expert", desc: "GitHub Actions, Jenkins, ArgoCD", color: "emerald" },
                  { title: "Infrastructure Architect", desc: "Terraform, CloudFormation, IaC", color: "orange" },
                  { title: "Container Orchestration", desc: "Docker, Kubernetes, Helm", color: "purple" }
                ].map((specialty, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-transparent dark:glass-effect rounded-xl border border-gray-300 dark:border-gray-700/30 hover:border-blue-500/30 transition-all duration-300">
                    <h5 className={`text-${specialty.color}-400 font-semibold mb-2`}>{specialty.title}</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{specialty.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="mr-3 text-red-400" size={20} />
              <span>Available Remotely | Open to Opportunities</span>
            </div>
          </div>
        </div>
        
        {/* Education & Certifications */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            🎓 Education & Certifications
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gray-50 dark:glass-effect-strong p-6 rounded-2xl border border-gray-300 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 card-hover">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-gray-800 dark:text-white font-bold mb-2">MCA 2024</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Abes Engineering College Ghaziabad</p>
              <div className="text-blue-400 font-semibold">75%</div>
            </div>
            
            <div className="group bg-gray-50 dark:glass-effect-strong p-6 rounded-2xl border border-gray-300 dark:border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 card-hover">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-gray-800 dark:text-white font-bold mb-2">B.Sc 2022</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">University Of Allahabad</p>
              <div className="text-emerald-400 font-semibold">83.5%</div>
            </div>
            
            <div className="group bg-gray-50 dark:glass-effect-strong p-6 rounded-2xl border border-gray-300 dark:border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 card-hover">
              <div className="text-4xl mb-4">📜</div>
              <h4 className="text-gray-800 dark:text-white font-bold mb-2">Certifications</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Cyber Security, Oracle Database, HackerRank Problem Solving</p>
            </div>
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="mt-16">
          <h4 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white flex items-center justify-center">
            <span className="mr-3">🎯</span> Hobbies & Interests
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-gray-50 dark:glass-effect rounded-xl border border-purple-300 dark:border-purple-600/30 hover:border-purple-500/50 transition-all duration-300 card-hover">
              <span className="text-purple-400 font-semibold">🧩 Solving Puzzles</span>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:glass-effect rounded-xl border border-indigo-300 dark:border-indigo-600/30 hover:border-indigo-500/50 transition-all duration-300 card-hover">
              <span className="text-indigo-400 font-semibold">♟️ Playing Chess</span>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:glass-effect rounded-xl border border-pink-300 dark:border-pink-600/30 hover:border-pink-500/50 transition-all duration-300 card-hover">
              <span className="text-pink-400 font-semibold">🎵 Singing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;