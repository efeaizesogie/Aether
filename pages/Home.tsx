import React, { useState } from 'react';
import { PageId } from '../types';
import { PRODUCTS, TESTIMONIALS, LIFESTYLE_SPACES } from '../constants';
import { ArrowRight, Move3d, Box, Zap, Leaf, Recycle, Wind, Smartphone, Rotate3d, Layers } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeCustomizerColor, setActiveCustomizerColor] = useState('obsidian');
  const [activeCustomizerMaterial, setActiveCustomizerMaterial] = useState('carbon');
  const [email, setEmail] = useState('');

  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full overflow-hidden bg-aether-dark">
      
      {/* 1. Immersive Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aether-secondary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aether-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-aether-dark/50 via-transparent to-aether-dark"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-16">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-aether-accent/30 bg-aether-accent/10 text-aether-accent text-sm font-mono tracking-widest backdrop-blur-md">
            FUTURE LIVING • EST. 2099
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-600 mb-6 tracking-tighter leading-tight">
            GRAVITY IS <br/><span className="text-aether-accent">OPTIONAL</span>
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-300 font-light tracking-wide mb-10">
            SMART. MODULAR. SUSTAINABLE.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => onNavigate('shop')}
              className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-none skew-x-[-10deg] hover:bg-aether-accent transition-all duration-300 min-w-[200px]"
            >
              <span className="relative z-10 inline-flex items-center gap-2 skew-x-[10deg]">
                EXPLORE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => onNavigate('visualizer')}
              className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded-none skew-x-[-10deg] hover:border-aether-accent hover:text-aether-accent transition-all duration-300 min-w-[200px]"
            >
              <span className="flex items-center gap-2 skew-x-[10deg]">
                <Rotate3d className="h-5 w-5" /> VIEW IN AR
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Design Philosophy */}
      <section className="py-24 border-y border-white/5 bg-aether-panel relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-aether-accent font-mono mb-4 text-sm">THE MANIFESTO</p>
          <p className="text-3xl md:text-5xl font-light leading-relaxed text-gray-300 max-w-4xl mx-auto mb-16">
            We don't build furniture. We engineer <span className="text-white font-bold">habitats</span>. 
            By merging adaptive AI with zero-gravity suspension, we remove the friction between 
            biology and technology.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {['MODULAR', 'INTELLIGENT', 'SUSTAINABLE', 'HUMAN-CENTERED'].map((word) => (
              <span key={word} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-transparent hover:from-aether-secondary transition-all cursor-default select-none">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Collection */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Featured Artifacts</h2>
            <p className="text-gray-400">Curated for the modern vanguard.</p>
          </div>
          <button onClick={() => onNavigate('shop')} className="text-aether-accent hover:text-white transition-colors flex items-center gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex overflow-x-auto pb-8 gap-8 px-4 sm:px-8 snap-x scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[300px] md:min-w-[400px] snap-center group relative cursor-pointer" onClick={() => onNavigate('shop')}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-aether-accent font-mono mb-4">${product.price}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-300">
                    <p className="line-clamp-2">{product.description}</p>
                    <span className="mt-4 inline-block text-white border-b border-aether-accent pb-1">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Smart Furniture Features */}
      <section className="py-24 bg-aether-panel relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <Move3d className="h-10 w-10 text-aether-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Adaptive Ergonomics</h3>
              <p className="text-gray-400 text-sm">Surfaces that reshape in real-time to support your skeletal structure.</p>
            </div>
            <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <Box className="h-10 w-10 text-aether-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Modular Reconfig</h3>
              <p className="text-gray-400 text-sm">Magnetic locking systems allow instant repurposing of any unit.</p>
            </div>
            <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <Zap className="h-10 w-10 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Wireless Power</h3>
              <p className="text-gray-400 text-sm">The entire surface is a charging pad. Never search for a cable again.</p>
            </div>
            <div className="p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <Leaf className="h-10 w-10 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Bio-Materials</h3>
              <p className="text-gray-400 text-sm">Grown from mycelium and graphene. 100% biodegradable longevity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3D / AR Experience Section */}
      <section className="py-32 bg-black overflow-hidden relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aether-secondary/20 via-black to-black"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-6">See It Before It Exists.</h2>
            <p className="text-gray-400 text-lg mb-8">
              Don't guess. Use our military-grade AR visualizer to place Aether artifacts directly into your living space with millimeter precision.
            </p>
            <div className="flex gap-4">
               <button onClick={() => onNavigate('visualizer')} className="px-6 py-3 bg-aether-secondary text-white font-bold rounded hover:bg-white hover:text-black transition-colors">
                 Launch Visualizer
               </button>
               <button onClick={() => onNavigate('visualizer')} className="px-6 py-3 border border-gray-600 text-gray-300 rounded hover:border-white hover:text-white transition-colors">
                 View Tutorial
               </button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center perspective-1000">
             {/* Simulated 3D Element (CSS Cube/Shape) */}
             <div onClick={() => onNavigate('visualizer')} className="relative w-64 h-64 animate-float group cursor-pointer">
                <div className="absolute inset-0 border-2 border-aether-accent/50 rounded-xl transform rotate-45 group-hover:rotate-90 transition-transform duration-1000 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border-2 border-aether-secondary/50 rounded-xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-1000 backdrop-blur-sm"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-aether-accent to-aether-secondary opacity-20 rounded-lg blur-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Move3d className="h-24 w-24 text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
                </div>
                <div className="absolute -bottom-12 left-0 right-0 text-center text-xs font-mono text-aether-accent">
                   INTERACTIVE_MODEL_VIEWER_V1.0
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Customization Studio */}
      <section className="py-24 bg-aether-panel border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">The Forge</h2>
            <p className="text-gray-400">Customize your artifact. Make it yours.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 bg-black/40 p-8 rounded-3xl border border-white/10">
            {/* Preview */}
            <div className={`h-80 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500`} 
                 style={{
                   background: activeCustomizerMaterial === 'carbon' 
                     ? 'radial-gradient(circle at 30% 30%, #333, #000)' 
                     : activeCustomizerMaterial === 'wood' 
                       ? 'url(https://images.unsplash.com/photo-1542456094-555e78dd6a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)' 
                       : 'radial-gradient(circle at 50% 50%, #eee, #aaa)'
                 }}>
               <div className="absolute inset-0 bg-black/20"></div>
               <div className={`w-40 h-40 rounded-2xl shadow-2xl transition-all duration-500 transform rotate-12 flex items-center justify-center border-4`}
                    style={{
                      backgroundColor: activeCustomizerColor === 'obsidian' ? '#111' : activeCustomizerColor === 'lunar' ? '#ddd' : activeCustomizerColor === 'nebula' ? '#4b0082' : '#00f0ff',
                      borderColor: 'rgba(255,255,255,0.1)'
                    }}>
                   <span className="text-white/50 font-mono text-xs mix-blend-difference">AETHER_CORE</span>
               </div>
            </div>

            {/* Controls */}
            <div className="space-y-8">
               <div>
                 <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">01. Select Material</h3>
                 <div className="flex gap-4">
                   {['carbon', 'wood', 'ceramic'].map(mat => (
                     <button 
                        key={mat}
                        onClick={() => setActiveCustomizerMaterial(mat)}
                        className={`px-4 py-2 rounded border transition-all ${activeCustomizerMaterial === mat ? 'border-aether-accent bg-aether-accent/10 text-white' : 'border-white/10 text-gray-500 hover:text-white'}`}
                      >
                        {mat.charAt(0).toUpperCase() + mat.slice(1)}
                      </button>
                   ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">02. Select Finish</h3>
                 <div className="flex gap-4">
                   {[{id: 'obsidian', bg: '#111'}, {id: 'lunar', bg: '#ddd'}, {id: 'nebula', bg: '#4b0082'}, {id: 'cyber', bg: '#00f0ff'}].map(col => (
                     <button 
                        key={col.id}
                        onClick={() => setActiveCustomizerColor(col.id)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${activeCustomizerColor === col.id ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        style={{backgroundColor: col.bg}}
                      />
                   ))}
                 </div>
               </div>

               <div className="pt-4 border-t border-white/10">
                 <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-aether-accent transition-colors">
                   Save Configuration
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Spaces of Tomorrow */}
      <section className="py-24 bg-black">
         <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-4xl font-bold mb-12 border-l-4 border-aether-secondary pl-6">Lifestyle Contexts</h2>
           <div className="grid md:grid-cols-2 gap-8">
             {LIFESTYLE_SPACES.map(space => (
               <div key={space.id} onClick={() => onNavigate('shop')} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
                 <img src={space.image} alt={space.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                 <div className="absolute bottom-0 p-8">
                   <h3 className="text-2xl font-bold text-white mb-2">{space.title}</h3>
                   <p className="text-gray-400 max-w-sm">{space.description}</p>
                   <span className="mt-4 inline-flex items-center gap-2 text-aether-secondary font-bold text-sm">
                     Shop The Look <ArrowRight className="h-4 w-4" />
                   </span>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* 8. Sustainability & Materials */}
      <section className="py-24 bg-aether-dark relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
           <div>
             <h2 className="text-4xl font-bold mb-6 text-white">Closed Loop <span className="text-green-400">Ecosystem</span></h2>
             <p className="text-gray-400 text-lg mb-8 leading-relaxed">
               Every product we make is designed to be unmade. We use algae-based polymers and recycled aerospace alloys to ensure your comfort doesn't cost the planet.
             </p>
             
             <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col">
                 <span className="text-4xl font-mono font-bold text-white">100%</span>
                 <span className="text-gray-500 text-sm flex items-center gap-1"><Recycle className="h-3 w-3" /> Recyclable</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-4xl font-mono font-bold text-white">0</span>
                 <span className="text-gray-500 text-sm flex items-center gap-1"><Wind className="h-3 w-3" /> Carbon Footprint</span>
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl backdrop-blur border border-white/5 flex items-center justify-center aspect-square">
                 <Leaf className="h-16 w-16 text-green-400 opacity-80" />
              </div>
              <div className="bg-white/5 p-6 rounded-2xl backdrop-blur border border-white/5 flex items-center justify-center aspect-square mt-8">
                 <Layers className="h-16 w-16 text-white opacity-80" />
              </div>
           </div>
        </div>
      </section>

      {/* 9. Social Proof */}
      <section className="py-24 bg-aether-panel border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map(testi => (
              <div key={testi.id} className="p-8 bg-black border border-white/10 rounded-xl relative">
                <div className="absolute top-8 right-8 text-aether-accent opacity-20 text-6xl font-serif">"</div>
                <p className="text-xl text-gray-300 mb-6 italic relative z-10">{testi.text}</p>
                <div>
                  <div className="font-bold text-white">{testi.author}</div>
                  <div className="text-aether-accent text-sm uppercase tracking-wider">{testi.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-30 grayscale">
             {/* Fake Logos */}
             <div className="text-2xl font-black font-serif">WIRED</div>
             <div className="text-2xl font-black">THE VERGE</div>
             <div className="text-2xl font-black font-mono">HYPEBEAST</div>
             <div className="text-2xl font-black">ARCHDAILY</div>
          </div>
        </div>
      </section>

      {/* 10. Pre-Order / CTA */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center bg-aether-accent text-black">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Own the Future of Comfort</h2>
          <p className="text-xl font-medium mb-10 opacity-80">
            Limited production run for Q4 2099. Secure your configuration today and receive complimentary white-glove installation.
          </p>
          <button 
            onClick={() => onNavigate('shop')}
            className="px-12 py-5 bg-black text-white font-bold text-xl rounded hover:scale-105 transition-transform shadow-2xl"
          >
            PRE-ORDER NOW
          </button>
          <div className="mt-6 flex justify-center gap-4 text-xs font-bold uppercase opacity-60">
             <span>Ships Globally</span>
             <span>•</span>
             <span>Crypto Accepted</span>
             <span>•</span>
             <span>Lifetime Warranty</span>
          </div>
        </div>
      </section>

      {/* 11. Newsletter */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Smartphone className="h-8 w-8 text-aether-secondary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Join the Inner Circle</h3>
          <p className="text-gray-400 mb-8">Get early access to drops, beta features, and design insights.</p>
          
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="neural_id@net.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:border-aether-accent outline-none"
            />
            <button className="bg-white text-black font-bold px-6 py-3 rounded hover:bg-aether-accent transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </section>

      {/* 12. Footer is handled by main layout, ensuring clean close */}

    </div>
  );
};

export default Home;