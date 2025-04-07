import { ServicePage } from '../types';

export const servicesData: Record<string, ServicePage> = {
  'cyber-assessments': {
    title: "Cyber Assessments",
    description: "Comprehensive security audits and vulnerability assessments to protect your digital assets",
    features: [
      {
        title: "Vulnerability Scanning",
        description: "Advanced scanning tools to identify security gaps and vulnerabilities"
      },
      {
        title: "Penetration Testing",
        description: "Simulated cyber attacks to test your defense mechanisms"
      },
      {
        title: "Risk Assessment",
        description: "Detailed analysis of potential security risks and their impact"
      }
    ],
    benefits: [
      {
        title: "Early Detection",
        description: "Identify vulnerabilities before they can be exploited"
      },
      {
        title: "Compliance",
        description: "Meet regulatory requirements and industry standards"
      },
      {
        title: "Cost Savings",
        description: "Prevent costly security breaches and data loss"
      }
    ],
    callToAction: {
      title: "Secure Your Infrastructure",
      description: "Get a comprehensive assessment of your security posture",
      buttonText: "Schedule Assessment"
    }
  },
  'cloud-migration': {
    title: "Cloud Migration Services",
    description: "Seamless transition to cloud infrastructure with zero downtime and enhanced security",
    features: [
      {
        title: "Migration Planning",
        description: "Comprehensive strategy development and execution roadmap"
      },
      {
        title: "Data Security",
        description: "End-to-end encryption and secure data transfer protocols"
      },
      {
        title: "Performance Optimization",
        description: "Cloud infrastructure optimization for maximum efficiency"
      }
    ],
    benefits: [
      {
        title: "Cost Efficiency",
        description: "Reduce infrastructure costs and optimize resource usage"
      },
      {
        title: "Scalability",
        description: "Easily scale resources based on demand"
      },
      {
        title: "Business Continuity",
        description: "Ensure uninterrupted operations during migration"
      }
    ],
    callToAction: {
      title: "Transform Your Infrastructure",
      description: "Start your cloud migration journey today",
      buttonText: "Get Started"
    }
  },
  'consulting': {
    title: "Security Consulting",
    description: "Expert guidance and strategic planning for your cybersecurity needs",
    features: [
      {
        title: "Strategy Development",
        description: "Custom security strategies aligned with business goals"
      },
      {
        title: "Compliance Consulting",
        description: "Expert guidance on regulatory requirements and standards"
      },
      {
        title: "Security Architecture",
        description: "Design and implementation of secure systems"
      }
    ],
    benefits: [
      {
        title: "Expert Guidance",
        description: "Access to experienced security professionals"
      },
      {
        title: "Risk Mitigation",
        description: "Proactive identification and management of risks"
      },
      {
        title: "Best Practices",
        description: "Implementation of industry-leading security practices"
      }
    ],
    callToAction: {
      title: "Enhance Your Security Posture",
      description: "Book a consultation with our security experts",
      buttonText: "Schedule Consultation"
    }
  },
  'physical-security': {
    title: "Physical Security Solutions",
    description: "Comprehensive physical security measures integrated with digital systems",
    features: [
      {
        title: "Access Control",
        description: "Advanced access management and monitoring systems"
      },
      {
        title: "Surveillance",
        description: "24/7 monitoring with AI-powered detection"
      },
      {
        title: "Emergency Response",
        description: "Rapid response protocols and incident management"
      }
    ],
    benefits: [
      {
        title: "Complete Protection",
        description: "Integrated physical and digital security"
      },
      {
        title: "Real-time Monitoring",
        description: "Immediate threat detection and response"
      },
      {
        title: "Asset Protection",
        description: "Comprehensive protection of physical assets"
      }
    ],
    callToAction: {
      title: "Secure Your Premises",
      description: "Discover our physical security solutions",
      buttonText: "Learn More"
    }
  }
};