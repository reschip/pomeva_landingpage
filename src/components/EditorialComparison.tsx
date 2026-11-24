import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';

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
            Help customers find the{' '}
            <span className="text-[#DC2626]">right products, faster.</span>
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.48] text-[#52524E] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            Reduce la fricción entre la intención y el carrito de compras mediante una experiencia de descubrimiento contextual.
          </p>
        </motion.div>

        {/* Two-column Editorial Comparison */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left: Traditional Search (subtle natural color, muted clarity) */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [10, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium">
                Búsqueda Tradicional
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium">
                Lenta
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Search size={16} className="text-[#737370] shrink-0" aria-hidden="true" />
              <p className="text-[17px] sm:text-[18px] text-[#737370] font-normal">
                “crema hidratante para invierno...”
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {TRADITIONAL_THUMBS.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#F3F3F1] overflow-hidden"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover opacity-75 saturate-[0.7]"
                  />
                </div>
              ))}
            </div>

            <p className="text-[14px] leading-[1.5] text-[#595957]">
              Resultados abrumadores, filtros manuales y alta fricción.
            </p>
          </motion.div>

          {/* Right: Pomeva AI (larger product photography & larger typography) */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [10, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111] font-semibold">
                <PomeloIcon className="w-4 h-4 shrink-0" />
                <span>Pomeva AI</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#DC2626] font-semibold">
                Instantánea
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0"
              />
              <p className="text-[19px] sm:text-[22px] leading-[1.38] text-[#111111] font-medium">
                “Tengo la piel muy seca por el frío...”
              </p>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-7 sm:gap-8">
              <div className="w-44 h-52 sm:w-48 sm:h-56 lg:w-56 lg:h-64 bg-[#F3F3F1] overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=520&h=600&fit=crop"
                  alt="Kit Hidratación Profunda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#C2410C] mb-2.5">
                  Solución Exacta
                </div>
                <div className="text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.12] tracking-[-0.03em] font-medium text-[#111111]">
                  Kit Hidratación Profunda
                </div>
                <div className="text-[16px] sm:text-[18px] text-[#52524E] mt-2.5">
                  Sérum + Crema Barrera
                </div>
              </div>
            </div>

            <p className="text-[16px] sm:text-[17px] leading-[1.5] text-[#111111] font-medium">
              Descubrimiento contextual y recomendaciones listas para comprar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
