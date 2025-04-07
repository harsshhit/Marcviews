import React from 'react';
import { Shield, Lock, AlertTriangle, Clock, Target, BarChart } from 'lucide-react';

export function SecurityFeatures() {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-accent-purple" />,
      title: "Enterprise-Grade Security",
      description: "Advanced protection systems with military-grade encryption and continuous monitoring"
    },
    {
      icon: <Lock className="h-12 w-12 text-accent-teal" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock threat detection and response with automated incident management"
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-accent-warning" />,
      title: "Threat Intelligence",
      description: "AI-powered threat detection with real-time analysis and predictive security measures"
    },
    {
      icon: <Clock className="h-12 w-12 text-accent-success" />,
      title: "Rapid Response",
      description: "1-hour response time for critical security incidents with dedicated support team"
    },
    {
      icon: <Target className="h-12 w-12 text-accent-purple" />,
      title: "Compliance Management",
      description: "Automated compliance monitoring and reporting for major regulatory frameworks"
    },
    {
      icon: <BarChart className="h-12 w-12 text-accent-teal" />,
      title: "Performance Analytics",
      description: "Detailed security metrics and performance analytics with custom reporting"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-secondary-dark via-primary to-secondary-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-neutral-white">
            Multi-layered, AI-powered, End-to-end security
          </h2>
          <p className="text-neutral-white/80 max-w-2xl mx-auto">
            Enterprise-grade security with automated threat detection and response, powered by advanced AI algorithms and machine learning
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-secondary-dark/50 backdrop-blur-sm rounded-lg border border-primary-accent/20 hover:shadow-xl hover:shadow-primary-accent/10 transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-white">{feature.title}</h3>
              <p className="text-neutral-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-accent-purple to-accent-teal text-neutral-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300">
            Book a Consultative Call
          </button>
        </div>
      </div>
    </div>
  );
}