import React from "react";
import { Shield, Database, Mail, Laptop } from "lucide-react";

const solutions = [
  {
    title: "Cloud Security",
    description:
      "Protect your cloud infrastructure with advanced security solutions and monitoring.",
    icon: Shield,
    features: [
      "Cloud Access Security",
      "Data Protection",
      "Threat Detection",
      "Compliance Management",
    ],
  },
  {
    title: "Data Security",
    description:
      "Comprehensive data protection solutions to secure your sensitive information.",
    icon: Database,
    features: [
      "Data Encryption",
      "Access Control",
      "Data Loss Prevention",
      "Backup Solutions",
    ],
  },
  {
    title: "Email Security",
    description:
      "Advanced email security to protect against phishing, spam, and malware.",
    icon: Mail,
    features: [
      "Spam Protection",
      "Phishing Prevention",
      "Email Encryption",
      "Archive Solutions",
    ],
  },
  {
    title: "Endpoint Security",
    description:
      "Protect your devices and endpoints from advanced threats and attacks.",
    icon: Laptop,
    features: [
      "Antivirus Protection",
      "Device Control",
      "Application Control",
      "Threat Prevention",
    ],
  },
];

export function Solutions() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade security solutions designed to protect your
            business from evolving cyber threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <solution.icon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 ml-4">
                  {solution.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">{solution.description}</p>
              <ul className="space-y-3">
                {solution.features.map((feature) => (
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
            Want to Learn More?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a consultation with our security experts to discuss your
            needs.
          </p>
          <a
            href="/contact/appointmentform"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
