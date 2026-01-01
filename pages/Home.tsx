
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000"
            alt="Designer Lamp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-in slide-in-from-left duration-1000">
              The Art of <br /> <span className="text-yellow-400 italic serif">Illumination</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-lg leading-relaxed">
              Curated lighting solutions that transform spaces into experiences. Discover our premium collection of designer lamps.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all transform hover:-translate-y-1"
              >
                Explore Collection
              </Link>
              <Link
                to="/shop/Smart"
                className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Smart Lighting
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stat Box */}
        <div className="absolute bottom-10 right-10 hidden lg:block glass p-8 rounded-lg max-w-sm animate-bounce-slow">
           <div className="flex items-center space-x-4 mb-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs uppercase tracking-widest font-bold">Live AI Designer Online</span>
           </div>
           <p className="text-sm text-gray-600">Need help choosing? Our AI Interior Design assistant is ready to help you curate your perfect home lighting layout.</p>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-yellow-600 font-bold uppercase tracking-[0.2em] text-sm mb-2 block">Premium Selection</span>
            <h2 className="text-4xl font-bold serif">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="text-gray-500 hover:text-black transition-colors border-b border-gray-200 pb-1 mt-4 md:mt-0">
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">New</span>
                )}
                {product.isSale && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">Sale</span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all">View Details</span>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.category}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner / Value Prop */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
             <div className="mb-6 flex justify-center">
                <svg className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <h4 className="text-xl font-bold mb-3 serif">Premium Quality</h4>
             <p className="text-gray-400 font-light">Every piece is handpicked for its material quality and design integrity.</p>
          </div>
          <div className="text-center">
             <div className="mb-6 flex justify-center">
                <svg className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <h4 className="text-xl font-bold mb-3 serif">24/7 Design Help</h4>
             <p className="text-gray-400 font-light">Our AI design consultant is always ready to help you light your life.</p>
          </div>
          <div className="text-center">
             <div className="mb-6 flex justify-center">
                <svg className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
             </div>
             <h4 className="text-xl font-bold mb-3 serif">Secure Checkout</h4>
             <p className="text-gray-400 font-light">Worldwide shipping with encrypted payments and guaranteed delivery.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
         <h2 className="text-5xl font-bold mb-6 serif">Light is an emotion.</h2>
         <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Join our newsletter for exclusive access to designer drops, lighting tips, and 10% off your first order.</p>
         <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
           <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black" />
           <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Join</button>
         </form>
      </section>
    </div>
  );
};

export default Home;
