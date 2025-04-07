import React from "react";
import { ServicePage } from "../types";

interface ServiceTemplateProps {
  data: ServicePage;
}

export function ServiceTemplate({ data }: ServiceTemplateProps) {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-[70vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-20 z-10 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-white">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-white/90 max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Features Section with Images */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${feature.image})`,
                }}
              />
              <div className="p-6 border-t border-primary-accent/20">
                <h3 className="text-xl font-semibold mb-4 text-accent-purple group-hover:text-accent-teal transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section with Icons */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Key Benefits
          </h2>

          <div className="relative rounded-2xl overflow-hidden bg-primary">
            <div
              className="absolute inset-0 opacity-20 blur-sm"
              style={{
                backgroundImage: `url(${data.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {data.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center bg-secondary-dark/50 backdrop-blur-sm p-6 rounded-xl"
                  >
                    {benefit.icon ? (
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-teal rounded-full flex items-center justify-center">
                        <img
                          src={benefit.icon}
                          alt={benefit.title}
                          className="w-8 h-8"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-teal rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-neutral-white">
                          {index + 1}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-3 text-accent-teal">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-white/80">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call To Action with Background Image */}
        <div
          className="relative rounded-2xl overflow-hidden text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
              data.callToAction.backgroundImage || data.heroImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-12 md:p-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-white">
              {data.callToAction.title}
            </h2>
            <p className="text-xl text-neutral-white/90 mb-8 max-w-2xl mx-auto">
              {data.callToAction.description}
            </p>
            <button className="bg-accent-purple text-neutral-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-teal transition-colors duration-300 shadow-lg">
              {data.callToAction.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
