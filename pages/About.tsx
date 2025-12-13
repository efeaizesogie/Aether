import React from 'react';
import { Layers, ShieldCheck, Zap, Globe, Users, Dna, Rocket } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
      {/* Hero */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aether-accent/10 rounded-full blur-[100px] z-0"></div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter relative z-10 text-white">
          THE AETHER <span className="text-aether-secondary">PROTOCOL</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed relative z-10">
          Founded in 2088, Aether began with a simple question: <br/>
          <span className="text-white font-bold">Why is furniture still bound by gravity?</span>
        </p>
      </div>

      <div className="space-y-32">
        {/* Core Tech */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-aether-accent">01.</span> Anti-Gravity Weave
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Our patented G-Web™ technology uses localized electromagnetic fields to create suspension surfaces that adapt perfectly to the user's mass and skeletal structure. It's not just sitting; it's floating.
            </p>
            <div className="flex gap-4">
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <span className="block text-2xl font-bold text-white mb-1">Zero</span>
                <span className="text-xs text-gray-500 uppercase">Pressure Points</span>
              </div>
               <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <span className="block text-2xl font-bold text-white mb-1">10ms</span>
                <span className="text-xs text-gray-500 uppercase">Response Time</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
             <div className="absolute inset-0 bg-aether-accent/20 blur-xl transform rotate-3"></div>
             <div className="relative aspect-square bg-black border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center group">
               <Layers className="h-48 w-48 text-aether-accent opacity-50 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-tr from-aether-accent/10 to-transparent"></div>
             </div>
          </div>
        </div>

        {/* Neural Connectivity */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute inset-0 bg-aether-secondary/20 blur-xl transform -rotate-3"></div>
             <div className="relative aspect-square bg-black border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center group">
               <Zap className="h-48 w-48 text-aether-secondary opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-bl from-aether-secondary/10 to-transparent"></div>
             </div>
          </div>
          <div>
             <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-aether-secondary">02.</span> Neural Connectivity
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Every piece of Aether furniture is a node in your home's neural network. Your bed talks to your lights. Your chair talks to your thermostat. The ecosystem learns your habits to optimize your environment for productivity or rest.
            </p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="border-t border-white/10 pt-24">
          <h3 className="text-3xl font-bold text-center mb-16">The Evolution</h3>
          <div className="relative">
            <div className="absolute left-1/2 w-0.5 h-full bg-white/10 -translate-x-1/2"></div>
            <div className="space-y-12">
               {[
                 { year: '2088', title: 'The Inception', desc: 'Dr. Aris Thorne prototypes the first MagLev chair in a garage in Neo-Seoul.' },
                 { year: '2092', title: 'Series A Launch', desc: 'Aether goes public. The Zero-G Lounge v1 sells out in 4 seconds globally.' },
                 { year: '2095', title: 'Bio-Sync Integration', desc: 'Partnership with NeuralLink enables furniture to respond to user thought patterns.' },
                 { year: '2099', title: 'The Present', desc: 'Expanding the ecosystem to Martian colonies and orbital stations.' }
               ].map((item, idx) => (
                 <div key={idx} className={`flex items-center justify-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 text-right ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                       <div className={`p-6 bg-white/5 border border-white/5 rounded-xl inline-block max-w-sm ${idx % 2 !== 0 && 'md:ml-auto'}`}>
                          <span className="text-aether-accent font-mono text-xl font-bold block mb-2">{item.year}</span>
                          <h4 className="text-white font-bold mb-2">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                       </div>
                    </div>
                    <div className="w-4 h-4 bg-aether-accent rounded-full relative z-10 ring-4 ring-black"></div>
                    <div className="w-1/2"></div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Material Science */}
        <div className="bg-white/5 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-[100px] rounded-full"></div>
           <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                 <Dna className="text-green-400" /> Material Science
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Mycelium 2.0</h3>
                    <p className="text-gray-400 text-sm">Genetically modified fungal networks grown into rigid structures. 5x stronger than steel, 10x lighter.</p>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Self-Healing Glass</h3>
                    <p className="text-gray-400 text-sm">Nanobot-infused silica layers that repair micro-fractures instantly using ambient thermal energy.</p>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Atmospheric Carbon</h3>
                    <p className="text-gray-400 text-sm">All plastics are synthesized directly from captured CO2, making our factories carbon negative.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Team/Join */}
        <div className="text-center">
           <h2 className="text-4xl font-bold mb-6">Built by Visionaries</h2>
           <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
             Our team consists of architects, neurologists, material scientists, and AI specialists working in unison.
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map(i => (
                 <div key={i} className="group">
                    <div className="aspect-square rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-aether-accent transition-colors">
                       <img src={`https://randomuser.me/api/portraits/lego/${i}.jpg`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Team" />
                    </div>
                    <div className="font-mono text-sm text-gray-500">UNIT {i}</div>
                 </div>
              ))}
           </div>
           <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-aether-accent transition-colors">
              Join the Mission
           </button>
        </div>

      </div>
    </div>
  );
};

export default About;