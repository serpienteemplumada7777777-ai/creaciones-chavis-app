/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, Mail, Share2, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  appsCount: number;
}

export default function Footer({ setCurrentPage, appsCount }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Creaciones Chavis App',
        text: '¡Descubre y descarga las mejores aplicaciones Android en el marketplace de Creaciones Chavis!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Enlace de la tienda copiado al portapapeles');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#121418] text-slate-300 tracking-tight mt-16 mb-16 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16 max-w-[1280px] mx-auto w-full text-center md:text-left">
        
        {/* Brand Widget */}
        <div className="flex flex-col gap-3">
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 justify-center md:justify-start cursor-pointer group"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <span className="font-bold text-base">C</span>
            </div>
            <span className="text-lg font-bold text-white">
              Creaciones <span className="text-indigo-400">Chavis</span> App
            </span>
          </div>
          <p className="text-slate-400 text-xs font-sans leading-relaxed max-w-sm mx-auto md:mx-0">
            Tu destino número uno para las mejores aplicaciones y juegos de Android, seleccionados con pasión, rigor técnico y un catálogo en continuo crecimiento ({appsCount} aplicaciones disponibles).
          </p>
        </div>

        {/* Recursos */}
        <div>
          <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-widest mb-4">
            Recursos
          </h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="#support" className="hover:text-indigo-400 transition-colors hover:underline">
                Soporte y Preguntas Frecuentes
              </a>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('upload')} 
                className="hover:text-indigo-400 transition-colors hover:underline text-left cursor-pointer"
              >
                Portal de Desarrolladores
              </button>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-400 transition-colors hover:underline">
                Nosotros e Historia
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-widest mb-4">
            legal
          </h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a href="#privacy" className="hover:text-indigo-400 transition-colors hover:underline">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-indigo-400 transition-colors hover:underline">
                Términos del Servicio
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:text-indigo-400 transition-colors hover:underline">
                Ajustes de Cookies
              </a>
            </li>
          </ul>
        </div>

        {/* Redes e Interacciones */}
        <div>
          <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-widest mb-4">
            Contacto & Social
          </h4>
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <a 
              href="https://creacioneschavis.example.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#1e222b] flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-600/10 transition-all shadow-3xs border border-white/5"
              title="Visitar Sitio Web"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a 
              href="mailto:serpienteemplumada7777777@gmail.com"
              className="w-8 h-8 rounded-full bg-[#1e222b] flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-600/10 transition-all shadow-3xs border border-white/5"
              title="Enviar Correo Electrónico"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button 
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-[#1e222b] flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-600/10 cursor-pointer transition-all shadow-3xs border border-white/5"
              title="Compartir Marketplace"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a 
              href="#help"
              className="w-8 h-8 rounded-full bg-[#1e222b] flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-600/10 transition-all shadow-3xs border border-white/5"
              title="Obtener Ayuda"
            >
              <HelpCircle className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-400 text-2xs leading-relaxed max-w-sm mx-auto md:mx-0">
            Soporte oficial provisto para usuarios de Creaciones Chavis App de manera remota e instantánea.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-slate-500">
          © {currentYear} Creaciones Chavis App. Todos los derechos reservados. Diseñado con altos estándares para Android.
        </p>
      </div>
    </footer>
  );
}
