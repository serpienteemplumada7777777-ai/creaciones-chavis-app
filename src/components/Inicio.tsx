import React from 'react';
import { Wind, Shield, Users, Clock, Flame, CheckCircle, FlameKindling } from 'lucide-react';

interface InicioProps {
  onNavigateToContact: () => void;
  onNavigateToPrices: () => void;
}

export default function Inicio({ onNavigateToContact, onNavigateToPrices }: InicioProps) {
  return (
    <div className="space-y-16 py-4 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-16">
        {/* Subtle decorative circles for layout rhythm */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-500/10 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-500/10 blur-xl"></div>
        
        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Wind className="w-3.5 h-3.5 mr-1 animate-pulse" />
            <span>Aire Acondicionado y Calefacción</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            Climatización <span className="text-sky-400">Chavis</span>
          </h1>
          
          <p className="text-lg text-slate-300 leading-relaxed font-sans">
            Garantizamos el clima perfecto para tu hogar, oficina o negocio. Somos expertos en instalación, mantenimiento preventivo y reparación urgente de equipos de climatización con tarifas claras y sin sorpresas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-sans font-bold rounded-xl shadow-lg shadow-sky-600/30 transition-all duration-200 text-center hover:scale-[1.02] cursor-pointer"
            >
              Contacta con nosotros
            </button>
            <button
              onClick={onNavigateToPrices}
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-bold rounded-xl border border-slate-750 transition-all duration-200 text-center hover:scale-[1.02] cursor-pointer"
            >
              Ver Precios Honestos
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid Summary */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Soluciones Completas en Climatización
          </h2>
          <p className="text-slate-600 font-sans">
            Nos adaptamos a las necesidades de tu espacio, asegurando el máximo rendimiento y menor consumo de energía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-extrabold text-slate-900">Aire Acondicionado</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Instalación y mantenimiento de sistemas Mini-Split, centrales y multi-split. Ideal para mantenerte fresco durante las temporadas de calor intenso.
            </p>
          </div>

          <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-extrabold text-slate-900">Calefacción Eficiente</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Diagnóstico, revisión y acondicionamiento de calefactores y bombas de calor para que tu hogar mantenga una temperatura acogedora y segura en invierno.
            </p>
          </div>

          <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-extrabold text-slate-900">Mantenimiento Predictivo</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Limpieza profunda, recarga de gas ecológico, detección de fugas y ajuste general del sistema para evitar costosas averías futuras y reducir tu factura de luz.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Guarantees */}
      <section className="bg-sky-50 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            ¿Por qué elegir Climatización Chavis?
          </h2>
          <p className="text-slate-600 font-sans leading-relaxed">
            Ofrecemos un servicio de cercanía, con técnicos experimentados que respetan tu casa o negocio. Nuestra máxima prioridad es la honestidad, la puntualidad y el trabajo impecable.
          </p>

          <div className="space-y-4 font-sans text-slate-800">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Garantía Escrita</strong>
                <span className="text-sm text-slate-600">Todas nuestras instalaciones de equipos cuentan con garantía de satisfacción.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Ahorro Energético Garantizado</strong>
                <span className="text-sm text-slate-600">Optimizamos tus aparatos actuales para que consuman menos energía eléctrica.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Precios Claros y Cerrados</strong>
                <span className="text-sm text-slate-600">Te damos un presupuesto transparente antes de realizar cualquier intervención.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center space-y-2">
            <div className="text-3xl font-display font-extrabold text-sky-600">100%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Clientes Satisfechos</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center space-y-2">
            <div className="text-3xl font-display font-extrabold text-sky-600">+15 Años</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">De Experiencia</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center space-y-2">
            <div className="text-3xl font-display font-extrabold text-sky-600">24/7</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Asistencia Técnica</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center space-y-2">
            <div className="text-3xl font-display font-extrabold text-sky-600">Rápido</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Servicio a Domicilio</div>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white space-y-6">
        <h3 className="text-2xl md:text-3xl font-display font-extrabold">¿Tu aire no enfría como debería?</h3>
        <p className="text-slate-300 max-w-xl mx-auto font-sans leading-relaxed text-sm sm:text-base">
          No pases calor hoy. Una limpieza profunda o una carga de refrigerante suele solucionar la mayoría de problemas de rendimiento. ¡Escríbenos y agendemos hoy mismo!
        </p>
        <div>
          <button
            onClick={onNavigateToContact}
            className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-sans font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
          >
            Agendar Revisión Directa
          </button>
        </div>
      </section>
    </div>
  );
}
