import React from 'react';
import { CookingPot } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full max-w-6xl mx-auto px-4 pt-6 pb-2">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/70 backdrop-blur-md border border-saffron-100/50 rounded-2xl p-5 md:px-8 shadow-sm">
        
        {/* Branding */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-saffron-500 to-turmeric-500 text-white p-3 rounded-2xl shadow-md shadow-saffron-500/10">
            <CookingPot className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-saffron-800 tracking-tight font-sans">
              KitchenSathi
            </h1>
            <p className="text-sm font-medium text-turmeric-700 mt-0.5">
              AI-Powered Indian Meal & Grocery Planner
            </p>
          </div>
        </div>

        {/* Small Homely Tag */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-saffron-700 bg-saffron-50 border border-saffron-100 px-3.5 py-1.5 rounded-full">
          <span>🏠 Apka Rasoi Assistant</span>
        </div>
      </div>
    </header>
  );
}
