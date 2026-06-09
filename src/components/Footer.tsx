import React from 'react';
import { Phone, Mail, Clock, MapPin, Wind, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-extrabold text-white tracking-tight">
                Climatización <span className="text-sky-500">Chavis</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Servicios profesionales de climatización, aire acondicionado y calefacción. Trabajamos en todo Monterrey y área metropolitana con calidad inigualable y honestidad total.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-display font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
              Enlaces rápidos
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm font-semibold">
              <button
                onClick={() => onNavigate('inicio')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => onNavigate('precios')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Precios y tarifas
              </button>
              <button
                onClick={() => onNavigate('contacto')}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Contacta con nosotros
              </button>
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-4 text-sm">
            <h4 className="text-xs font-display font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
              Atención Directa
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-4 h-4 text-sky-500" />
                <a href="tel:8120000005" className="hover:text-white transition-colors font-bold">
                  81 2000 0005
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-sky-500" />
                <a href="mailto:contacto@climatizacionchavis.com" className="hover:text-white transition-colors">
                  contacto@climatizacionchavis.com
                </a>
              </div>
              <div className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                <span className="leading-tight">
                  Monterrey, Nuevo León, México
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Corporate copyright footer */}
      <div className="bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <span>© {new Date().getFullYear()} Climatización Chavis. Todos los derechos reservados.</span>
          <div className="flex items-center space-x-1 justify-center">
            <span>Climatización garantizada con honestidad</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
