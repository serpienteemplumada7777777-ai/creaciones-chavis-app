/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Download, 
  Star, 
  Wrench, 
  GraduationCap, 
  Gamepad2, 
  Tv, 
  ListTodo, 
  Users,
  Grid,
  Search,
  FilterX,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { AppItem } from '../types';
import { CATEGORIES, SORT_OPTIONS } from '../data';

interface AppsViewProps {
  apps: AppItem[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onDownload: (app: AppItem) => void;
}

export default function AppsView({
  apps,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  onDownload,
}: AppsViewProps) {
  const [selectedSort, setSelectedSort] = useState('popular');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  // Render Category Icon
  const getCategoryIcon = (categoryType: string) => {
    switch (categoryType) {
      case 'Tools': return <Wrench className="w-4 h-4" />;
      case 'Games': return <Gamepad2 className="w-4 h-4" />;
      case 'Education': return <GraduationCap className="w-4 h-4" />;
      case 'Productivity': return <ListTodo className="w-4 h-4" />;
      case 'Social': return <Users className="w-4 h-4" />;
      default: return <Tv className="w-4 h-4" />;
    }
  };

  // 1. Filter lists
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      // Category Filter
      const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
      // Search Filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        app.title.toLowerCase().includes(query) || 
        app.developer.toLowerCase().includes(query) || 
        app.description.toLowerCase().includes(query);
      
      return matchesCategory && matchesSearch;
    });
  }, [apps, categoryFilter, searchQuery]);

  // 2. Sort results
  const sortedApps = useMemo(() => {
    const list = [...filteredApps];
    switch (selectedSort) {
      case 'newest':
        return list.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'alphabetical':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'popular':
      default:
        // Priority to higher downloads count
        return list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    }
  }, [filteredApps, selectedSort]);

  // 3. Paginate
  const paginatedApps = useMemo(() => {
    const startIndex = (currentPageNum - 1) * itemsPerPage;
    return sortedApps.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedApps, currentPageNum]);

  const totalPages = Math.max(1, Math.ceil(sortedApps.length / itemsPerPage));

  // Reset pagination on filter changes
  useMemo(() => {
    setCurrentPageNum(1);
  }, [categoryFilter, searchQuery, selectedSort]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageNum(page);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          
          {/* CATEGORIES CARD */}
          <div className="bg-[#121418] rounded-2xl p-5 border border-white/5 shadow-2xl">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">
              Categorías
            </h3>
            
            <ul className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = categoryFilter === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs tracking-wide transition-all cursor-pointer select-none text-left ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {cat.id === 'all' ? (
                        <Grid className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      ) : (
                        getCategoryIcon(cat.id)
                      )}
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* EDITORS CHOICE CARD PROMO */}
          <div className="relative overflow-hidden rounded-2xl bg-indigo-950 text-white p-5 h-48 flex flex-col justify-end group shadow-2xl border border-white/5">
            <img 
              alt="Artículos seleccionados de los editores" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-40 group-hover:scale-102 transition-transform duration-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2YrwIy83xeJHwtR_ksomeVRo2olABbxDQTjQEQcfjQlIG2D27jhSjiNk37HD-O8TrIi4_FutRVk4wj5jG0RJvmuC_wnsaJbFehYXnuFTmL216Blu2CfUJKYT2d6KwoEdP4nBpwcCtrjaaw5Kfd8hKnmwyNpSGnwg6RtKTw0Kc3SXWlyvBZf9CTcaUGuLs-zvlN5B-xzjVef2pmg-KfmOPgGI0TGR3sCaY5BGPpGbADhfOrA-2S8GTF6OzyQNce6sPkVBDdAcwh7w"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-1">
                Colección Especial
              </p>
              <h4 className="font-extrabold text-base mb-3 leading-tight tracking-tight">
                Selección de los Editores 2026
              </h4>
              <button
                onClick={() => {
                  setSelectedSort('rating');
                  setCategoryFilter('all');
                }}
                className="bg-white hover:bg-slate-100 text-indigo-955 px-5 py-2 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all text-center cursor-pointer"
              >
                Explorar
              </button>
            </div>
          </div>

        </aside>

        {/* ================= MAIN CATALOG CONTENT ================= */}
        <section className="flex-grow">
          
          {/* CATALOG HEADER MODULE */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-white/5 pb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {searchQuery ? 'Resultados de búsqueda' : 'Explorar Todas las Aplicaciones'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Mostrando {filteredApps.length} de {apps.length} utilidades y juegos para Android
              </p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Ordenar por:
              </label>
              <select 
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#121418] border border-white/5 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 pr-8 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
                id="sort-selector"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTIVE FILTER DISMISS BLOCKS */}
          {(categoryFilter !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-2xs text-indigo-400 font-bold uppercase tracking-wider">
                Filtros activos:
              </span>
              {categoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-white/5 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold border border-white/5">
                  {CATEGORIES.find(c => c.id === categoryFilter)?.name}
                  <button 
                    onClick={() => setCategoryFilter('all')}
                    className="text-slate-400 hover:text-white font-bold ml-0.5 text-2xs cursor-pointer select-none"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-white/5 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold border border-white/5">
                  "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white font-bold ml-0.5 text-2xs cursor-pointer select-none"
                  >
                    ×
                  </button>
                </span>
              )}
              <button 
                onClick={() => {
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="text-2xs text-indigo-400 hover:text-indigo-300 hover:underline font-bold transition-colors cursor-pointer"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* APP GRID LIST */}
          {paginatedApps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedApps.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-[#121418] rounded-2xl p-5 border border-white/5 hover:border-indigo-500/30 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 bg-[#0A0B0D] relative">
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
                    <div className="flex-grow overflow-hidden">
                      <h3 className="font-semibold text-base text-white group-hover:text-indigo-400 transition-colors truncate">
                        {app.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {app.developer}
                      </p>
                      
                      <div className="flex items-center gap-1.5 mt-2">
                        <Star className="w-3.5 h-3.5 fill-[#ffb400] stroke-[#ffb400]" />
                        <span className="text-xs font-bold text-slate-300">{app.rating}</span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-xs text-slate-400 font-medium">{app.size}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-normal leading-relaxed mb-6 flex-grow line-clamp-2">
                    {app.description}
                  </p>

                  <button
                    onClick={() => onDownload(app)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-97 transition-colors duration-200 mt-auto shadow-md shadow-indigo-600/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar APK
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* NO RESULTS STATE */
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-white/5 text-center bg-transparent">
              <div className="w-14 h-14 bg-white/5 text-slate-500 rounded-full flex items-center justify-center mb-4 border border-white/5">
                <FilterX className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-1">
                No se encontraron aplicaciones
              </h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                No hay resultados que coincidan con tu búsqueda. Prueba con otros términos o selecciona otra categoría.
              </p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-6 bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition-all border border-white/5"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 pt-6 border-t border-white/5">
              <button
                onClick={() => handlePageChange(currentPageNum - 1)}
                disabled={currentPageNum === 1}
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 disabled:opacity-30 hover:bg-white/5 disabled:hover:bg-transparent enabled:cursor-pointer transition-all active:scale-90"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                const isSelected = currentPageNum === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-10 h-10 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPageNum + 1)}
                disabled={currentPageNum === totalPages}
                className="p-2.5 rounded-xl border border-white/5 text-slate-400 disabled:opacity-30 hover:bg-white/5 disabled:hover:bg-transparent enabled:cursor-pointer transition-all active:scale-90"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
