import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ARVisualizer from './components/ARVisualizer';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { PageId, Product, CartItem } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
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
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop addToCart={addToCart} />;
      case 'about':
        return <About />;
      case 'visualizer':
        return <ARVisualizer />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-aether-dark min-h-screen text-aether-text selection:bg-aether-accent selection:text-black font-sans">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <main className="relative z-10">
        {renderPage()}
      </main>

      {currentPage !== 'home' && <Footer />}
    </div>
  );
};

export default App;