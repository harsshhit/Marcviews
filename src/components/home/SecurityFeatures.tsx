import React, { useState } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  Clock,
  Target,
  BarChart,
  Activity,
} from "lucide-react";
import { AppointmentModal } from "../contact/AppointmentModal";
import { motion } from "framer-motion";

export function SecurityFeatures() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: <Shield className="h-12 w-12 text-accent-purple" />,
      title: "Advanced Threat Protection",
      description:
        "Real-time monitoring and automated response to security threats",
      stats: "99.9% Threat Detection Rate",
    },
    {
      icon: <Lock className="h-12 w-12 text-accent-teal" />,
      title: "Data Encryption",
      description: "End-to-end encryption for all your sensitive data",
      stats: "256-bit AES Encryption",
    },
    {
      icon: <Activity className="h-12 w-12 text-accent-success" />,
      title: "AI-Powered Analytics",
      description:
        "Intelligent threat detection and predictive security measures",
      stats: "24/7 Automated Monitoring",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-secondary-dark via-primary to-secondary-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 mb-4">
            Multi-layered, <span className="text-gradient">AI-powered</span>,
            End-to-end security
          </h2>
          <p className="text-neutral-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Enterprise-grade security with automated threat detection and
            response, powered by advanced AI algorithms and machine learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card card-hover card-stagger group"
              style={{ animationDelay: `${index * 100}ms` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-8">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="heading-3 mb-3">{feature.title}</h3>
                <p className="text-neutral-white/70 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="text-accent-teal font-semibold text-sm">
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            className="btn btn-primary btn-ripple px-8 py-4 text-lg"
            onClick={handleOpenModal}
          >
            Book a Consultative Call
          </button>
        </motion.div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={{
          _id: "consultation",
          title: "Security Consultation",
          duration: "30 mins",
          price: "Free",
        }}
      />
    </div>
  );
}
