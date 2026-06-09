/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Sparkles, 
  CheckCircle, 
  ArrowLeft, 
  FileCode, 
  Info,
  Wrench,
  GraduationCap,
  Gamepad2,
  Tv,
  ListTodo,
  Users,
  Star,
  Lock
} from 'lucide-react';
import { AppItem, PageId } from '../types';

interface UploadViewProps {
  onAddApp: (newApp: AppItem) => void;
  setCurrentPage: (page: PageId) => void;
  setCategoryFilter: (category: string) => void;
}

const CONSTANT_ICONS = [
  { id: 'preset-1', name: 'Esmeralda', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ65eIpPg8e-upYCQExCYdX18KcF5S_WF9kOyRO_DbZEqCTRpIUryUk3cQW-oZMHR8z3E8GuQBPo4nw7HuvcRSaAgt-iadbHzSC2t5FeD4x37edvZxIJmLDLRUwi81Tqm-m9W5PxEz4FNB6FmtBc-t8sP4Fen6acbC4u7YQS_4uzMhvPBov3XZPj2U8uz7YDuPRiYFJ_6rjFhCgB8zuIamq4m8rjPCpbGQ1uH1tNsL9AlQf5jYh_eygH1DuJp8R4aDO6zWJ4YDsPY' },
  { id: 'preset-2', name: 'Mint Check', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEpfheUELIVq0axjNVDx7L8wfPpOvZs3CQEtQtQ3A8O14VQ0zyG5BgesIf6mAePWczRTyJorHraGhp2rnxsgeQs9FTORX_KFx7Bg4ikpKPawNbEpUfo7wWtCBhuEm6D9xa-FSfCEa8FNZvHMPMYg2p8tQHz4CiU5FSsyzkdOCRlz3NwyWqID-uHoXVadjFdFhaOFRHSPsFgV7DRXMEIdRSN7UuuyN_Lo2i4DGofl-uBEMppJBuZTgxSVuTTkKCkkS_UWtNB2SLeJc' },
  { id: 'preset-3', name: 'Racer Speed', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeVOs4Z9OYlb1irFbdNHjmyZ8oWbOTIU6XFmUS_ormEGCHMnS0IhqMGKFtI0UIELtKNL-vzjgfJvcuHpF8xlKjPMyO3WiqJCJbZzXQttqH6hMelwNail-3PtSG6ebLZbSgRcoDGiNfXqmu9dHjDjcbJ7AjAOwqsfkOi5RaxOByxVGJs2e2_d5mjcU2OOHNPJZCRkYn3vNkXQjm_jntu1Ha-nTploAWyJALkGaollqyAXHxpVsc3p4m9bouor0A6h1bPbzIZXboAbk' },
  { id: 'preset-4', name: 'Alt Cloud', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL72AHMr6yfLVCl6VYxCkug9aMl44Hy6mFcqT67JRSOEYhT_qKtbuFKpUjutg-EnnUSMgjRkl5WD-9gyZSW5hvE7rr4Hp-IWQ01XTJQsTFcdXyjKhkQvQvb6absW6iFqk_tJ1m6fUSw2MpoBrCYqP4EmgyhAIRBDYo9bPq7Xp63uU77-aiZDgGigCv8gpwUmHCw0t-4cgLUzehH5827lYxqqXY7nw-mJ-XuNg0UdMI40sqaG-VgfRYiHITq2Qy7aKTfDNkUGIqGVw' },
  { id: 'preset-5', name: 'Aperture Lens', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJCVN4ieVoTRiCaYlzZpgPVsv7fYtyU03CLvEZdz-h801Faa-4UZ7zkA1CUIVLVyVwfQ3WNElgaBo-ZDlcNk-obOBsbcWKiexq5Uz949aLnZJAgbJY2KPw_yNu_gszOQKsuHsuT0O1vuNF6WPUqCOGbQkIBwrw4OYj0UWf9ijYftsi64Rg6GNNncndZqZA_nCftk12KDZI1FD5pjdtdBC7CtcGqhTUXIBngcmS_jgAIt294P8ooMZIIUyR28D2C1gv7hOk9QxzMlA' },
  { id: 'preset-6', name: 'Brackets Tech', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEN1oqD35Bi5cUngXlvEyFT4ksbtLk2NNzY7maK2r8UAjS-JBskKI9GmU3-cjqsfOfcnYbu85Ph3qQAe61RHih0HtUFmpHPPWgl_P2uoiXWEdjuXPXnXo5gX9NhqoKUmNMXnDYuucLsZVBtI975F02bMA1QUlg2owx84DTiCbVniIkAdPyPr2FVgXIqUZHLUyeS9GhFZvUb6FgBJaaaY_5Qdps266e8FkRAPG4i8EPExHpZUxKtGRgKeYNLVAiftWcraLmJ9BKEx4' },
];

export default function UploadView({
  onAddApp,
  setCurrentPage,
  setCategoryFilter,
}: UploadViewProps) {
  // Navigation states inside UploadView
  const [formStep, setFormStep] = useState<'edit' | 'uploading' | 'completed'>('edit');
  
  // Access control and credentials validation
  const [accessKey, setAccessKey] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('chavis_dev_auth') === 'true';
  });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError('');
    const normalized = accessKey.trim();
    
    // We admit 8963 as access key
    if (normalized === '8963') {
      sessionStorage.setItem('chavis_dev_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setAccessError('Clave de acceso incorrecta. Vuelve a intentarlo.');
    }
  };

  // App parameters
  const [title, setTitle] = useState('');
  const [developer, setDeveloper] = useState('');
  const [category, setCategory] = useState<'Tools' | 'Games' | 'Education' | 'Productivity' | 'Social' | 'Entertainment'>('Tools');
  const [description, setDescription] = useState('');
  const [sizeStr, setSizeStr] = useState('15 MB');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [iconMode, setIconMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(CONSTANT_ICONS[0].url);
  const [customIconFile, setCustomIconFile] = useState<File | null>(null);
  const [customIconPre, setCustomIconPre] = useState<string>('');

  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadedAppRecord, setUploadedAppRecord] = useState<AppItem | null>(null);

  // File picker references
  const apkInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop states
  const [isApkDragOver, setIsApkDragOver] = useState(false);

  const handleApkSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      
      // Strict APK check (only admit .apk)
      if (ext !== 'apk') {
        alert('Error: Formato de archivo no admitido. La tienda de Creaciones Chavis solo admite subir archivos con extensión de instalador de Android (.APK).');
        return;
      }
      
      setUploadedFile(file);
      
      // Auto-detect size
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setSizeStr(`${sizeMb} MB`);
      if (!title) {
        // Strip file extension to recommend title
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        setTitle(baseName.replace(/[_-]/g, ' '));
      }
    }
  };

  const handleCustomIconSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomIconFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomIconPre(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApkDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsApkDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      
      // Strict APK check (only admit .apk)
      if (ext !== 'apk') {
        alert('Error: Formato de archivo no admitido. La tienda de Creaciones Chavis solo admite subir archivos con extensión de instalador de Android (.APK).');
        return;
      }
      
      setUploadedFile(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setSizeStr(`${sizeMb} MB`);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' '));
      }
    }
  };

  const triggerApkInput = () => {
    apkInputRef.current?.click();
  };

  const triggerIconInput = () => {
    iconInputRef.current?.click();
  };

  const isSubmittingRef = useRef(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      alert('Error: Por favor, selecciona o arrastra un archivo binario de Android (.APK) primero.');
      return;
    }
    
    if (!title.trim() || !developer.trim() || !description.trim()) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    if (isSubmittingRef.current) {
      return;
    }

    // Trigger simulation progress
    setFormStep('uploading');
    setUploadPercent(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadPercent(100);
        completeSubmission();
      } else {
        setUploadPercent(progress);
      }
    }, 100);
  };

  const completeSubmission = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('developer', developer.trim());
      formData.append('category', category);
      formData.append('description', description.trim());
      formData.append('size', sizeStr);
      formData.append('secretKey', '8963'); // Master access key is always 8963

      if (uploadedFile) {
        formData.append('apk', uploadedFile);
      }

      if (iconMode === 'custom' && customIconFile) {
        formData.append('icon', customIconFile);
      } else {
        formData.append('presetIconUrl', selectedPresetUrl);
      }

      const res = await fetch('/api/apps/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        let errMsg = 'Error del servidor durante la subida.';
        try {
          const errData = await res.json();
          errMsg = errData.message || errMsg;
        } catch (jsonErr) {
          // Response is not JSON
          try {
            const rawText = await res.text();
            if (rawText && rawText.length < 200) errMsg = rawText;
          } catch (textErr) {}
        }
        throw new Error(errMsg);
      }

      const responseData = await res.json();
      if (responseData.success && responseData.data) {
        const savedApp = responseData.data;
        onAddApp(savedApp);
        setUploadedAppRecord(savedApp);
        setFormStep('completed');
      } else {
        throw new Error(responseData.message || 'Error guardando en el servidor.');
      }
    } catch (e: any) {
      console.error('Error in completeSubmission:', e);
      alert(`Error al subir la aplicación: ${e.message || e}`);
      setFormStep('edit');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDeveloper('');
    setCategory('Tools');
    setDescription('');
    setSizeStr('15 MB');
    setUploadedFile(null);
    setIconMode('preset');
    setSelectedPresetUrl(CONSTANT_ICONS[0].url);
    setCustomIconFile(null);
    setCustomIconPre('');
    setFormStep('edit');
    setUploadedAppRecord(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-[500px] mx-auto px-4 py-16 min-h-[80vh] flex flex-col justify-center font-sans">
        <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Decorative blur colors */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header Back button */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5 border-0 bg-transparent"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Atrás
          </button>

          <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 mx-auto mt-6 mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Clave de Acceso Requerida
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
            Para publicar nuevos archivos APK, debes autenticarte como programador de Creaciones Chavis.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="access-key" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Clave de Desarrollador
              </label>
              <input 
                id="access-key"
                type="password" 
                placeholder="Ingresa la clave..." 
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
              <p className="text-xs text-rose-500 font-semibold animate-pulse">
                {accessError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 transition-all cursor-pointer active:scale-97"
            >
              Comprobar Clave
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed">
            ¿No tienes la clave? Solicítala al administrador de Creaciones Chavis. <br/>
            <span className="text-indigo-400/40 font-mono mt-1 block">(Para fines de prueba, la clave es <span className="font-bold text-indigo-400/60">8963</span>)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 py-8 min-h-screen font-sans">
      
      {/* 1. EDIT MODE FORM */}
      {formStep === 'edit' && (
        <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-6 sm:p-10">
          
          <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-6 transition-colors cursor-pointer select-none"
            onClick={() => setCurrentPage('home')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Volver al inicio</span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Publicar Nueva Aplicación / APK
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Envía tus creaciones Android al catálogo de Creaciones Chavis de forma instantánea.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* FILE DRAG & DROP FOR APK */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Archivo de la Aplicación (.APK) <span className="text-red-500">*</span>
              </label>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsApkDragOver(true); }}
                onDragLeave={() => setIsApkDragOver(false)}
                onDrop={handleApkDrop}
                onClick={triggerApkInput}
                className={`w-full py-8 px-4 rounded-2xl border-2 border-dashed text-center flex flex-col items-center justify-center cursor-pointer active:scale-99 transition-all ${
                  uploadedFile 
                    ? 'border-indigo-500 bg-indigo-600/5' 
                    : isApkDragOver 
                      ? 'border-indigo-500 bg-white/5' 
                      : 'border-white/5 bg-[#0A0B0D] hover:bg-white/[0.04] hover:border-indigo-500/30'
                }`}
                id="apk-dropzone"
              >
                <input 
                  type="file" 
                  ref={apkInputRef} 
                  onChange={handleApkSelect} 
                  accept=".apk" 
                  className="hidden" 
                />
                
                {uploadedFile ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                      <FileCode className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white max-w-sm mx-auto truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Tipo: APK detectado
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-indigo-400 text-2xs font-extrabold uppercase bg-indigo-600/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      Archivo cargado con éxito
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Arrastra tu archivo APK aquí, o <span className="text-indigo-400 underline">búscalo en tu PC</span>
                      </p>
                      <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                        Solo se admiten instaladores originales de Android (.APK) de hasta 300 MB.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TWO COLUMN GRID INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* App Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Nombre de la Aplicación <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Mi Super Herramienta Pro" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder-slate-600"
                  id="app-title-input"
                />
              </div>

              {/* Developer */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Desarrollador / Firma <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Chavis Mobile, S.L." 
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder-slate-600"
                  id="app-dev-input"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Categoría de la Aplicación <span className="text-red-500">*</span>
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0A0B0D] border border-white/5 text-slate-200 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                  id="app-category-select"
                >
                  <option value="Tools">Herramientas</option>
                  <option value="Games">Juegos</option>
                  <option value="Education">Educación</option>
                  <option value="Productivity">Productividad</option>
                  <option value="Social">Social</option>
                  <option value="Entertainment">Entretenimiento</option>
                </select>
              </div>

              {/* Static detected/manually sized apk */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Tamaño del APK estimado
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: 24 MB" 
                  value={sizeStr}
                  onChange={(e) => setSizeStr(e.target.value)}
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-hidden text-slate-400 font-mono"
                  id="app-size-input"
                />
              </div>
            </div>

            {/* SELECTION FOR COMPONENT ICON BANNER */}
            <div className="space-y-4 border-t border-white/5 pt-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Icono de la Aplicación <span className="text-red-500">*</span>
                </label>
                <p className="text-2xs text-slate-400 mt-1">
                  Selecciona uno de los iconos predefinidos de alta calidad estilo Creaciones Chavis, o sube tu propia imagen.
                </p>
              </div>

              {/* Toggle Mode */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIconMode('preset')}
                  className={`px-4 py-1.5 rounded-full text-2xs font-bold uppercase transition-all border cursor-pointer ${
                    iconMode === 'preset'
                      ? 'bg-indigo-600 text-white border-indigo-550'
                      : 'bg-[#0A0B0D] text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  Presets de Iconos
                </button>
                <button
                  type="button"
                  onClick={() => setIconMode('custom')}
                  className={`px-4 py-1.5 rounded-full text-2xs font-bold uppercase transition-all border cursor-pointer ${
                    iconMode === 'custom'
                      ? 'bg-indigo-600 text-white border-indigo-550'
                      : 'bg-[#0A0B0D] text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  Subir mi propia imagen (PNG/JPG)
                </button>
              </div>

              {/* Presets Grid */}
              {iconMode === 'preset' ? (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 bg-[#0A0B0D] p-4 rounded-2xl border border-white/5">
                  {CONSTANT_ICONS.map((ico) => {
                    const isSelected = selectedPresetUrl === ico.url;
                    return (
                      <div 
                        key={ico.id}
                        onClick={() => setSelectedPresetUrl(ico.url)}
                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer p-0.5 border-4 transition-all relative group ${
                          isSelected ? 'border-indigo-650 scale-102 shadow-xs' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img 
                          alt={ico.name} 
                          src={ico.url} 
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-end p-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                            {ico.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Custom Icon Image */
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0A0B0D] p-4 rounded-2xl border border-white/5">
                  <div 
                    onClick={triggerIconInput}
                    className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden cursor-pointer bg-[#121418] hover:bg-white/5 hover:border-indigo-500 transition-all flex-shrink-0"
                  >
                    <input 
                      type="file" 
                      ref={iconInputRef} 
                      onChange={handleCustomIconSelect} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    {customIconPre ? (
                      <img src={customIconPre} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Subir archivo de imagen</h4>
                    <p className="text-2xs text-slate-400 leading-normal mt-0.5 max-w-sm">
                      Para obtener mejores resultados, utiliza una imagen cuadrada (1:1) de alta calidad en formato PNG, JPEG o WebP.
                    </p>
                    {customIconFile && (
                      <span className="inline-block bg-indigo-600/10 text-indigo-400 text-3xs font-extrabold rounded-full px-2 mt-2 font-mono">
                        {customIconFile.name}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Description Area */}
            <div className="space-y-2 border-t border-white/5 pt-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Descripción de la aplicación <span className="text-red-500">*</span>
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Escribe sobre la funcionalidad, características, modos y por qué el usuario debería instalar tu aplicación..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder-slate-600 resize-y"
                id="app-desc-input"
              />
            </div>

            {/* ALERT INFO BOX */}
            <div className="bg-indigo-950/15 text-slate-400 p-4 rounded-xl flex gap-3 items-start border border-white/5">
              <Info className="w-5 h-5 flex-shrink-0 text-indigo-400" />
              <div className="text-2xs leading-relaxed font-sans">
                <span className="font-bold text-white">Reglas de Publicación:</span> Al subir tu aplicación firmas que es un ejecutable libre de malware, malware publicitario o espía. Todas las cargas pasan por un simulador antivirus local antes de indexarse permanentemente en los listados del catálogo.
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/10 cursor-pointer active:scale-99 transition-all text-center flex items-center justify-center gap-2"
                id="submit-app-btn"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Publicar e Indexar Aplicación
              </button>
            </div>

          </form>
        </div>
      )}

      {/* 2. UPLOADING SIMULATION */}
      {formStep === 'uploading' && (
        <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-indigo-600/10 text-indigo-450 rounded-full flex items-center justify-center animate-spin mb-6 border border-indigo-500/20">
            <Upload className="w-7 h-7 text-indigo-400" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
            Transfiriendo y Escaneando APK...
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mb-8">
            El archivo se está subiendo de forma segura. Realizando comprobaciones de encriptación y escaneo de vulnerabilidades.
          </p>

          <div className="w-full max-w-md bg-white/5 h-2.5 rounded-full overflow-hidden shadow-inner relative">
            <div 
              style={{ width: `${uploadPercent}%` }}
              className="bg-indigo-600 h-full rounded-full transition-all duration-150 ease-out"
            ></div>
          </div>
          <span className="text-xs font-bold text-indigo-405 mt-3 font-mono">
            {uploadPercent}% Completado
          </span>
        </div>
      )}

      {/* 3. COMPLETED SUCCESS STATE */}
      {formStep === 'completed' && uploadedAppRecord && (
        <div className="bg-[#121418] rounded-3xl border border-white/5 shadow-2xl p-8 sm:p-12 text-center flex flex-col items-center">
          
          <CheckCircle className="w-16 h-16 text-emerald-400 mb-4 stroke-2" />
          
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            ¡Aplicación Publicada con Éxito!
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mb-8 leading-relaxed">
            Tu app ya está indexada y visible. Cualquier usuario conectado a la red de Creaciones Chavis puede descargar de manera instantánea el APK binario.
          </p>

          {/* SÚPER TARJETA DE RESUMEN CLARO */}
          <div className="w-full max-w-sm bg-[#0A0B0D] p-4 rounded-2xl border border-white/5 flex items-center gap-4 text-left mb-8">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-3xs bg-[#121418] border border-white/5">
              <img src={uploadedAppRecord.iconUrl} alt="App icon" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden flex-grow">
              <h4 className="font-bold text-sm text-white truncate">
                {uploadedAppRecord.title}
              </h4>
              <p className="text-2xs text-slate-450 truncate">Sometida por: {uploadedAppRecord.developer}</p>
              
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] bg-indigo-600/15 text-indigo-400 font-bold px-2 py-0.5 rounded-full uppercase border border-indigo-500/10">
                  {uploadedAppRecord.category}
                </span>
                <span className="text-slate-650 text-3xs">•</span>
                <span className="text-2xs font-bold text-slate-200 font-mono">{uploadedAppRecord.size}</span>
              </div>
            </div>
          </div>

          {/* ACTIONS ROW */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setCurrentPage('catalog');
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-full text-xs font-bold cursor-pointer active:scale-95 transition-all w-full sm:w-auto shadow-lg shadow-indigo-600/15"
            >
              Ver en la Tienda / Apps
            </button>
            <button
              onClick={resetForm}
              className="bg-white/5 hover:bg-white/10 text-indigo-400 px-8 py-3.5 rounded-full text-xs font-bold border border-white/5 cursor-pointer active:scale-95 transition-all w-full sm:w-auto"
            >
              Publicar Otra Aplicación
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
