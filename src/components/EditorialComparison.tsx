import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';
import { ComparisonCitrusAccent } from './CitrusIllustrations';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TRADITIONAL_THUMBS = [
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
  '/images/crema_facial_1.jpg',
  '/images/crema_facial_2.jpg',
];

export const EditorialComparison: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Comparativa entre búsqueda tradicional y Pomeva AI"
      className="relative bg-[#F9F4E9] text-[#252A29] font-citrus-sans py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto">
        {/* Centered Headline */}
        <motion.div
          initial={false}
          whileInView={prefersReducedMotion ? undefined : { y: [8, 0] }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="text-center mx-auto max-w-[920px] mb-16 sm:mb-20 lg:mb-24"
        >
          <h2
            className="font-citrus-display text-[clamp(1.85rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.03em] font-semibold text-[#252A29]"
            style={{ textWrap: 'balance' }}
          >
            Help customers find the{' '}
            <span className="text-[#FF786B]">right products, faster.</span>
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.5] text-[#555D5B] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            Reduce la fricción entre la intención y el carrito de compras mediante una experiencia de descubrimiento contextual.
          </p>
        </motion.div>

        {/* Two-column Comparison */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left: Traditional Search */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [10, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold">
                Búsqueda Tradicional
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-medium bg-[#F2EAD8] px-3 py-1 rounded-full">
                Lenta
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Search size={16} className="text-[#555D5B] shrink-0" aria-hidden="true" />
              <p className="text-[17px] sm:text-[18px] text-[#555D5B] font-normal">
                “crema hidratante para invierno...”
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {TRADITIONAL_THUMBS.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-[#F2EAD8] overflow-hidden"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover opacity-75 saturate-[0.65]"
                  />
                </div>
              ))}
            </div>

            <p className="text-[15px] leading-[1.55] text-[#555D5B]">
              Resultados abrumadores, filtros manuales y alta fricción.
            </p>
          </motion.div>

          {/* Right: Pomeva AI */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [10, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#252A29] font-semibold">
                <PomeloIcon className="w-5 h-5 shrink-0" />
                <span>Pomeva AI</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#252A29] font-semibold bg-[#F5D86E] px-3 py-1 rounded-full">
                Instantánea
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span
                aria-hidden="true"
                className="w-3 h-3 rounded-full bg-[#FF786B] shrink-0"
              />
              <p className="font-citrus-display text-[20px] sm:text-[23px] leading-[1.35] text-[#252A29] font-semibold">
                “Tengo la piel muy seca por el frío...”
              </p>
            </div>

            <div className="relative mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-7 sm:gap-9 pt-2">
              <ComparisonCitrusAccent />
              <div className="relative z-10 w-44 h-52 sm:w-48 sm:h-56 lg:w-56 lg:h-64 rounded-3xl bg-[#F2EAD8] overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=520&h=600&fit=crop"
                  alt="Kit Hidratación Profunda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <div className="inline-block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#C94437] mb-2.5">
                  Solución Exacta
                </div>
                <div className="font-citrus-display text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.1] tracking-[-0.025em] font-semibold text-[#252A29]">
                  Kit Hidratación Profunda
                </div>
                <div className="text-[16px] sm:text-[18px] text-[#555D5B] mt-2.5">
                  Sérum + Crema Barrera
                </div>
              </div>
            </div>

            <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#252A29] font-medium">
              Descubrimiento contextual y recomendaciones listas para comprar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
