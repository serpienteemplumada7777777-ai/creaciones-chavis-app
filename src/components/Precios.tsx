import React from 'react';
import { Check, Info, ShieldCheck, Flame, Wind, Snowflake, BadgePercent } from 'lucide-react';

interface PreciosProps {
  onNavigateToContact: () => void;
}

export default function Precios({ onNavigateToContact }: PreciosProps) {
  const pricingPlans = [
    {
      title: "Mantenimiento Express",
      price: "$650",
      period: "por equipo",
      subtitle: "Mantenimiento preventivo esencial para Mini-Splits",
      features: [
        "Limpieza profunda de filtros de aire",
        "Lavado a presión de serpentín evaporador",
        "Inspección de presiones de gas refrigerante",
        "Ajuste de conexiones eléctricas",
        "Prueba de drenado para evitar gopas de agua",
        "Diagnóstico de amperaje del compresor"
      ],
      isPopular: false,
      badge: "Recomendado 2 veces al año",
      color: "border-slate-200"
    },
    {
      title: "Servicio Premium Chavis",
      price: "$1,200",
      period: "por equipo",
      subtitle: "Limpieza profunda integral y optimización de rendimiento",
      features: [
        "Todo lo incluido en Mantenimiento Express",
        "Desmontaje y lavado de turbinas a presión",
        "Aplicación de tratamiento químico desinfectante y fungicida",
        "Carga parcial de refrigerante hasta un 15% faltante",
        "Limpieza y soplado del serpentín condensador exterior",
        "Garantía de rendimiento óptimo por 90 días"
      ],
      isPopular: true,
      badge: "El Más Solicitado",
      color: "border-sky-500 ring-2 ring-sky-500/20"
    },
    {
      title: "Instalación Estándar",
      price: "$1,800",
      period: "desde",
      subtitle: "Instalación profesional de equipos Mini-Split nuevos",
      features: [
        "Fijación de placa y perforación de muro estándar",
        "Instalación de unidad condensadora exterior en bases",
        "Conexión de tuberías e interconexión eléctrica",
        "Prueba de vacío obligatoria con bomba (clave para durabilidad)",
        "Aislamiento térmico de tuberías de cobre",
        "Arranque y verificación inicial de temperaturas"
      ],
      isPopular: false,
      badge: "Garantía de Instalación",
      color: "border-slate-200"
    }
  ];

  const genericServices = [
    { name: "Diagnóstico técnico a domicilio", price: "$250", note: "Se descuenta del costo total si se acepta la reparación." },
    { name: "Carga de Gas Refrigerante Ecológico R410 (Completa)", price: "$900 - $1,500", note: "Dependiendo de capacidad del equipo (1 a 3 Toneladas)." },
    { name: "Detección y Sellado de Fugas de Refrigerante", price: "$750+", note: "Requiere prueba de presión con nitrógeno." },
    { name: "Cambio de Capacitor de Arranque (Compresor/Ventilador)", price: "$450 - $700", note: "Incluye la pieza original correspondiente." },
    { name: "Mantenimiento a Calefactores de Gas / Eléctricos", price: "$600", note: "Revisión profunda de espreas, piloto y válvulas de seguridad." },
  ];

  return (
    <div className="space-y-16 py-4 animate-fadeIn">
      {/* Top Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Tarifas Claras y <span className="text-sky-600">Precios Transparentes</span>
        </h1>
        <p className="text-slate-600 font-sans leading-relaxed text-base md:text-lg">
          En Climatización Chavis no hay cargos ocultos. Te brindamos tarifas justas y te explicamos exactamente qué estás pagando antes de iniciar de forma que siempre estés al control.
        </p>
      </section>

      {/* Main Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between p-8 bg-white rounded-3xl border ${plan.color} relative shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            {plan.isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-sky-600 text-white text-[11px] font-sans font-bold uppercase tracking-wider rounded-full shadow-md z-10">
                {plan.badge}
              </span>
            )}
            {!plan.isPopular && plan.badge && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-sans font-semibold rounded border border-slate-200">
                {plan.badge}
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900">{plan.title}</h3>
                <p className="text-slate-500 text-xs font-sans mt-1">{plan.subtitle}</p>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-4xl md:text-5xl font-display font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-500 text-xs font-sans font-medium">MXN / {plan.period}</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-50">
              <button
                onClick={onNavigateToContact}
                className={`w-full py-3 px-4 font-sans font-bold text-center text-sm rounded-xl transition-all duration-200 cursor-pointer ${
                  plan.isPopular
                    ? "bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                }`}
              >
                Contratar Servicio
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Additional Services Table */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-extrabold text-slate-900">
            Detalle de Reparaciones Generales
          </h2>
          <p className="text-slate-500 font-sans text-xs sm:text-sm">
            Si tu equipo tiene una falla específica, a continuación se desglosan estimados para las reparaciones más comunes:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-3 px-4">Servicio / Reparación</th>
                <th className="py-3 px-4 text-right">Rango Estimado (MXN)</th>
                <th className="py-3 px-4 hidden sm:table-cell">Notas de transparencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-750">
              {genericServices.map((service, idx) => (
                <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{service.name}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-sky-700">{service.price}</td>
                  <td className="py-3.5 px-4 text-slate-500 hidden sm:table-cell italic">{service.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-sky-100 text-xs sm:text-sm font-sans text-slate-600">
          <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">¿Tienes múltiples equipos?</h4>
            <p className="leading-relaxed">
              Ofrecemos atractivos descuentos corporativos o residenciales por volumen a partir de <strong>3 equipos</strong> en el mismo domicilio. Contáctanos para solicitar una cotización especial.
            </p>
          </div>
        </div>
      </section>

      {/* Assurance Section */}
      <section className="text-center bg-sky-900 text-white rounded-3xl p-8 md:p-12 space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <ShieldCheck className="w-12 h-12 text-sky-400 mx-auto" />
          <h3 className="text-2xl font-display font-extrabold">Trabajo Protegido</h3>
          <p className="text-sky-200 font-sans leading-relaxed text-sm">
            Todos nuestros servicios técnicos están amparados por un comprobante de servicio foliado que describe la garantía establecida, piezas instaladas y diagnóstico verificado. Tu tranquilidad total vale oro para nosotros.
          </p>
        </div>
        <div>
          <button
            onClick={onNavigateToContact}
            className="px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-sans font-extrabold rounded-xl transition-all duration-200 cursor-pointer"
          >
            Quiero agendar ahora
          </button>
        </div>
      </section>
    </div>
  );
}
