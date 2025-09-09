import React from 'react';
import { Github, Zap, Shield, Cloud } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "The Indian Express Migration",
      description: "Orchestrated complete production system migration from GCP to AWS, including workload migration from GKE to EKS and seamless transition of subscription services.",
      technologies: ["AWS", "EKS", "GCP", "GKE", "EC2", "Production Migration"],
      icon: <Cloud className="text-blue-400" size={24} />,
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
      icon: <Zap className="text-emerald-400" size={24} />,
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
      icon: <Shield className="text-orange-400" size={24} />,
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
      icon: <Zap className="text-purple-400" size={24} />,
      features: [
        "Automated certificate generation",
        "Certificate verification system",
        "Built in 2 days for C# Corner hackathon",
        "Received achievement certificate and innovation award"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-gray-900/50 rounded-lg group-hover:bg-gray-900/80 transition-colors duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                        <span className="text-emerald-400 mt-1">▶</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Buttons commented for now */}
                {/*
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300">
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300">
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span> 
                  </button>
                </div>
                */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
