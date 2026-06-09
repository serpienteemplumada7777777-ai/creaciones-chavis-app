import React, { useState } from 'react';
import { Menu, X, Wind, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'precios', label: 'Precios' },
    { id: 'contacto', label: 'Contacta con nosotros' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Top small quick contact bar */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
              <a href="tel:8120000005" className="hover:text-white transition-colors font-semibold">
                81 2000 0005
              </a>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center">
              <Mail className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
              <a href="mailto:contacto@climatizacionchavis.com" className="hover:text-white transition-colors">
                contacto@climatizacionchavis.com
              </a>
            </span>
          </div>
          <div className="text-[10px] font-bold text-sky-400 bg-slate-850 px-2 py-0.5 rounded font-sans">
            MONTERREY, NL
          </div>
        </div>
      </div>

      {/* Main Brand & Nav bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo */}
        <div 
          onClick={() => handleNavClick('inicio')}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <div className="p-2 bg-sky-600 text-white rounded-xl shadow-md shadow-sky-600/20">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-lg font-display font-black text-slate-900 tracking-tight">Climatización</span>
              <span className="text-lg font-display font-black text-sky-600 tracking-tight ml-1">Chavis</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest block font-sans">
              CONFORT PROFESIONAL
            </span>
          </div>
        </div>

        {/* Desktop Web Nav */}
        <nav className="hidden md:flex items-center space-x-1 font-sans">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('contacto')}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-sans font-extrabold text-xs uppercase tracking-wide rounded-xl transition-all cursor-pointer shadow-md shadow-sky-600/15"
          >
            Presupuesto Gratis
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg outline-none transition-colors"
            aria-label="Menú"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 shadow-inner animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-100 mt-2">
            <button
              onClick={() => handleNavClick('contacto')}
              className="w-full text-center bg-sky-600 text-white py-3 rounded-xl font-sans font-bold text-sm shadow-md"
            >
              Presupuesto Gratis
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
