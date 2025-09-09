import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: "DevOps Engineer",
      company: "Appsquadz Software Pvt Ltd",
      duration: "Jul 2024 - Present",
      location: "Remote",
      description: [
        "Orchestrated migration of The Indian Express production systems from GCP to AWS, moving workloads from GKE to EKS",
        "Developed end-to-end CI/CD pipeline in GitHub Actions with SonarQube quality gates and ECR integration",
        "Built GitHub Actions pipeline with AMI creation using Packer and cross-account AMI sharing for zero-downtime deployments",
        "Architected hub-and-spoke AWS Transit Gateway solution across multiple accounts with centralized egress VPC",
        "Implemented AWS SNS API for OTP delivery and supported Prasar Bharati OTT project optimization",
        "Designed Terraform scripts with modular architecture for Disaster Recovery infrastructure provisioning"
      ],
      technologies: ["AWS", "EKS", "Docker", "GitHub Actions", "Terraform", "Packer", "Transit Gateway", "SNS"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative p-8 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Building size={16} />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400 mt-2 md:mt-0">
                    <Calendar size={16} />
                    <span className="font-semibold">{exp.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-300 mb-6">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <span className="text-emerald-400 mt-1">▶</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;