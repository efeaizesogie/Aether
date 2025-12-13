export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'seating' | 'storage' | 'lighting' | 'bedroom';
  description: string;
  image: string;
  features: string[];
  techSpecs: string;
}

export interface NavItem {
  label: string;
  id: PageId;
}

export type PageId = 'home' | 'shop' | 'about' | 'visualizer';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
}

export interface LifestyleSpace {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}