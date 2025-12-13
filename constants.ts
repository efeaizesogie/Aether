import { Product, NavItem, Testimonial, LifestyleSpace } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', id: 'home' },
  { label: 'CATALOG', id: 'shop' },
  { label: 'AR VISUALIZER', id: 'visualizer' },
  { label: 'TECHNOLOGY', id: 'about' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zero-G Lounge v4',
    price: 4500,
    category: 'seating',
    description: 'Experience true weightlessness with our magnetic levitation suspension system. The chair adapts to your spine in real-time.',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800&auto=format&fit=crop',
    features: ['MagLev Suspension', 'Haptic Massage', 'Bio-metric Sensors'],
    techSpecs: 'Load cap: 150kg | Power: Wireless Induction'
  },
  {
    id: '2',
    name: 'Nebula Smart Bed',
    price: 8200,
    category: 'bedroom',
    description: 'A bed that controls your dreams. Uses localized sound waves and temperature gradients to induce deep REM sleep cycles.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop',
    features: ['Temp Control', 'Lucid Dream Induction', 'Morning Simulation'],
    techSpecs: 'OS: SleepOS 2.1 | Connectivity: NeuralLink Compatible'
  },
  {
    id: '3',
    name: 'Quantum Storage Array',
    price: 2100,
    category: 'storage',
    description: 'Modular storage units with holographic contents display. Never open a drawer to check what is inside again.',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=800&auto=format&fit=crop',
    features: ['Holo-Index', 'Voice Retrieval', 'Auto-Sort'],
    techSpecs: 'Modules: 12 | Display: 8K Micro-Projector'
  },
  {
    id: '4',
    name: 'Photon Arc Lamp',
    price: 899,
    category: 'lighting',
    description: 'Solid state light sculpture that bends photons to create impossible geometries. Syncs with your circadian rhythm.',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
    features: ['Zero-Heat', '16M Colors', 'Gesture Control'],
    techSpecs: 'Lumens: 5000 | Lifespan: 100 Years'
  },
  {
    id: '5',
    name: 'Void Desk',
    price: 3400,
    category: 'storage',
    description: 'A desk surface made of smart-glass that turns opaque on touch and displays your digital workspace directly on the surface.',
    image: 'https://images.unsplash.com/photo-1520032525096-7bd04a94b5a4?q=80&w=800&auto=format&fit=crop',
    features: ['Touch Surface', 'Wireless Charging Spot', 'Invisible PC'],
    techSpecs: 'Resolution: 6K | OS: Windows/Mac/Linux'
  },
  {
    id: '6',
    name: 'Aeris Air Purifier',
    price: 1200,
    category: 'lighting',
    description: 'Combines ambient lighting with molecular air reconstruction. Turns CO2 into fresh Oxygen while lighting your room.',
    image: 'https://images.unsplash.com/photo-1585776245991-cf79dd6816f7?q=80&w=800&auto=format&fit=crop',
    features: ['O2 Generation', 'Scent Synthesis', 'Mood Light'],
    techSpecs: 'Coverage: 500sqft | Filter: Graphene'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    text: "The Nebula Smart Bed literally cured my insomnia in three nights. It's not furniture; it's medical-grade magic.",
    author: "Dr. Aris Thorne",
    role: "Neuroscientist"
  },
  {
    id: 't2',
    text: "Aether's aesthetic defines the post-gravity era. Minimal, functional, and deeply intelligent.",
    author: "Elena Vox",
    role: "Chief Architect, Neo-Tokyo"
  }
];

export const LIFESTYLE_SPACES: LifestyleSpace[] = [
  {
    id: 's1',
    title: 'Home Office 2030',
    description: 'Seamless integration of Void Desk and Holo-Arrays for maximum cognitive flow.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 's2',
    title: 'Urban Sanctuary',
    description: 'Compressed living spaces expanded through MagLev stacking technology.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];