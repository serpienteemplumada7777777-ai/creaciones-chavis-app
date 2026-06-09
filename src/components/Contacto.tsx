import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, FileText, Calendar } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: 'Mantenimiento Preventivo',
    mensaje: ''
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request/submission safely
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccessful(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      servicio: 'Mantenimiento Preventivo',
      mensaje: ''
    });
    setIsSubmitSuccessful(false);
  };

  return (
    <div className="space-y-16 py-4 animate-fadeIn">
      {/* Top Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Hablemos Hoy Mismo
        </h1>
        <p className="text-slate-600 font-sans leading-relaxed text-sm sm:text-base">
          Estamos listos para atender tus dudas, programar visitas técnicas o emitir cotizaciones especiales. Envíanos un mensaje y te responderemos en minutos.
        </p>
      </section>

      {/* Main Grid Contact & Info */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-display font-extrabold text-slate-900">
              Datos de Contacto
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm">
              Comunícate por la vía que prefieras o ven a visitarnos en nuestras oficinas centrales.
            </p>
          </div>

          <div className="space-y-6 font-sans">
            {/* Phone option */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold block">LÍNEA TELEFÓNICA DIRECTA</span>
                <a href="tel:8120000005" className="text-slate-900 font-extrabold text-base hover:text-sky-600 transition-colors">
                  81 2000 0005
                </a>
                <p className="text-xs text-slate-500">Atención inmediata o emergencias directas.</p>
              </div>
            </div>

            {/* Email Contact */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold block">CORREO ELECTRÓNICO</span>
                <a href="mailto:contacto@climatizacionchavis.com" className="text-slate-900 font-extrabold text-base hover:text-sky-600 transition-colors break-all">
                  contacto@climatizacionchavis.com
                </a>
                <p className="text-xs text-slate-500">Escríbenos para enviarnos planos o solicitudes comerciales.</p>
              </div>
            </div>

            {/* Map Address */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold block">DIRECCIÓN DE OFICINAS</span>
                <p className="text-slate-800 font-bold text-sm">
                  Av. Solidaridad Real #104, Col. Central, Monterrey, Nuevo León, C.P. 64190
                </p>
                <p className="text-xs text-slate-500">Soporte a toda el Área Metropolitana de Monterrey.</p>
              </div>
            </div>

            {/* Business hours */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold block font-sans">HORARIO DE ATENCIÓN</span>
                <p className="text-slate-800 font-bold text-sm">
                  Lunes a Viernes: 8:00 AM - 7:00 PM
                </p>
                <p className="text-slate-800 font-bold text-sm">
                  Sábado: 9:00 AM - 2:00 PM
                </p>
                <p className="text-xs text-slate-500">Servicio de guardia de urgencia 24/7 disponible para clientes preferentes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200">
          {isSubmitSuccessful ? (
            <div className="text-center py-12 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-slate-900">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-sans leading-relaxed">
                  Gracias por escribirnos, <strong>{formData.nombre}</strong>. Hemos recibido tu solicitud para el servicio de <strong>{formData.servicio}</strong>. Uno de nuestros asesores técnicos de Climatización Chavis se comunicará contigo al teléfono <strong>{formData.telefono}</strong> en un lapso estimado de 15 a 30 minutos.
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-sm mx-auto text-left space-y-3 font-sans text-xs">
                <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resumen de tu Solicitud</span>
                </div>
                <div><span className="text-slate-500">Nombre:</span> <span className="font-bold text-slate-800">{formData.nombre}</span></div>
                <div><span className="text-slate-500">Contacto:</span> <span className="font-bold text-slate-800">{formData.telefono} / {formData.email || 'No provisto'}</span></div>
                <div><span className="text-slate-500">Servicio solicitado:</span> <span className="font-bold text-sky-600">{formData.servicio}</span></div>
                {formData.mensaje && (
                  <div><span className="text-slate-500">Mensaje:</span> <p className="text-slate-600 mt-1 italic italic-font bg-white p-2.5 rounded border leading-relaxed font-sans">{formData.mensaje}</p></div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans font-bold rounded-xl transition duration-200 cursor-pointer text-xs"
                >
                  Enviar otro mensaje o agendar otra visita
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm font-sans">
              <h3 className="text-xl font-display font-extrabold text-slate-900">
                Formulario de Solicitud de Servicio
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5 focus-within:text-sky-600">
                  <label className="text-xs text-slate-600 font-bold block uppercase tracking-wide">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    name="nombre"
                    placeholder="Escribe tu nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-850 font-medium border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-1.5 focus-within:text-sky-600">
                  <label className="text-xs text-slate-600 font-bold block uppercase tracking-wide">
                    Número Celular / Directo *
                  </label>
                  <input
                    type="tel"
                    required
                    name="telefono"
                    placeholder="Ej. 81 1234 5678"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-850 font-medium border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email (Optional) */}
                <div className="space-y-1.5 focus-within:text-sky-600">
                  <label className="text-xs text-slate-600 font-bold block uppercase tracking-wide">
                    Correo Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-850 font-medium border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>

                {/* Type of service */}
                <div className="space-y-1.5 focus-within:text-sky-600">
                  <label className="text-xs text-slate-600 font-bold block uppercase tracking-wide">
                    Servicio Requerido
                  </label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 text-slate-800 font-medium border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-xl px-3 py-3 outline-none transition-all cursor-pointer"
                  >
                    <option>Mantenimiento Preventivo</option>
                    <option>Mantenimiento Premium Chavis</option>
                    <option>Instalación Mini-Split</option>
                    <option>Carga de Gas Refrigerante</option>
                    <option>Reparación de Fugas / Falla Eléctrica</option>
                    <option>Diagnóstico General / Error en Display</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 focus-within:text-sky-600">
                <label className="text-xs text-slate-600 font-bold block uppercase tracking-wide">
                  Describe los síntomas o necesidades del equipo (Opcional)
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  placeholder="Ej: Mi MiniSplit enciende pero no avienta aire frío, o parpadea una luz..."
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 text-slate-850 font-medium border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition duration-200 shadow-lg shadow-sky-600/20 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'Solicitar Presupuesto Gratis'}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-normal">
                Al enviar este formulario aceptas que Climatización Chavis te envíe un mensaje técnico o llamada telefónica para acordar la cotización o coordinar la visita técnica de diagnóstico.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Decorative Interactive Map Simulator */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h4 className="text-lg font-display font-extrabold text-slate-900">Cobertura de Servicio</h4>
            <p className="text-slate-500 font-sans text-xs">Atendemos de manera express las siguientes zonas del área metropolitana:</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full">Zona Regiomontana</span>
        </div>

        {/* Mock visual grid representing the mapped coverage territory */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-sans text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <span className="font-extrabold text-slate-900 block font-display">Monterrey</span>
            <span className="text-[10px] text-slate-400">Atención express</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <span className="font-extrabold text-slate-900 block font-display">San Pedro Garza García</span>
            <span className="text-[10px] text-slate-400">Atención express</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <span className="font-extrabold text-slate-900 block font-display">San Nicolás / Escobedo</span>
            <span className="text-[10px] text-slate-400">Visitas programadas</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <span className="font-extrabold text-slate-900 block font-display">Guadalupe / Apodaca</span>
            <span className="text-[10px] text-slate-400">Visitas programadas</span>
          </div>
        </div>
      </section>
    </div>
  );
}
