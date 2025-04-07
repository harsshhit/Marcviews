import { ServicePage } from '../types';

export const solutionsData: Record<string, ServicePage> = {
  'cloud-security': {
    title: "Cloud Security Solutions",
    description: "Enterprise-grade cloud security solutions to protect your infrastructure and data in the cloud",
    features: [
      {
        title: "Cloud Access Security",
        description: "Identity and access management for cloud resources with zero-trust architecture"
      },
      {
        title: "Data Protection",
        description: "Advanced encryption and data loss prevention for cloud storage"
      },
      {
        title: "Threat Detection",
        description: "Real-time monitoring and automated response to cloud security threats"
      }
    ],
    benefits: [
      {
        title: "Comprehensive Security",
        description: "End-to-end protection for all cloud assets"
      },
      {
        title: "Regulatory Compliance",
        description: "Meet industry standards and compliance requirements"
      },
      {
        title: "Cost Optimization",
        description: "Efficient resource utilization with security best practices"
      }
    ],
    callToAction: {
      title: "Secure Your Cloud Infrastructure",
      description: "Get started with our cloud security solutions",
      buttonText: "Contact Sales"
    }
  },
  'data-security': {
    title: "Data Security Solutions",
    description: "Protect your sensitive data with advanced encryption and access control measures",
    features: [
      {
        title: "Data Encryption",
        description: "Military-grade encryption for data at rest and in transit"
      },
      {
        title: "Access Control",
        description: "Granular access policies and user authentication"
      },
      {
        title: "Data Classification",
        description: "Automated data discovery and classification"
      }
    ],
    benefits: [
      {
        title: "Data Privacy",
        description: "Ensure confidentiality of sensitive information"
      },
      {
        title: "Compliance Ready",
        description: "Meet GDPR, HIPAA, and other regulations"
      },
      {
        title: "Risk Reduction",
        description: "Minimize data breach risks and impacts"
      }
    ],
    callToAction: {
      title: "Protect Your Data",
      description: "Implement robust data security measures",
      buttonText: "Get Started"
    }
  },
  'email-security': {
    title: "Email Security Solutions",
    description: "Advanced email protection against phishing, spam, and sophisticated email-based threats",
    features: [
      {
        title: "Phishing Protection",
        description: "AI-powered detection of phishing attempts and social engineering"
      },
      {
        title: "Spam Filtering",
        description: "Advanced filtering with machine learning algorithms"
      },
      {
        title: "Email Encryption",
        description: "End-to-end encryption for sensitive communications"
      }
    ],
    benefits: [
      {
        title: "Threat Prevention",
        description: "Stop email-based attacks before they reach users"
      },
      {
        title: "Business Continuity",
        description: "Ensure uninterrupted email communications"
      },
      {
        title: "User Protection",
        description: "Safeguard employees from email threats"
      }
    ],
    callToAction: {
      title: "Secure Your Email",
      description: "Protect your organization from email-based threats",
      buttonText: "Learn More"
    }
  },
  'endpoint-security': {
    title: "Endpoint Security Solutions",
    description: "Comprehensive protection for all endpoints with advanced threat detection and response",
    features: [
      {
        title: "Device Protection",
        description: "Real-time protection for all connected devices"
      },
      {
        title: "Threat Prevention",
        description: "Advanced malware detection and prevention"
      },
      {
        title: "Remote Management",
        description: "Centralized control and policy enforcement"
      }
    ],
    benefits: [
      {
        title: "Complete Coverage",
        description: "Protection for all endpoints and devices"
      },
      {
        title: "Quick Response",
        description: "Automated threat detection and response"
      },
      {
        title: "Easy Management",
        description: "Centralized control and monitoring"
      }
    ],
    callToAction: {
      title: "Secure Your Endpoints",
      description: "Protect all your devices with our endpoint security solution",
      buttonText: "Get Protected"
    }
  }
};