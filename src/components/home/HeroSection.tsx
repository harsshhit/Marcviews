import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Slide {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // {
    //   title: "Accelerate Together",
    //   description:
    //     "Modernize legacy infrastructure with enhanced operational efficiency and cloud migration",
    //   image:
    //     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    //   features: [
    //     "24/7 Monitoring & Support",
    //     "Automated Security Protocols",
    //     "Real-time Threat Detection",
    //   ],
    // },
    {
      title: "Enterprise Grade Defense",
      description:
        "Centralized control with real-time protection 24/7/365 and enhanced security with tailored guidance",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070",
      features: [
        "Advanced Threat Intelligence",
        "Compliance Management",
        "Incident Response",
      ],
    },
    {
      title: "An Evolving Threat Landscape",
      description:
        "Gain full-visibility into cyberthreats while reducing costs and enhancing operational efficiency",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070",
      features: [
        "AI-Powered Analytics",
        "Predictive Security",
        "Automated Remediation",
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen  overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <motion.div
                className="text-white max-w-2xl"
                // initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 text-white leading-relaxed">
                  {slide.description}
                </p>

                <div className="space-y-3">
                  {slide.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-teal" />
                      <span className="text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent-purple w-8"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
