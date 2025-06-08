import React from "react";
import { Shield, Cloud, Users, Server } from "lucide-react";

const services = [
  {
    title: "Cyber Assessments",
    description:
      "Comprehensive security assessments to identify vulnerabilities and protect your digital assets.",
    icon: Shield,
    features: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Auditing",
      "Risk Analysis",
    ],
  },
  {
    title: "Cloud Migration",
    description:
      "Secure and seamless migration of your infrastructure to the cloud with minimal disruption.",
    icon: Cloud,
    features: [
      "Cloud Strategy",
      "Infrastructure Migration",
      "Data Migration",
      "Post-Migration Support",
    ],
  },
  {
    title: "Consulting",
    description:
      "Expert guidance to enhance your security posture and implement best practices.",
    icon: Users,
    features: [
      "Security Strategy",
      "Compliance Consulting",
      "Risk Management",
      "Security Architecture",
    ],
  },
  {
    title: "Physical Security",
    description:
      "End-to-end physical security solutions to protect your premises and assets.",
    icon: Server,
    features: [
      "Access Control",
      "Surveillance Systems",
      "Security Personnel",
      "Emergency Response",
    ],
  },
];

export function Services() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions tailored to protect your
            business and ensure operational continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <service.icon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 ml-4">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="h-2 w-2 bg-green-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to discuss how we can help secure your business.
          </p>
          <a
            href="/contact/general"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
