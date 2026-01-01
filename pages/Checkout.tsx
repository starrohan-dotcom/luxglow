
import React, { useState } from 'react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onClearCart();
  };

  if (cart.length === 0 && step === 'details') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold serif mb-6">Your bag is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
           <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
           </svg>
        </div>
        <h2 className="text-5xl font-bold serif mb-4 text-gray-900">Thank you for your order!</h2>
        <p className="text-xl text-gray-500 mb-10">We've received your request and our lighting experts are preparing your shipment. You'll receive a confirmation email shortly.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold serif mb-8">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
              <input required type="text" placeholder="Last Name" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
            <input required type="text" placeholder="Address" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
            <div className="grid grid-cols-3 gap-4">
               <input required type="text" placeholder="City" className="col-span-1 w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
               <input required type="text" placeholder="State" className="col-span-1 w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
               <input required type="text" placeholder="ZIP" className="col-span-1 w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
            </div>
            
            <h2 className="text-3xl font-bold serif mt-12 mb-8">Payment</h2>
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
               <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-4 rounded-full border-4 border-black"></div>
                  <span className="font-bold text-sm uppercase">Credit Card</span>
               </div>
               <div className="space-y-4">
                 <input required type="text" placeholder="Card Number" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
                 <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
                    <input required type="text" placeholder="CVC" className="w-full px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-black outline-none" />
                 </div>
               </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-8 h-fit rounded-sm sticky top-32">
          <h2 className="text-2xl font-bold serif mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-white border border-gray-200 rounded overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mt-4">
              <span>Total</span>
              <span className="text-yellow-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
