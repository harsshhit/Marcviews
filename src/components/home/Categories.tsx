// import React from "react";
import {
  Cloud,
  Shield,
  Server,
  AlertTriangle,
  Lock,
  Laptop,
} from "lucide-react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Categories() {
  const categories = [
    {
      title: "Cloud Migration",
      icon: <Cloud className="w-8 h-8" />,
      description:
        "Secure cloud migration services with zero-downtime transition and data protection",
      stats: "99.99% Uptime",
    },
    {
      title: "Cyber Assessments",
      icon: <Shield className="w-8 h-8" />,
      description:
        "Comprehensive security audits and vulnerability assessments",
      stats: "500+ Threats Detected",
    },
    {
      title: "Managed Infrastructure",
      icon: <Server className="w-8 h-8" />,
      description: "24/7 infrastructure management with proactive monitoring",
      stats: "24/7 Monitoring",
    },
    {
      title: "Enterprise Risk Management",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Advanced risk assessment and mitigation strategies",
      stats: "100% Compliance",
    },
    {
      title: "Disaster Recovery",
      icon: <Lock className="w-8 h-8" />,
      description: "Robust disaster recovery planning and implementation",
      stats: "15min Recovery",
    },
    {
      title: "Professional Services",
      icon: <Laptop className="w-8 h-8" />,
      description: "Expert consulting and implementation services",
      stats: "200+ Experts",
    },
  ];

  return (
    <div className="py-20 bg-black/90 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBMNDAgNDBMMjAgNDBMMjAgMjBaTTAgMjBMMjAgMjBMMjAgNDBMMCA0MEwwIDIwWk0wIDBMMjAgMEwyMCAyMEwwIDIwTDAgMFoiIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')] bg-repeat animate-[slide_20s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-neutral-white tracking-tight">
            Our Services
          </h2>
          <p className="text-neutral-white/80 max-w-2xl mx-auto text-lg">
            Comprehensive cybersecurity solutions tailored to your business
            needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="group relative bg-secondary-dark/50 backdrop-blur-sm p-6 rounded-xl border border-primary-accent/20 shadow-md hover:shadow-xl hover:shadow-primary-accent/10 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Hover Effect Background */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-teal/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" /> */}

              <div className="relative">
                <motion.div
                  className="text-red-500 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-white group-hover:text-red-500 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-neutral-white/80 mb-4 group-hover:text-neutral-white/90 transition-colors duration-300">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm tracking-wide">
                    {category.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
