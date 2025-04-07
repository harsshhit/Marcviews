import { ServicePage } from '../types';

export const contactData: Record<string, ServicePage> = {
  'schedule': {
    title: "Schedule a Consultation",
    description: "Book a personalized consultation with our cybersecurity experts",
    features: [
      {
        title: "Expert Consultation",
        description: "One-on-one discussion with security specialists"
      },
      {
        title: "Flexible Scheduling",
        description: "Choose a time that works best for you"
      },
      {
        title: "Comprehensive Review",
        description: "In-depth analysis of your security needs"
      }
    ],
    benefits: [
      {
        title: "Personalized Solutions",
        description: "Tailored recommendations for your business"
      },
      {
        title: "Risk Assessment",
        description: "Identify potential vulnerabilities"
      },
      {
        title: "Strategic Planning",
        description: "Develop a roadmap for implementation"
      }
    ],
    callToAction: {
      title: "Book Your Session",
      description: "Schedule your consultation with our experts today",
      buttonText: "Book Now"
    }
  }
};