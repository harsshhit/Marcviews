import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

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

  const resetSlideInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }

    if (isAutoplay) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
  };

  useEffect(() => {
    resetSlideInterval();
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isAutoplay, slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    resetSlideInterval();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetSlideInterval();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetSlideInterval();
  };

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.7,
      },
    },
  };

  const featureItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 1.1, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/90 via-slate-900/80 to-slate-800/70"></div>
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Slides */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={`slide-${index}`}
                  className="absolute inset-0"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Background image with overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
                      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                      {/* Title */}
                      <motion.h1
                        className="text-6xl font-bold mb-6 text-white leading-tight"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <span className="relative inline-block">
                          {slide.title}
                          <motion.span
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                          />
                        </span>
                      </motion.h1>

                      {/* Description */}
                      <motion.p
                        className="text-xl mb-8 text-white/90 leading-relaxed"
                        variants={descriptionVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {slide.description}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        className="space-y-4 mb-10"
                        variants={featureContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {slide.features.map((feature, i) => (
                          <motion.div
                            key={`feature-${i}`}
                            className="flex items-center space-x-3"
                            variants={featureItemVariants}
                          >
                            <div className="flex-shrink-0 w-2 h-8 rounded-full bg-gradient-to-b from-red-500 to-purple-600" />
                            <span className="text-white/90 text-lg">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full flex items-center space-x-2 transform transition-all duration-300 shadow-lg">
                          <span>Get Started</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrev}
          className="ml-4 p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="mr-4 p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 focus:outline-none"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={`indicator-${index}`}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-gradient-to-r from-red-500 to-purple-600 w-10"
                : "bg-white/30 backdrop-blur-sm w-3 hover:bg-white/50"
            }`}
            onClick={() => handleSlideChange(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay control */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isAutoplay ? "bg-white/20 text-white" : "bg-white/10 text-white/70"
          }`}
          aria-label={isAutoplay ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoplay ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
