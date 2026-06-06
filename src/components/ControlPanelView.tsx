import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Trash2, 
  ArrowLeft, 
  Sparkles, 
  Smartphone, 
  Calendar, 
  DownloadCloud, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { AppItem, PageId } from '../types';

interface ControlPanelViewProps {
  apps: AppItem[];
  onReloadApps: () => void;
  setCurrentPage: (page: PageId) => void;
}

export default function ControlPanelView({
  apps,
  onReloadApps,
  setCurrentPage,
}: ControlPanelViewProps) {
  const [accessKey, setAccessKey] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('chavis_dev_auth') === 'true';
  });
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError('');
    if (accessKey.trim() === '8963') {
      sessionStorage.setItem('chavis_dev_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setAccessError('Clave de administrador incorrecta.');
    }
  };

  const handleDeleteApp = async (appId: string, appTitle: string) => {
    if (!window.confirm(`¿Estás completamente seguro de que deseas eliminar la aplicación "${appTitle}"? Esta acción borrará el APK físicamente del servidor.`)) {
      return;
    }

    setIsDeletingId(appId);
    setMessage(null);

    try {
      const activeKey = sessionStorage.getItem('chavis_dev_auth') === 'true' ? '8963' : accessKey.trim();
      const res = await fetch(`/api/apps/${appId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: activeKey }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: `Se eliminó "${appTitle}" correctamente.`, error: false });
        onReloadApps();
      } else {
        setMessage({ text: data.message || 'Error al eliminar la aplicación.', error: true });
      }
    } catch (err: any) {
      console.error('Error deleting app:', err);
      setMessage({ text: 'No se pudo conectar con el servidor para eliminar la app.', error: true });
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('chavis_dev_auth');
    setIsAuthenticated(false);
    setAccessKey('');
    setMessage(null);
  };

  // Only consider uploaded custom apps for deletion
  const customApps = apps.filter(app => app.id.startsWith('uploaded-'));
  const presetCount = apps.length - customApps.length;

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-[500px] mx-auto px-4 py-16 min-h-[80vh] flex flex-col justify-center font-sans">
        <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Back button */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5 border-0 bg-transparent"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Inicio
          </button>

          <div className="w-16 h-16 bg-red-650/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/10 mx-auto mt-6 mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Panel de Control
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
            Ingresa la clave maestra autorizada para poder desindexar y eliminar aplicaciones de la tienda de Creaciones Chavis.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="admin-key" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Clave de Seguridad Administrador
              </label>
              <input 
                id="admin-key"
                type="password" 
                placeholder="Ingresa clave maestra..." 
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  setAccessError('');
                }}
                className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder-slate-600 text-center tracking-widest font-mono"
                required
                autoFocus
              />
            </div>

            {accessError && (
              <p className="text-xs text-rose-550 font-bold animate-pulse">
                {accessError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 transition-all cursor-pointer active:scale-97"
            >
              Autenticar Administrador
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed text-center">
            Para fines de prueba, usa la clave principal <span className="text-indigo-400/70 font-mono font-bold">8963</span>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-8 min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] bg-red-600/10 text-red-400 border border-red-500/10 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Modo Administrador Activado
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2.5">
            Panel de Control General
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Modera el catálogo público de Creaciones Chavis, elimina aplicaciones desactualizadas o gestiona los APKs del servidor.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              onReloadApps();
              setMessage({ text: 'Catálogo de aplicaciones sincronizado con el servidor.', error: false });
            }}
            className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs py-2 px-4 rounded-xl tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5 border border-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recargar
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-950/20 hover:bg-red-900/30 text-rose-450 border border-rose-500/10 font-bold text-xs py-2 px-4 rounded-xl tracking-wider transition-all cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* QUICK METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#121418] rounded-2xl border border-white/5 p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-indigo-400/20">
            <Smartphone className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold text-slate-405 uppercase tracking-widest block">Total Aplicaciones</span>
          <span className="text-2xl font-black text-white block mt-0.5">{apps.length}</span>
        </div>

        <div className="bg-[#121418] rounded-2xl border border-white/5 p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-emerald-400/20">
            <DownloadCloud className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold text-slate-405 uppercase tracking-widest block">Formatos Custom (.APK)</span>
          <span className="text-2xl font-black text-emerald-450 block mt-0.5">{customApps.length}</span>
        </div>

        <div className="bg-[#121418] rounded-2xl border border-white/5 p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-indigo-400/20">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold text-slate-405 uppercase tracking-widest block">Apps Preinstaladas</span>
          <span className="text-2xl font-black text-indigo-450 block mt-0.5">{presetCount}</span>
        </div>
      </div>

      {/* ALERT FEEDBACKS */}
      {message && (
        <div className={`p-4 rounded-xl border mb-6 text-xs font-bold leading-relaxed flex justify-between items-center ${
          message.error ? 'bg-red-950/20 text-rose-400 border-red-500/10' : 'bg-indigo-950/20 text-indigo-400 border-indigo-500/10'
        }`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white p-1">✕</button>
        </div>
      )}

      {/* APPS LIST CONTAINER */}
      <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-6 sm:p-8">
        <h3 className="font-bold text-sm text-white uppercase tracking-widest mb-6 block border-b border-white/5 pb-4">
          Aplicaciones de Android Subidas (.APK) ({customApps.length})
        </h3>

        {customApps.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-sm">No hay aplicaciones de programadores todavía</h4>
            <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
              Las aplicaciones que suban tus usuarios o tú utilizando la pestaña "Subir APK" aparecerán enlistadas en este módulo para su control y remoción física.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {customApps.map((app) => (
              <div 
                key={app.id}
                className="bg-[#0A0B0D] rounded-2xl border border-white/5 hover:border-white/10 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/5 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/5">
                    <img src={app.iconUrl} alt={app.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm tracking-tight leading-snug">
                      {app.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      Firma: <span className="text-slate-300 font-semibold">{app.developer}</span> | Cat: <span className="text-indigo-400 font-bold">{app.category}</span>
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <DownloadCloud className="w-3.5 h-3.5" /> {app.downloadsCount} descargas
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Subida: {app.dateAdded}
                      </span>
                      <span className="bg-indigo-650/10 text-indigo-400 text-[9px] px-1.5 py-0.5 rounded-sm border border-indigo-500/5 uppercase">
                        {app.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5 gap-3">
                  <span className="text-[10px] font-mono text-slate-500 bg-white/2 py-1 px-2.5 rounded-md border border-white/5 hidden sm:inline-block">
                    ID: {app.id}
                  </span>
                  <button
                    onClick={() => handleDeleteApp(app.id, app.title)}
                    disabled={isDeletingId === app.id}
                    className="bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-500/10 p-2.5 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Eliminar APK de la base de datos"
                  >
                    <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-[10px] text-slate-500">
        Las aplicaciones originales del sistema Chavis App Store están protegidas por firma criptográfica y no pueden ser eliminadas ni alteradas desde la consola del desarrollador.
      </div>

    </div>
  );
}
