export interface ServicePage {
  title: string;
  description: string;
  heroImage: string;
  features: {
    title: string;
    description: string;
    image: string;
  }[];
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
    backgroundImage?: string;
  };
}

export interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
}
