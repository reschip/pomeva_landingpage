import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EditorialOnboardingProps {
  categories: Record<string, { img: string }>;
  ctaCategory: string;
  setCtaCategory: (cat: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EditorialOnboarding: React.FC<EditorialOnboardingProps> = ({
  categories,
  ctaCategory,
  setCtaCategory,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const categoryNames = Object.keys(categories);
  const activeImage = categories[ctaCategory]?.img ?? categories[categoryNames[0]]?.img;

  return (
    <section
      aria-label="Comenzar integración por sector"
      className="relative bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
        {/* Left Column: Editorial Headline + Sector Selector + CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2
            className="font-editorial-sans text-[clamp(1.85rem,3.8vw,3.15rem)] leading-[1.08] tracking-[-0.035em] font-medium text-[#111111]"
            style={{ textWrap: 'balance' }}
          >
            Prepara tu tienda para{' '}
            <span className="text-[#DC2626]">entender</span> mejor.
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.48] text-[#52524E] font-normal max-w-lg"
            style={{ textWrap: 'pretty' }}
          >
            Selecciona tu sector principal y descubre cómo Pomeva AI se adapta a tu catálogo.
          </p>

          {/* Sector Selector (open canvas with Hero orange dots) */}
          <div
            role="group"
            aria-label="Seleccionar sector principal"
            className="flex flex-wrap gap-x-6 gap-y-3 my-8"
          >
            {categoryNames.map((cat) => {
              const isActive = ctaCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCtaCategory(cat)}
                  aria-pressed={isActive}
                  className="inline-flex items-center gap-2.5 py-1 transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] group"
                >
                  <span
                    aria-hidden="true"
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-[#F97316]'
                        : 'w-2 h-2 bg-[#FDBA74] group-hover:bg-[#FB923C]'
                    }`}
                  />
                  <span
                    className={`text-[14px] sm:text-[15px] transition-colors duration-200 ${
                      isActive
                        ? 'text-[#111111] font-semibold'
                        : 'text-[#595957] font-normal group-hover:text-[#111111]'
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="bg-[#111111] text-[#FFFFFF] hover:bg-[#DC2626] px-7 py-4 text-[12px] uppercase tracking-[0.16em] font-semibold transition-colors duration-300 w-fit inline-flex items-center gap-3 group focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
          >
            <span>Comenzar Integración</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right Column: Sharp-Edged Borderless Editorial Photograph */}
        <div className="lg:col-span-6">
          <div className="relative w-full max-w-[560px] mx-auto lg:ml-auto aspect-[4/4.2] bg-[#F3F3F1] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={ctaCategory}
                src={activeImage}
                alt={ctaCategory}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
