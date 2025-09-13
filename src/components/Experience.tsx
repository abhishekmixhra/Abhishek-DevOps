import React from "react";
import { Calendar, MapPin, Building } from "lucide-react";
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      role: "DevOps Engineer",
      company: "Appsquadz Software Pvt Ltd",
      duration: "1+ Years",
      location: "Remote",
      description: [
        "Orchestrated migration of The Indian Express production systems from GCP to AWS, moving workloads from GKE to EKS",
        "Developed end-to-end CI/CD pipeline in GitHub Actions with SonarQube quality gates and ECR integration",
        "Built GitHub Actions pipeline with AMI creation using Packer and cross-account AMI sharing for zero-downtime deployments",
        "Architected hub-and-spoke AWS Transit Gateway solution across multiple accounts with centralized egress VPC",
        "Implemented AWS SNS API for OTP delivery and supported Prasar Bharati OTT project optimization",
        "Designed Terraform scripts with modular architecture for Disaster Recovery infrastructure provisioning",
      ],
      technologies: [
        "AWS",
        "EKS",
        "Docker",
        "GitHub Actions",
        "Terraform",
        "Packer",
        "Transit Gateway",
        "SNS",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800/70 dark:to-gray-900 relative scroll-mt-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>

          {/* Timeline Wrapper */}
          <div className="relative border-l border-gray-300 dark:border-gray-700 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-10"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[7px] top-3 w-4 h-4 bg-blue-500 rounded-full shadow-lg"></span>

                {/* Experience Card */}
                <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-300 dark:border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 shadow-sm dark:shadow-none">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
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
                    <div className="flex items-center space-x-2 text-blue-400 mt-3 md:mt-0">
                      <Calendar size={16} />
                      <span className="font-semibold">{exp.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-emerald-400 mt-1">▶</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
