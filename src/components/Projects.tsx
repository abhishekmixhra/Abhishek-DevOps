import React from 'react';
import { Zap, Shield, Cloud, Award } from 'lucide-react';

const Projects = () => {

  const projects = [
    {
      title: "The Indian Express Migration",
      description: "Orchestrated complete production system migration from GCP to AWS, including workload migration from GKE to EKS and seamless transition of subscription services.",
      technologies: ["AWS", "EKS", "GCP", "GKE", "EC2", "Production Migration"],
      icon: <Cloud className="text-blue-400" size={32} />,
      gradient: "from-blue-500 to-cyan-500",
      badge: "Enterprise",
      impact: "Zero Downtime",
      features: [
        "Complete GCP to AWS migration",
        "GKE to EKS workload transition", 
        "EC2 server reconfiguration",
        "Zero-downtime production deployment"
      ]
    },
    {
      title: "Advanced CI/CD Pipeline",
      description: "Developed end-to-end CI/CD pipeline with GitHub Actions, integrating SonarQube quality gates, Docker packaging, ECR publishing, and EKS deployment.",
      technologies: ["GitHub Actions", "SonarQube", "Docker", "ECR", "EKS", "Cross-account"],
      icon: <Zap className="text-emerald-400" size={32} />,
      gradient: "from-emerald-500 to-teal-500",
      badge: "Automation",
      impact: "90% Faster Deployments",
      features: [
        "SonarQube quality gate integration",
        "Automated Docker packaging and ECR publishing",
        "Cross-account AWS role assumption",
        "Automated runner environment cleanup"
      ]
    },
    {
      title: "AWS Transit Gateway Architecture",
      description: "Architected hub-and-spoke AWS Transit Gateway solution across multiple accounts with centralized egress VPC for secure internet access.",
      technologies: ["AWS Transit Gateway", "VPC", "NAT Gateway", "Cross-account", "RAM"],
      icon: <Shield className="text-orange-400" size={32} />,
      gradient: "from-orange-500 to-red-500",
      badge: "Architecture",
      impact: "Multi-Account Security",
      features: [
        "Hub-and-spoke network architecture",
        "Cross-account RAM sharing configuration",
        "Centralized egress VPC with NAT Gateway",
        "Enhanced security and network visibility"
      ]
    },
    {
      title: "Certificate Generator Web App",
      description: "Built a hackathon-winning web application for automatic certificate generation and verification using modern web technologies.",
      technologies: ["HTML", "CSS", "JavaScript", "Django", "MySQL"],
      icon: <Award className="text-purple-400" size={32} />,
      gradient: "from-purple-500 to-pink-500",
      badge: "Award Winner",
      impact: "2-Day Build",
      features: [
        "Automated certificate generation",
        "Certificate verification system",
        "Built in 2 days for C# Corner hackathon",
        "Received achievement certificate and innovation award"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-300% hover:scale-105 transition-transform duration-300">
              🚀 Featured Projects
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-xl blur opacity-10"></div>
            <p className="relative text-xl text-gray-300 bg-gray-900/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30">
              Transforming complex infrastructure challenges into 
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">scalable, automated solutions</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
            >
              <div className="glass-effect-strong p-8 rounded-3xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 card-hover h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.gradient} mr-6`}>
                      {project.icon}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-3 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 mr-3">
                          {project.badge}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                          {project.impact}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed text-lg">{project.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center">
                    <Zap size={14} className="mr-2" /> Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3 text-gray-300 group/feature hover:text-white transition-colors">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 text-sm font-semibold bg-gray-800/70 text-gray-300 rounded-lg border border-gray-600/50 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Commented out as requested */}
                {/* 
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Play size={16} className="mr-2 group-hover/btn:scale-110 transition-transform" />
                    View Details
                  </button>
                  <button className="px-6 py-3 glass-effect border border-gray-600/50 hover:border-emerald-500/50 text-gray-300 hover:text-emerald-400 font-semibold rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
                */}

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
