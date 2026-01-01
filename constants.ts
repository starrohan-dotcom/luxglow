
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nordic Eclipse Pendant',
    category: 'Pendant',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&q=80&w=800',
    description: 'A masterpiece of minimalism, the Eclipse Pendant creates a celestial atmosphere with its indirect lighting.',
    features: ['Matte black finish', 'Dimmable LED', 'Adjustable cable length'],
    specs: { material: 'Aluminum', light: 'LED 3000K', voltage: '110-240V' },
    isNew: true
  },
  {
    id: '2',
    name: 'Aura Glass Table Lamp',
    category: 'Table',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    description: 'Hand-blown ribbed glass meets brushed brass for a sophisticated, warm glow perfect for any nightstand.',
    features: ['Hand-blown glass', 'Solid brass base', 'Soft touch switch'],
    specs: { material: 'Glass & Brass', light: 'E27 socket', size: '30cm x 15cm' },
    isSale: true
  },
  {
    id: '3',
    name: 'Sentinel Marble Floor Lamp',
    category: 'Floor',
    price: 499.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed657adbbd?auto=format&fit=crop&q=80&w=800',
    description: 'The Sentinel combines the heavy presence of Carrara marble with a slender arc of stainless steel.',
    features: ['Natural marble base', 'Telescopic arm', 'Foot pedal switch'],
    specs: { weight: '15kg', height: '210cm', reach: '160cm' }
  },
  {
    id: '4',
    name: 'Prism Geometry Wall Sconce',
    category: 'Wall',
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800',
    description: 'Angular design meets atmospheric lighting. The Prism casts dramatic shadows on your walls.',
    features: ['Easy installation', 'Two-way lighting', 'Modern silhouette'],
    specs: { material: 'Steel', IP_Rating: 'IP20', power: '12W' }
  },
  {
    id: '5',
    name: 'Spectrum Smart Mood Light',
    category: 'Smart',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=800',
    description: 'Control your mood via smartphone. 16 million colors and deep integration with smart home systems.',
    features: ['App control', 'RGBIC technology', 'Music sync'],
    specs: { connectivity: 'WiFi/BT', app: 'LuxGlow App', brightness: '800lm' },
    isNew: true
  },
  {
    id: '6',
    name: 'Zenith Rattan Pendant',
    category: 'Pendant',
    price: 219.00,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
    description: 'Bring nature indoors. Hand-woven rattan creates organic shadow patterns in a bohemian style.',
    features: ['Natural materials', 'Sustainably sourced', 'Unique texture'],
    specs: { material: 'Rattan & Bamboo', diameter: '45cm', bulb: 'G95 LED' }
  },
  {
    id: '7',
    name: 'Titan Industrial Desk Lamp',
    category: 'Table',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1506332841151-278ec9b034b3?auto=format&fit=crop&q=80&w=800',
    description: 'A rugged yet refined workspace companion with fully adjustable joints and a weighted base.',
    features: ['Spring-tension joints', 'Industrial finish', 'Non-slip base'],
    specs: { material: 'Cast Iron', max_height: '65cm', weight: '3.2kg' }
  },
  {
    id: '8',
    name: 'Lunar Ceramic Orb',
    category: 'Table',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1517991104123-1d56a72906ec?auto=format&fit=crop&q=80&w=800',
    description: 'A soft, textured ceramic sphere that glows from within, mimicking the soft light of the moon.',
    features: ['Textured finish', 'Wireless charging base', 'Rechargeable'],
    specs: { battery: '8h runtime', charging: 'USB-C/Qi', diameter: '18cm' }
  }
];
