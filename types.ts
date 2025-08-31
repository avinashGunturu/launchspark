
export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  idealFor: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  sector: string;
  category: string;
  imageUrl: string;
  description:string;
  priceRange: string;
  liveUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  imageUrl: string;
}