/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Star, 
  Wrench, 
  GraduationCap, 
  Tv, 
  ListTodo, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppItem, PageId } from '../types';

interface HomeViewProps {
  apps: AppItem[];
  setCurrentPage: (page: PageId) => void;
  setCategoryFilter: (category: string) => void;
  onDownload: (app: AppItem) => void;
}

export default function HomeView({
  apps,
  setCurrentPage,
  setCategoryFilter,
  onDownload,
}: HomeViewProps) {
  // Filter for featured and recent apps
  const featuredApps = apps.filter(app => app.isFeatured).slice(0, 4);
  const recentApps = apps.filter(app => app.isRecent || app.id.startsWith('uploaded-'));

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage('catalog');
  };

  return (
    <div className="w-full flex flex-col gap-12 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden bg-[#121418] border-b border-white/5 shadow-inner">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Potencia tu Android con <span className="text-indigo-400 hover:text-indigo-300 transition-colors">Creaciones Chavis</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Descubre una colección de herramientas, juegos emocionantes y aplicaciones de productividad diseñadas para elevar tu experiencia móvil al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setCurrentPage('catalog');
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                id="hero-explore-btn"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                Explorar Ahora
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('recent-releases-sec');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/10 text-white bg-white/5 hover:bg-white/10 px-8 py-3.5 rounded-full text-xs font-bold active:scale-98 transition-all cursor-pointer text-center"
                id="hero-news-btn"
              >
                Ver Novedades
              </button>
            </div>
          </div>

          {/* Floating Phone with indigo holographic highlights */}
          <div className="flex-1 relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-indigo-600/5 hover:shadow-indigo-600/10 hover:-translate-y-1 border border-white/5 transition-all duration-300">
            <img 
              alt="Móvil flotante inteligente" 
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEFgWY6s9nfCS_ed88KkwQmQO0gRCYAoPul3RA_gOrR25UzeGM3MTfjwXy7skgm_5rsnsqyoasEHUQgWZnWVf7MewHbNmwHn7ZyOAal2ixwqodwPzYdeE0HOaB3bJ-JmdKvOwmx3EHIQRs24vpU5NjdIhlOCDrVxJ3e8D0kY5HaAljhcsS6ug8rhMhyWgjBZ0kcuJZQ5OmcWxBmgswWTp0jv5snWgZuvKv9SmGgFel7kVlsHpFmyiKPsYTU2T4Ur67UOpsy6Y_yDs"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORÍAS DESTACADAS */}
      <section className="py-2 max-w-[1280px] mx-auto px-4 md:px-16 w-full">
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">
          Categorías Destacadas
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Herramientas */}
          <div 
            onClick={() => handleCategoryClick('Tools')}
            className="bg-[#121418] p-6 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex flex-col items-center text-center group border border-white/5 hover:border-indigo-500/30 shadow-3xs"
          >
            <div className="w-16 h-16 bg-indigo-600/10 text-indigo-450 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Wrench className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="font-bold text-sm text-slate-100">Herramientas</span>
          </div>

          {/* Educación */}
          <div 
            onClick={() => handleCategoryClick('Education')}
            className="bg-[#121418] p-6 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex flex-col items-center text-center group border border-white/5 hover:border-indigo-500/30 shadow-3xs"
          >
            <div className="w-16 h-16 bg-indigo-600/10 text-indigo-450 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <GraduationCap className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="font-bold text-sm text-slate-100">Educación</span>
          </div>

          {/* Entretenimiento */}
          <div 
            onClick={() => handleCategoryClick('Entertainment')}
            className="bg-[#121418] p-6 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex flex-col items-center text-center group border border-white/5 hover:border-indigo-500/30 shadow-3xs"
          >
            <div className="w-16 h-16 bg-indigo-600/10 text-indigo-450 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Tv className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="font-bold text-sm text-slate-100">Entretenimiento</span>
          </div>

          {/* Productividad */}
          <div 
            onClick={() => handleCategoryClick('Productivity')}
            className="bg-[#121418] p-6 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex flex-col items-center text-center group border border-white/5 hover:border-indigo-500/30 shadow-3xs"
          >
            <div className="w-16 h-16 bg-indigo-600/10 text-indigo-450 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <ListTodo className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="font-bold text-sm text-slate-100">Productividad</span>
          </div>
        </div>
      </section>

      {/* 3. APLICACIONES DESTACADAS */}
      <section className="py-8 border-y border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 w-full">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Aplicaciones Destacadas
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Seleccionadas por nuestros expertos y recomendadas
              </p>
            </div>
            <button 
              onClick={() => {
                setCategoryFilter('all');
                setCurrentPage('catalog');
              }}
              className="text-indigo-400 hover:text-indigo-300 text-xs uppercase tracking-wider font-bold flex items-center gap-1 cursor-pointer"
            >
              Ver todas
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApps.map((app) => (
              <div 
                key={app.id} 
                className="bg-[#121418] p-5 rounded-2xl border border-white/5 shadow-xs hover:shadow-lg hover:border-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="w-full aspect-square bg-[#0A0B0D] rounded-xl mb-4 overflow-hidden border border-white/5 relative">
                  <img 
                    alt={app.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                    src={app.iconUrl}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.title)}&background=4f46e5&color=fff&size=128&rounded=true`;
                    }}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-base text-white mb-0.5 group-hover:text-indigo-400 transition-colors truncate">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mb-2">{app.developer}</p>
                  
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center text-[#ffb400]">
                      <Star className="w-3.5 h-3.5 fill-[#ffb400] stroke-[#ffb400]" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">{app.rating}</span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-xs text-slate-400 font-medium">{app.size}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDownload(app)}
                  className="w-full bg-white/5 hover:bg-indigo-600 text-slate-200 hover:text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer active:scale-97 border border-white/5 hover:border-transparent transition-all shadow-2xs mt-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LANZAMIENTOS RECIENTES (HORIZONTAL SCROLL) */}
      <section className="py-4 max-w-[1280px] mx-auto px-4 md:px-16 w-full" id="recent-releases-sec">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Lanzamientos Recientes
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Lo último publicado por los desarrolladores en nuestra tienda
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-white/5 hover:border-white/10 bg-[#121418] hover:bg-white/5 active:scale-90 transition-all cursor-pointer text-slate-400 hover:text-white shadow-3xs"
              id="scroll-left"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-white/5 hover:border-white/10 bg-[#121418] hover:bg-white/5 active:scale-90 transition-all cursor-pointer text-slate-400 hover:text-white shadow-3xs"
              id="scroll-right"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x scroll-smooth pb-4 outline-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {recentApps.map((app) => (
            <div 
              key={app.id} 
              onClick={() => {
                setCategoryFilter('all');
                setCurrentPage('catalog');
              }}
              className="min-w-[270px] max-w-[270px] snap-start bg-[#121418] hover:bg-white/[0.04] p-3 rounded-xl flex items-center gap-3.5 border border-white/5 hover:border-indigo-500/30 hover:shadow-xs transition-all duration-200 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 bg-[#0A0B0D]">
                <img 
                  alt={app.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform" 
                  src={app.iconUrl}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.title)}&background=4f46e5&color=fff&size=64&rounded=true`;
                  }}
                />
              </div>
              <div className="overflow-hidden flex-grow">
                <h4 className="font-semibold text-xs text-white truncate group-hover:text-indigo-400 transition-colors">
                  {app.title}
                </h4>
                <p className="text-2xs text-slate-400 mt-0.5 truncate">{app.developer}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-[#ffb400] stroke-[#ffb400]" />
                  <span className="text-3xs font-bold text-slate-350">{app.rating}</span>
                  <span className="text-slate-600 text-3xs">•</span>
                  <span className="text-3xs text-slate-400 font-medium">{app.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
