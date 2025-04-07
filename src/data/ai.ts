import { ServicePage } from '../types';

export const aiData: Record<string, ServicePage> = {
  'security': {
    title: "AI-Powered Security Solutions",
    description: "Next-generation security powered by artificial intelligence and machine learning",
    features: [
      {
        title: "Predictive Analytics",
        description: "Advanced threat prediction using machine learning algorithms"
      },
      {
        title: "Behavioral Analysis",
        description: "AI-driven user and entity behavior analytics"
      },
      {
        title: "Automated Response",
        description: "Intelligent automated threat response and remediation"
      }
    ],
    benefits: [
      {
        title: "Proactive Protection",
        description: "Identify and prevent threats before they occur"
      },
      {
        title: "Reduced False Positives",
        description: "Enhanced accuracy in threat detection"
      },
      {
        title: "24/7 Monitoring",
        description: "Continuous AI-powered security monitoring"
      }
    ],
    callToAction: {
      title: "Enhance Your Security with AI",
      description: "Leverage the power of AI for advanced security",
      buttonText: "Get Started"
    }
  },
  'machine-learning': {
    title: "Machine Learning Solutions",
    description: "Custom machine learning solutions for enhanced security and automation",
    features: [
      {
        title: "Pattern Recognition",
        description: "Advanced pattern detection in security events"
      },
      {
        title: "Anomaly Detection",
        description: "ML-powered identification of security anomalies"
      },
      {
        title: "Predictive Modeling",
        description: "Future threat prediction and risk assessment"
      }
    ],
    benefits: [
      {
        title: "Intelligent Insights",
        description: "Data-driven security decision making"
      },
      {
        title: "Automated Learning",
        description: "Continuous improvement of security measures"
      },
      {
        title: "Scalable Solutions",
        description: "Adaptable ML models for growing needs"
      }
    ],
    callToAction: {
      title: "Transform Your Security",
      description: "Implement machine learning for advanced protection",
      buttonText: "Learn More"
    }
  },
  'automation': {
    title: "Security Automation Solutions",
    description: "Streamline security operations with intelligent automation",
    features: [
      {
        title: "Workflow Automation",
        description: "Automated security incident handling and response"
      },
      {
        title: "Smart Orchestration",
        description: "Intelligent coordination of security tools"
      },
      {
        title: "Automated Compliance",
        description: "Automated compliance monitoring and reporting"
      }
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Faster response to security incidents"
      },
      {
        title: "Reduced Workload",
        description: "Automated handling of routine tasks"
      },
      {
        title: "Consistent Response",
        description: "Standardized security procedures"
      }
    ],
    callToAction: {
      title: "Automate Your Security",
      description: "Streamline operations with intelligent automation",
      buttonText: "Get Started"
    }
  }
};