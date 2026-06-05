/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  LayoutGrid, 
  Gamepad2, 
  Upload, 
  Sparkles, 
  Download, 
  Check, 
  Wrench, 
  GraduationCap, 
  Tv, 
  ListTodo, 
  Users,
  CheckCircle2, 
  X, 
  FileCode,
  ArrowUpCircle
} from 'lucide-react';

import { AppItem, PageId } from './types';
import { INITIAL_APPS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AppsView from './components/AppsView';
import UploadView from './components/UploadView';

export default function App() {
  // 1. PAGE STATE
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // ====== LOCAL PERSISTENCE FOR METADATA ======
  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const stored = localStorage.getItem('chavis_apps_metadata');
      if (stored) {
        const parsed = JSON.parse(stored) as AppItem[];
        // Filter out any default apps to avoid duplication, only keep user uploads
        const uploadedOnly = parsed.filter(x => x.id.startsWith('uploaded-'));
        return [...INITIAL_APPS, ...uploadedOnly];
      }
    } catch (e) {
      console.warn("Could not restore apps from localStorage", e);
    }
    return INITIAL_APPS;
  });

  // Save changes to localStorage (Only metadata, exclude heavy file blobs)
  useEffect(() => {
    try {
      const metadataOnly = apps.map(({ blob, ...metadata }) => metadata);
      localStorage.setItem('chavis_apps_metadata', JSON.stringify(metadataOnly));
    } catch (e) {
      console.error("Could not write apps to localStorage", e);
    }
  }, [apps]);

  // Handle adding a new application
  const handleAddApp = (newApp: AppItem) => {
    setApps((prev) => [newApp, ...prev]);
  };

  // ====== DOWNLOAD SERVICE SIMULATOR =======
  const [downloadingApp, setDownloadingApp] = useState<AppItem | null>(null);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('5.4 MB/s');
  const [downloadStatus, setDownloadStatus] = useState<'progress' | 'success'>('progress');

  const triggerDownload = (app: AppItem) => {
    // Prevent multiple parallel downloads for simplicity
    if (downloadingApp) {
      alert(`Actualmente descargando: ${downloadingApp.title}. Por favor, espera.`);
      return;
    }

    setDownloadingApp(app);
    setDownloadPercent(0);
    setDownloadStatus('progress');
    
    const speeds = ['4.8 MB/s', '5.2 MB/s', '6.0 MB/s', '6.8 MB/s', '5.5 MB/s'];
    const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    setDownloadSpeed(randomSpeed);

    // Simulate transfer rate progress
    const interval = setInterval(() => {
      setDownloadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStatus('success');
          
          // Trigger the actual native file compilation download
          initiateNativeFileDownload(app);
          
          // Increment download stats in public record
          setApps((prevApps) => 
            prevApps.map((a) => a.id === app.id ? { ...a, downloadsCount: a.downloadsCount + 1 } : a)
          );

          // Clear modal automatically after 2 seconds
          setTimeout(() => {
            setDownloadingApp(null);
            setDownloadPercent(0);
          }, 2000);

          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Compile real installer installer bypass for safe delivery
  const initiateNativeFileDownload = (app: AppItem) => {
    let fileBlob: Blob;
    let fileName = app.fileName || `${app.title.toLowerCase().replace(/\s+/g, '_')}.apk`;

    if (app.blob) {
      // Byte-for-byte matching of user-uploaded file!
      fileBlob = app.blob;
    } else {
      // Prebuilt static app: Generate a real installer template file
      const manifestBytes = `
===================================================================
   CREACIONES CHAVIS APP - MARKETPLACE DE ANDROID VERIFICADO
===================================================================
App ID:         ${app.id}
Nombre:         ${app.title}
Firma Dev:      ${app.developer}
Categoría:      ${app.category}
Peso Declarado: ${app.size}
Clasificación:  ${app.rating} / 5.0
Publicación:    ${app.dateAdded}
Estado Check:   SEGURO / VERIFICADO CONTRA AMENAZAS
===================================================================

[AndroidRuntime] Iniciando instalador de Creaciones Chavis...
[BypassVerifier] Todos los paquetes de seguridad internos han sido superados con éxito.
Instalando los recursos estáticos de ${app.title}...

Este archivo APK actúa como contenedor seguro para fines de demostración en AI Studio.
¡Felicidades, la descarga se ha completado perfectamente!
===================================================================
`;
      fileBlob = new Blob([manifestBytes], { type: 'application/vnd.android.package-archive' });
    }

    // Trigger local anchor download
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-200 flex flex-col selection:bg-indigo-500/30">
      
      {/* 2. TOP STICKY NAVBAR */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalAppsCount={apps.length}
      />

      {/* 3. MAIN WORKPLACE */}
      <main className="flex-grow pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomeView 
            apps={apps}
            setCurrentPage={setCurrentPage}
            setCategoryFilter={setCategoryFilter}
            onDownload={triggerDownload}
          />
        )}
        
        {currentPage === 'catalog' && (
          <AppsView 
            apps={apps}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onDownload={triggerDownload}
          />
        )}

        {currentPage === 'upload' && (
          <UploadView 
            onAddApp={handleAddApp}
            setCurrentPage={setCurrentPage}
            setCategoryFilter={setCategoryFilter}
          />
        )}
      </main>

      {/* 4. FOOTER COMPONENT */}
      <Footer 
        setCurrentPage={setCurrentPage}
        appsCount={apps.length}
      />

      {/* 5. FLOATING MOBILE NAVIGATION BAR (Only visible on sm, hidden on md) */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 pb-safe md:hidden bg-[#121418] border-t border-white/5 shadow-2xl rounded-t-2xl">
        <button 
          onClick={() => {
            setCurrentPage('home');
          }}
          className={`flex flex-col items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all active:scale-90 ${
            currentPage === 'home'
              ? 'bg-indigo-600/10 text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-semibold">Inicio</span>
        </button>
        
        <button 
          onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setCurrentPage('catalog');
          }}
          className={`flex flex-col items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all active:scale-90 ${
            currentPage === 'catalog' && categoryFilter !== 'Games' && !searchQuery
              ? 'bg-indigo-600/10 text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          id="mobile-nav-apps"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-semibold">Apps</span>
        </button>

        <button 
          onClick={() => {
            setSearchQuery('');
            setCategoryFilter('Games');
            setCurrentPage('catalog');
          }}
          className={`flex flex-col items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all active:scale-90 ${
            currentPage === 'catalog' && categoryFilter === 'Games'
              ? 'bg-indigo-600/10 text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          id="mobile-nav-games"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-semibold">Juegos</span>
        </button>

        <button 
          onClick={() => {
            setCurrentPage('upload');
          }}
          className={`flex flex-col items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all active:scale-90 ${
            currentPage === 'upload'
              ? 'bg-indigo-600/10 text-indigo-400 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
          id="mobile-nav-upload"
        >
          <Upload className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-semibold">Subir</span>
        </button>
      </nav>

      {/* 6. DOWNLOAD MODAL OVERLAY (Bottom-Right corner widget) */}
      {downloadingApp && (
        <div className="fixed bottom-6 right-6 z-50 w-[300px] bg-[#121418] rounded-2xl shadow-2xl border border-white/5 p-4 animate-slide-up hover:scale-102 transition-transform duration-200">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 bg-white/[0.03] rounded-lg overflow-hidden flex-shrink-0 relative border border-white/5">
              <img src={downloadingApp.iconUrl} alt="Icon" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow overflow-hidden text-slate-200">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-xs text-white truncate leading-tight">
                  {downloadingApp.title}
                </h4>
                {downloadStatus === 'success' && (
                  <button onClick={() => setDownloadingApp(null)} className="text-slate-400 hover:text-white font-bold text-2xs p-0.5 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              
              <p className="text-[10px] text-slate-400 mt-0.5 truncate uppercase font-bold tracking-wider">
                {downloadingApp.category} • {downloadingApp.size}
              </p>

              {downloadStatus === 'progress' ? (
                <div className="mt-3 space-y-1.5 align-middle">
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${downloadPercent}%` }}
                      className="bg-indigo-600 h-full rounded-full transition-all duration-150 ease-out"
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">{downloadSpeed}</span>
                    <span className="text-indigo-400 font-bold">{downloadPercent}%</span>
                  </div>
                </div>
              ) : (
                /* Success Notification State */
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Descarga completada!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
