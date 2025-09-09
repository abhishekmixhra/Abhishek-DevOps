import React from 'react';
import { Cloud, Container, Cog, Shield, Database, GitBranch } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Cloud className="text-blue-400" size={32} />,
      title: "AWS Services",
      skills: ["EC2", "EKS", "S3", "RDS", "Lambda", "VPC", "CloudWatch", "Route 53"],
      color: "blue"
    },
    {
      icon: <Container className="text-emerald-400" size={32} />,
      title: "Containerization",
      skills: ["Docker", "Kubernetes (EKS)", "ECR", "Helm"],
      color: "emerald"
    },
    {
      icon: <GitBranch className="text-purple-400" size={32} />,
      title: "CI/CD",
      skills: ["GitHub Actions", "Jenkins", "Bitbucket Pipelines", "SonarQube"],
      color: "purple"
    },
    {
      icon: <Cog className="text-orange-400" size={32} />,
      title: "Infrastructure as Code",
      skills: ["Terraform", "CloudFormation", "Packer", "Auto Scaling"],
      color: "orange"
    },
    {
      icon: <Shield className="text-red-400" size={32} />,
      title: "Monitoring & Security",
      skills: ["Prometheus", "Grafana", "New Relic", "PagerDuty", "IAM"],
      color: "red"
    },
    {
      icon: <Database className="text-cyan-400" size={32} />,
      title: "Systems & Tools",
      skills: ["Linux", "CyberPanel", "Apache", "Nginx", "OpenVPN"],
      color: "cyan"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4 p-3 bg-gray-900/50 rounded-lg group-hover:bg-gray-900/80 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1 text-xs rounded-full bg-${category.color}-600/20 text-${category.color}-400 border border-${category.color}-600/30 hover:bg-${category.color}-600/30 transition-all duration-300 hover:scale-105`}
                    >
                      {skill}
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

export default Skills;