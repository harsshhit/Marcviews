import React, { useState, useEffect } from 'react';

interface Slide {
  title: string;
  description: string;
  image: string;
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "Accelerate Together",
      description: "Modernize legacy infrastructure with enhanced operational efficiency and cloud migration",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
    },
    {
      title: "Enterprise Grade Defense",
      description: "Centralized control with real-time protection 24/7/365 and enhanced security with tailored guidance",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070"
    },
    {
      title: "An Evolving Threat Landscape",
      description: "Gain full-visibility into cyberthreats while reducing costs and enhancing operational efficiency",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] mt-16">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/90 via-secondary-dark/85 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="text-neutral-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-4 text-neutral-white">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 text-neutral-white/90">{slide.description}</p>
                <button className="bg-gradient-to-r from-accent-purple to-accent-teal text-neutral-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent-purple w-8'
                : 'bg-neutral-white/50 hover:bg-neutral-white'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}