
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Category } from '../types';

const Shop: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');

  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory as Category);
    } else {
      setActiveCategory('All');
    }
  }, [urlCategory]);

  const categories: (Category | 'All')[] = ['All', 'Table', 'Floor', 'Pendant', 'Wall', 'Smart'];

  const filteredProducts = PRODUCTS.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  ).sort((a, b) => {
    if (sortBy === 'low') return a.price - b.price;
    if (sortBy === 'high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-5xl font-bold serif mb-2">The Collection</h1>
          <p className="text-gray-500">{filteredProducts.length} masterpieces found</p>
        </div>

        <div className="mt-6 md:mt-0 flex flex-wrap gap-4 items-center">
           <div className="flex bg-gray-100 rounded-full p-1 overflow-x-auto">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                   activeCategory === cat ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
           
           <select 
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value as any)}
             className="bg-transparent border-b border-gray-200 py-2 text-sm focus:outline-none"
           >
             <option value="featured">Featured</option>
             <option value="low">Price: Low to High</option>
             <option value="high">Price: High to Low</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 border-t border-gray-100">
                <button className="w-full py-2 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Quick Add</button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-900 group-hover:text-yellow-600 transition-colors">{product.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{product.category}</p>
              </div>
              <p className="text-base font-bold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-400 serif">We couldn't find any products in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
