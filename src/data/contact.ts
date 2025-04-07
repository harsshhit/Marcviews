import { ServicePage } from "../types";

export const contactData: Record<string, ServicePage> = {
  schedule: {
    title: "Schedule a Consultation",
    description:
      "Book a personalized consultation with our cybersecurity experts",
    heroImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      {
        title: "Expert Consultation",
        description: "One-on-one discussion with security specialists",
        image: "/images/expert-consultation.jpg"
      },
      {
        title: "Flexible Scheduling", 
        description: "Choose a time that works best for you",
        image: "/images/flexible-scheduling.jpg"
      },
      {
        title: "Comprehensive Review",
        description: "In-depth analysis of your security needs",
        image: "/images/comprehensive-review.jpg"
      },
    ],
    benefits: [
      {
        title: "Personalized Solutions",
        description: "Tailored recommendations for your business",
      },
      {
        title: "Risk Assessment",
        description: "Identify potential vulnerabilities", 
      },
      {
        title: "Strategic Planning",
        description: "Develop a roadmap for implementation",
      },
    ],
    callToAction: {
      title: "Book Your Session",
      description: "Schedule your consultation with our experts today",
      buttonText: "Book Now",
    },
  },
};
