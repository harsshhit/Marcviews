export interface ServicePage {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
}