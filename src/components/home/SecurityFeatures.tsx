import {
  Shield,
  Lock,
  Activity,
  // Link,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function SecurityFeatures() {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-red-500" />,
      title: "Advanced Threat Protection",
      description:
        "Real-time monitoring and automated response to security threats",
      stats: "99.9% Threat Detection Rate",
    },
    {
      icon: <Lock className="h-12 w-12 text-red-500" />,
      title: "Data Encryption",
      description: "End-to-end encryption for all your sensitive data",
      stats: "256-bit AES Encryption",
    },
    {
      icon: <Activity className="h-12 w-12 text-red-500" />,
      title: "AI-Powered Analytics",
      description:
        "Intelligent threat detection and predictive security measures",
      stats: "24/7 Automated Monitoring",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 mb-4">
            Multi-layered,{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              AI-powered
            </span>
            , End-to-end security
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Enterprise-grade security with automated threat detection and
            response, powered by advanced AI algorithms and machine learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-3xl backdrop-blur-sm bg-white/30 border border-gray-200 shadow-2xl p-8 transform transition-all duration-500 group hover:scale-[1.03] hover:shadow-red-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center items-center mb-6">
                <motion.div
                  className="p-4 rounded-full bg-red-100 shadow-md hover:shadow-red-300 transition duration-300 group-hover:scale-110"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-center mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="text-center text-sm font-medium text-gray-500">
                {feature.stats}
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
          <Link to="/contact/appointmentform">
            <button className="bg-black text-white rounded-full hover:bg-red-600 transition-colors duration-300 px-8 py-4 text-lg shadow-lg hover:shadow-red-300">
              Book a Consultative Call
            </button>
          </Link>
        </motion.div>
      </div>

      {/* <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={{
          _id: "consultation",
          title: "Security Consultation",
          duration: "30 mins",
          price: "Free",
        }}
      /> */}
    </div>
  );
}
