import { ServicePage } from "../types";

export const companyData: Record<string, ServicePage> = {
  about: {
    title: "About MarcViews",
    description:
      "Leading the future of cybersecurity with innovative solutions and expert services",
    features: [
      {
        title: "Our Mission",
        description:
          "To secure and protect organizations in an ever-evolving digital landscape",
      },
      {
        title: "Our Vision",
        description:
          "To be the global leader in innovative cybersecurity solutions",
      },
      {
        title: "Our Values",
        description: "Integrity, Innovation, Excellence, and Customer Success",
      },
    ],
    benefits: [
      {
        title: "Global Presence",
        description: "Serving clients across 50+ countries",
      },
      {
        title: "Expert Team",
        description: "500+ certified security professionals",
      },
      {
        title: "Track Record",
        description: "15+ years of cybersecurity excellence",
      },
    ],
    callToAction: {
      title: "Join Our Mission",
      description: "Partner with us to secure your digital future",
      buttonText: "Contact Us",
    },
  },
  careers: {
    title: "Careers at MarcViews",
    description:
      "Join our team of cybersecurity experts and shape the future of digital security",
    features: [
      {
        title: "Growth Opportunities",
        description: "Continuous learning and career advancement paths",
      },
      {
        title: "Innovation Culture",
        description: "Work with cutting-edge technologies and methodologies",
      },
      {
        title: "Global Impact",
        description: "Make a difference in global cybersecurity landscape",
      },
    ],
    benefits: [
      {
        title: "Competitive Package",
        description: "Industry-leading compensation and benefits",
      },
      {
        title: "Work-Life Balance",
        description: "Flexible working hours and remote options",
      },
      {
        title: "Professional Development",
        description: "Training, certifications, and conference attendance",
      },
    ],
    callToAction: {
      title: "Ready to Join?",
      description: "Explore our current openings and apply today",
      buttonText: "View Positions",
    },
  },
  // Add more company pages...
};
