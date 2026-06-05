/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, Upload, User } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalAppsCount: number;
}

export default function Header({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  totalAppsCount,
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentPage('catalog');
  };

  return (
    <header className="w-full h-16 border-b border-white/5 bg-[#121418] sticky top-0 z-50">
      <nav className="flex justify-between items-center px-4 md:px-16 max-w-[1280px] mx-auto w-full h-full gap-4">
        {/* Logo/Brand */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none active:scale-98 transition-all"
          id="logo-brand"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
            Creaciones <span className="text-indigo-400">Chavis</span> App
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center ml-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`font-semibold py-1 px-2 text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-400 border-transparent hover:text-white hover:border-white/10'
            }`}
            id="nav-home"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setLocalSearch('');
              setCurrentPage('catalog');
            }}
            className={`font-semibold py-1 px-2 text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              currentPage === 'catalog'
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-400 border-transparent hover:text-white hover:border-white/10'
            }`}
            id="nav-catalog"
          >
            Aplicaciones
          </button>
          <button
            onClick={() => setCurrentPage('upload')}
            className={`font-semibold py-1 px-2 text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              currentPage === 'upload'
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-400 border-transparent hover:text-white hover:border-white/10'
            }`}
            id="nav-upload"
          >
            Subir APK
          </button>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-3 flex-1 md:flex-initial justify-end">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[200px] sm:max-w-[240px]">
            <input
              type="text"
              placeholder="Buscar aplicaciones..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-slate-900 border border-white/5 focus:border-indigo-500/50 rounded-full py-1.5 px-9 text-xs outline-hidden focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all text-white placeholder-slate-500"
              id="search-input"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Quick Upload CTA Button */}
          <button
            onClick={() => setCurrentPage('upload')}
            className="hidden sm:flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-indigo-200 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition-all shadow-sm border border-white/5"
            id="quick-upload-cta"
          >
            <Upload className="w-3.5 h-3.5" />
            Subir
          </button>

          {/* Profile Circle Badge */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-0.5 border border-white/5">
            <div className="w-7 h-7 bg-indigo-600/25 text-indigo-400 rounded-full flex items-center justify-center shadow-inner cursor-pointer hover:bg-indigo-600/40 transition-colors" title="Alex Rivera (Pro)">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
