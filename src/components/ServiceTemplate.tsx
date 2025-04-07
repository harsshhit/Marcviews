import React from 'react';
import { ServicePage } from '../types';

interface ServiceTemplateProps {
  data: ServicePage;
}

export function ServiceTemplate({ data }: ServiceTemplateProps) {
  return (
    <div className="pt-16">
      <div className="bg-primary text-neutral-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-white">
            {data.title}
          </h1>
          <p className="text-xl text-neutral-white/80 max-w-2xl">{data.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-accent/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-accent-purple">{feature.title}</h3>
              <p className="text-neutral-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-neutral-white">Key Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-accent-teal">{benefit.title}</h3>
                <p className="text-neutral-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary-dark text-neutral-white rounded-2xl p-12 text-center border border-primary-accent/20">
          <h2 className="text-3xl font-bold mb-4 text-neutral-white">
            {data.callToAction.title}
          </h2>
          <p className="text-xl text-neutral-white/80 mb-8 max-w-2xl mx-auto">
            {data.callToAction.description}
          </p>
          <button className="bg-accent-purple text-neutral-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-purple/90 transition-colors">
            {data.callToAction.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}