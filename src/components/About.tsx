import React from 'react';
import { User, Target, Zap } from 'lucide-react';
import abhImage from "../image/abhi.jpeg"

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 md:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                  <img
                  src={abhImage}
                    // src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500"
                    alt="DevOps Engineer Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-orange-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Hello, I'm Abhishek</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A passionate DevOps Engineer at Appsquadz Software Pvt Ltd, where I architect and maintain 
                  cloud-native solutions that power modern applications. My expertise spans across AWS ecosystem, 
                  containerization technologies, and automated deployment pipelines.
                </p>
              </div>
              <p className="text-base text-gray-300 mb-8 leading-relaxed">
                I've successfully orchestrated large-scale migrations, including The Indian Express's transition 
                from GCP to AWS, and built robust CI/CD pipelines that ensure reliable, secure deployments. 
                With my MCA background and hands-on experience, I'm committed to delivering infrastructure 
                solutions that scale with business needs.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30 text-sm font-medium">
                  AWS Specialist
                </span>
                <span className="px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-full border border-emerald-600/30 text-sm font-medium">
                  CI/CD Expert
                </span>
                <span className="px-4 py-2 bg-orange-600/20 text-orange-400 rounded-full border border-orange-600/30 text-sm font-medium">
                  Infrastructure Architect
                </span>
                <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30 text-sm font-medium">
                  Content Creator
                </span>
              </div>
            </div>
            
            <div className="space-y-6 order-3 md:col-span-2">
              <div className="flex items-start space-x-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <User className="text-blue-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Experience</h3>
                  <p className="text-gray-300">DevOps Engineer at Appsquadz Software with expertise in AWS, Docker, Kubernetes, and production system management</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
                <Target className="text-emerald-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Mission</h3>
                  <p className="text-gray-300">Deliver high-availability, scalable cloud solutions while ensuring security and operational excellence</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
                <Zap className="text-orange-400 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Approach</h3>
                  <p className="text-gray-300">Infrastructure as Code, automated CI/CD pipelines, and proactive monitoring for system reliability</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Gallery Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Education & Certifications
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="MCA Education"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold mb-1">MCA 2024</h4>
                    <p className="text-gray-300 text-sm">Abes Engineering College Ghaziabad - 75%</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Bachelor's Degree"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold mb-1">B.Sc 2022</h4>
                    <p className="text-gray-300 text-sm">University Of Allahabad - 83.5%</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Certifications"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold mb-1">Certifications</h4>
                    <p className="text-gray-300 text-sm">Cyber Security, Oracle Database, HackerRank Problem Solving</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hobbies Section */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold text-center mb-8 text-white">Hobbies & Interests</h4>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30">
                  🧩 Solving Puzzles
                </span>
                <span className="px-6 py-3 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-600/30">
                  ♟️ Playing Chess
                </span>
                <span className="px-6 py-3 bg-pink-600/20 text-pink-400 rounded-lg border border-pink-600/30">
                  🎵 Singing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;