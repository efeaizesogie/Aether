import React from 'react';
import { Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-aether-panel border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">AETHER</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Redefining living spaces with anti-gravity technology and neural aesthetics.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-aether-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-aether-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-aether-accent transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Aether Industries. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;