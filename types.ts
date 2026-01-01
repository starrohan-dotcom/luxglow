
export type Category = 'Table' | 'Floor' | 'Pendant' | 'Wall' | 'Smart';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
