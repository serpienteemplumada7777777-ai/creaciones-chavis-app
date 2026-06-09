import React, { useState } from 'react';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Precios from './components/Precios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'precios' | 'contacto'>('inicio');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Sticky Top Navigation */}
      <Header 
        activeSection={activeTab} 
        onNavigate={(id) => setActiveTab(id as 'inicio' | 'precios' | 'contacto')} 
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && (
          <Inicio 
            onNavigateToContact={() => setActiveTab('contacto')}
            onNavigateToPrices={() => setActiveTab('precios')}
          />
        )}
        
        {activeTab === 'precios' && (
          <Precios 
            onNavigateToContact={() => setActiveTab('contacto')}
          />
        )}

        {activeTab === 'contacto' && (
          <Contacto />
        )}
      </main>

      {/* Footer Navigation */}
      <Footer 
        onNavigate={(id) => setActiveTab(id as 'inicio' | 'precios' | 'contacto')} 
      />
    </div>
  );
}
