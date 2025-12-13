import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ShoppingCart, Filter, Info } from 'lucide-react';

interface ShopProps {
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const categories = ['all', 'seating', 'bedroom', 'storage', 'lighting'];

  return (
    <div className="pt-24 min-h-screen pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">The Catalog</h1>
          <p className="text-gray-400">Next-generation furniture for the discerning futurist.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-aether-accent text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              } capitalize whitespace-nowrap`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative bg-aether-panel border border-white/5 rounded-2xl overflow-hidden hover:border-aether-accent/30 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aether-panel to-transparent opacity-80"></div>
              
              <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-aether-accent transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Order
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-aether-accent transition-colors">{product.name}</h3>
                <span className="font-mono text-aether-accent">${product.price}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              {/* Specs Details Hover Reveal */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feat, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">
                      {feat}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 font-mono flex items-center gap-1 mt-2">
                  <Info className="h-3 w-3" /> {product.techSpecs.split('|')[0]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;