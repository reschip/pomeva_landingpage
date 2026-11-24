import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';

export interface IntegrationPlatform {
  id: string;
  name: string;
  tag: string;
  color: string;
  img: string;
  metrics: {
    products: string;
    syncTime: string;
  };
  photos: string[];
}

interface EditorialIntegrationsProps {
  integrations: Record<string, IntegrationPlatform>;
  activeIntegrationId: string;
  setActiveIntegrationId: (id: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FLOW_DOTS = [0, 0.35, 0.7];

export const EditorialIntegrations: React.FC<EditorialIntegrationsProps> = ({
  integrations,
  activeIntegrationId,
  setActiveIntegrationId,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const integrationList = Object.values(integrations);
  const activeIntegration = integrations[activeIntegrationId] ?? integrationList[0];

  return (
    <section
      aria-label="Integración con plataformas de ecommerce"
      className="relative bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto">
        {/* Centered Editorial Headline */}
        <motion.div
          initial={false}
          whileInView={prefersReducedMotion ? undefined : { y: [8, 0] }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="text-center mx-auto max-w-[920px] mb-16 sm:mb-20 lg:mb-24"
        >
          <h2
            className="font-editorial-sans text-[clamp(1.75rem,3.6vw,3.05rem)] leading-[1.1] tracking-[-0.035em] font-medium text-[#111111]"
            style={{ textWrap: 'balance' }}
          >
            Conecta tu catálogo en{' '}
            <span className="text-[#DC2626]">minutos.</span>{' '}
            Empieza a vender mejor.
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.48] text-[#52524E] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            Pomeva procesa tu inventario, variables y contexto de forma nativa sin interrumpir la operación de tu tienda.
          </p>
        </motion.div>

        {/* Two-column Editorial Integration Pipeline */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          {/* Left Column: Open Platform Selector */}
          <div
            role="group"
            aria-label="Seleccionar plataforma"
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {integrationList.map((node) => {
              const isActive = activeIntegrationId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveIntegrationId(node.id)}
                  aria-pressed={isActive}
                  className="w-full text-left py-1.5 flex items-center gap-4 transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] group"
                >
                  <span
                    aria-hidden="true"
                    className={`block rounded-full shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-[#F97316]'
                        : 'w-2 h-2 bg-[#FDBA74] group-hover:bg-[#FB923C]'
                    }`}
                  />
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <img
                      src={node.img}
                      alt=""
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-65 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                  <div>
                    <div
                      className={`text-[17px] tracking-[-0.015em] transition-colors duration-300 ${
                        isActive
                          ? 'text-[#111111] font-semibold'
                          : 'text-[#595957] font-medium group-hover:text-[#111111]'
                      }`}
                    >
                      {node.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#737370] mt-0.5">
                      {node.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Animated Flow from Raw Catalog to Pomeva AI */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12">
              {/* Step 1: Raw Catalog */}
              <div className="flex flex-col items-center gap-4 shrink-0">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium">
                  Catálogo Bruto
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`raw-${activeIntegration.id}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="flex items-center -space-x-4 pt-1"
                  >
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, -3, 0] }
                      }
                      transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                      className="w-28 h-36 sm:w-32 sm:h-40 bg-[#F3F3F1] overflow-hidden -rotate-3 ring-2 ring-[#FFFFFF] relative z-10"
                    >
                      <img
                        src={activeIntegration.photos[0]}
                        alt={`${activeIntegration.name} producto 1`}
                        className="w-full h-full object-cover grayscale-[20%]"
                      />
                    </motion.div>
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, 3, 0] }
                      }
                      transition={{ repeat: Infinity, duration: 3.2, delay: 0.5, ease: 'easeInOut' }}
                      className="w-28 h-36 sm:w-32 sm:h-40 bg-[#F3F3F1] overflow-hidden rotate-3 translate-y-2 ring-2 ring-[#FFFFFF] relative z-0"
                    >
                      <img
                        src={activeIntegration.photos[1]}
                        alt={`${activeIntegration.name} producto 2`}
                        className="w-full h-full object-cover grayscale-[45%]"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Animated Stream: Catálogo Bruto -> Pomeva AI -> Inteligencia AI */}
              <div
                className="flex flex-col md:flex-row items-center gap-2 sm:gap-3 shrink-0"
                aria-hidden="true"
              >
                {/* Incoming traveling particles */}
                <div className="relative w-16 h-5 overflow-hidden flex items-center justify-end rotate-90 md:rotate-0 my-3 md:my-0">
                  {!prefersReducedMotion &&
                    FLOW_DOTS.map((delay, idx) => (
                      <motion.span
                        key={`in-${idx}`}
                        initial={{ x: -12, opacity: 0 }}
                        animate={{ x: [-12, 44], opacity: [0, 1, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          delay,
                          ease: 'easeInOut',
                        }}
                        className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#F97316]"
                      />
                    ))}
                  <ArrowRight size={14} className="text-[#F97316] relative z-10 bg-[#FFFFFF]" />
                </div>

                {/* Processing Pomelo */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.09, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
                  className="p-2 flex items-center justify-center"
                >
                  <PomeloIcon className="w-8 h-8 shrink-0" />
                </motion.div>

                {/* Outgoing traveling particles */}
                <div className="relative w-16 h-5 overflow-hidden flex items-center justify-end rotate-90 md:rotate-0 my-3 md:my-0">
                  {!prefersReducedMotion &&
                    FLOW_DOTS.map((delay, idx) => (
                      <motion.span
                        key={`out-${idx}`}
                        initial={{ x: -12, opacity: 0 }}
                        animate={{ x: [-12, 44], opacity: [0, 1, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          delay: delay + 0.45,
                          ease: 'easeInOut',
                        }}
                        className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626]"
                      />
                    ))}
                  <ArrowRight size={14} className="text-[#DC2626] relative z-10 bg-[#FFFFFF]" />
                </div>
              </div>

              {/* Step 3: Structured AI Output */}
              <div className="flex flex-col items-center md:items-start gap-4 w-full max-w-[290px] shrink-0">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#DC2626] font-semibold">
                  Inteligencia AI
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`out-${activeIntegration.id}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT }}
                    className="w-full space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2 shrink-0">
                        <img
                          src={activeIntegration.photos[0]}
                          alt=""
                          className="w-12 h-14 object-cover bg-[#F3F3F1] ring-2 ring-[#FFFFFF]"
                        />
                        <img
                          src={activeIntegration.photos[1]}
                          alt=""
                          className="w-12 h-14 object-cover bg-[#F3F3F1] ring-2 ring-[#FFFFFF]"
                        />
                      </div>
                      <div>
                        <div className="text-[16px] font-semibold text-[#111111] leading-tight">
                          Bundle Recomendado
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.12em] text-[#C2410C] mt-1">
                          Match Semántico
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[14px]">
                      <span className="w-4 h-4 rounded-full bg-[#F97316] flex items-center justify-center text-[#FFFFFF] shrink-0">
                        <Check size={10} strokeWidth={2.5} />
                      </span>
                      <span className="font-medium text-[#111111]">
                        {activeIntegration.name} conectado
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
