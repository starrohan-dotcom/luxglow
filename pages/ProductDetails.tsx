
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { generateProductPitch } from '../services/geminiService';

interface ProductDetailsProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [aiPitch, setAiPitch] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const p = PRODUCTS.find(item => item.id === id);
    if (p) {
      setProduct(p);
      generateProductPitch(p.name, p.category).then(setAiPitch);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity">
                <img src={`https://picsum.photos/seed/${product.id}${i}/400/400`} alt="Detail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <nav className="text-sm text-gray-500 mb-6">
            <span className="hover:text-black cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-black cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
            <span className="mx-2">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold serif mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-900 font-light mb-8">${product.price.toFixed(2)}</p>

          {aiPitch && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-sm italic text-gray-700">"{aiPitch}"</p>
              <p className="text-[10px] uppercase tracking-widest text-yellow-600 font-bold mt-2">LuxGlow AI Insight</p>
            </div>
          )}

          <div className="space-y-6 mb-10">
            <div className="flex items-center space-x-4">
               <div className="flex border border-gray-300 rounded">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100 transition-colors">-</button>
                 <span className="px-6 py-2 border-x border-gray-300 font-bold">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100 transition-colors">+</button>
               </div>
               <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) onAddToCart(product);
                  setQuantity(1);
                }}
                className="flex-1 bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
               >
                 Add to Bag
               </button>
            </div>
            <button className="w-full border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Buy It Now</button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
             <div className="flex space-x-8 py-4">
               {(['description', 'specs', 'shipping'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`text-xs font-bold uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${
                     activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
             </div>
             <div className="py-6 text-sm text-gray-600 leading-relaxed">
                {activeTab === 'description' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {product.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="border-b border-gray-100 pb-2">
                        <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">{k.replace('_', ' ')}</p>
                        <p className="font-medium text-black">{v}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p>Free white-glove delivery on orders over $500.</p>
                    <p>Standard delivery (3-5 business days): $15.00</p>
                    <p>Returns accepted within 30 days of purchase. Items must be in original packaging.</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
      
      {/* Recommended */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold serif mb-10">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
               <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <h3 className="font-medium">{p.name}</h3>
               <p className="text-gray-500 text-sm">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
