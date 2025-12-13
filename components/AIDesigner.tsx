import React, { useState, useRef, useEffect } from 'react';
import { generateInteriorAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIDesigner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the AETHER Design Core. Describe your space or desired atmosphere, and I will calculate the optimal configuration.' }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setHistory(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    // Simulate thinking time for effect, then fetch real API
    const advice = await generateInteriorAdvice(query);
    
    setLoading(false);
    setHistory(prev => [...prev, { role: 'model', text: advice }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pt-24 min-h-screen px-4 max-w-4xl mx-auto pb-12 flex flex-col h-screen">
      <div className="flex-none mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aether-accent to-aether-secondary mb-2">
          AETHER AI ARCHITECT
        </h1>
        <p className="text-gray-500 text-sm font-mono">POWERED BY GEMINI 2.5 FLASH</p>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-aether-panel border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-700' : 'bg-aether-accent/20 border border-aether-accent/50'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} className="text-aether-accent" />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-white/10 text-white rounded-tr-none' 
                    : 'bg-black/40 border border-white/5 text-gray-200 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="flex gap-4 max-w-[80%]">
                 <div className="w-10 h-10 rounded-full bg-aether-accent/20 border border-aether-accent/50 flex items-center justify-center flex-shrink-0 animate-pulse">
                   <Sparkles size={20} className="text-aether-accent" />
                 </div>
                 <div className="p-4 bg-black/40 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none">
                   <div className="flex space-x-2">
                     <div className="w-2 h-2 bg-aether-accent rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-aether-accent rounded-full animate-bounce delay-75"></div>
                     <div className="w-2 h-2 bg-aether-accent rounded-full animate-bounce delay-150"></div>
                   </div>
                 </div>
               </div>
             </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your room vibe (e.g., 'Dark cyber-punk bedroom with neon lights')..."
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-aether-accent/50 focus:ring-1 focus:ring-aether-accent/50 transition-all placeholder-gray-600"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !query.trim()}
              className="absolute right-2 p-2 bg-aether-accent text-black rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesigner;