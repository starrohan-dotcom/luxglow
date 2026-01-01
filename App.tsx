
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('luxglow_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luxglow_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)} 
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onClearCart={clearCart} />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">
               <div className="col-span-2">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full blur-[1px]"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase serif">LuxGlow</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                    Curating high-end illumination solutions for modern living. We believe lighting is the most important element of any interior.
                  </p>
               </div>
               <div>
                 <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Collections</h5>
                 <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-black transition-colors"><a href="#/shop/Table">Table Lamps</a></li>
                    <li className="hover:text-black transition-colors"><a href="#/shop/Floor">Floor Lamps</a></li>
                    <li className="hover:text-black transition-colors"><a href="#/shop/Pendant">Pendant Lights</a></li>
                    <li className="hover:text-black transition-colors"><a href="#/shop/Smart">Smart Series</a></li>
                 </ul>
               </div>
               <div>
                 <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Company</h5>
                 <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-black transition-colors">Our Story</li>
                    <li className="hover:text-black transition-colors">Artisans</li>
                    <li className="hover:text-black transition-colors">Sustainability</li>
                    <li className="hover:text-black transition-colors">Contact</li>
                 </ul>
               </div>
               <div>
                 <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Support</h5>
                 <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-black transition-colors">Shipping</li>
                    <li className="hover:text-black transition-colors">Returns</li>
                    <li className="hover:text-black transition-colors">Trade Program</li>
                    <li className="hover:text-black transition-colors">FAQ</li>
                 </ul>
               </div>
               <div>
                 <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Social</h5>
                 <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-black transition-colors">Instagram</li>
                    <li className="hover:text-black transition-colors">Pinterest</li>
                    <li className="hover:text-black transition-colors">Houzz</li>
                 </ul>
               </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
               <p>© 2024 LuxGlow Lighting Group. All rights reserved.</p>
               <div className="flex space-x-6">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>Accessibility</span>
               </div>
            </div>
          </div>
        </footer>

        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />

        <AIChatbot />
      </div>
    </Router>
  );
};

export default App;
