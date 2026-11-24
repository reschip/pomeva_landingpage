import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { OnboardingCitrusBackdrop } from './CitrusIllustrations';
import { useLanguage } from '../i18n/LanguageContext';
import type { OnboardingCategory } from '../i18n/content';

export type { OnboardingCategory };

interface EditorialOnboardingProps {
  categories: OnboardingCategory[];
  ctaCategory: string;
  setCtaCategory: (id: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EditorialOnboarding: React.FC<EditorialOnboardingProps> = ({
  categories,
  ctaCategory,
  setCtaCategory,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const activeCat = categories.find((c) => c.id === ctaCategory) ?? categories[0];

  return (
    <section
      id="integrar"
      aria-label={t.onboarding.sectionAria}
      className="relative bg-[#252A29] text-[#F9F4E9] font-citrus-sans py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <OnboardingCitrusBackdrop />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
        {/* Left Column: Headline + Sector Pill Selector + Rounded CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2
            className="font-citrus-display text-[clamp(1.95rem,4vw,3.35rem)] leading-[1.06] tracking-[-0.03em] font-semibold text-[#F9F4E9]"
            style={{ textWrap: 'balance' }}
          >
            {t.onboarding.titleBefore}{' '}
            <span className="text-[#F5D86E]">{t.onboarding.titleHighlight}</span>{' '}
            {t.onboarding.titleAfter}
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.5] text-[#C9C4B8] font-normal max-w-lg"
            style={{ textWrap: 'pretty' }}
          >
            {t.onboarding.subtitle}
          </p>

          {/* Sector Pill Selector (zero borders, solid flat fills) */}
          <div
            role="group"
            aria-label={t.onboarding.groupAria}
            className="flex flex-wrap gap-3 my-9"
          >
            {categories.map((cat) => {
              const isActive = activeCat.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCtaCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D86E] ${
                    isActive
                      ? 'bg-[#F5D86E] text-[#252A29] font-semibold'
                      : 'bg-[#313736] text-[#F9F4E9] hover:bg-[#3D4443]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="bg-[#FF786B] text-[#252A29] hover:bg-[#FFB45E] px-8 py-4 rounded-full text-[13px] tracking-[0.06em] uppercase font-bold transition-all duration-300 hover:scale-[1.02] w-fit inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D86E]"
          >
            <span>{t.onboarding.ctaButton}</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right Column: Rounded Borderless Photograph */}
        <div className="lg:col-span-6">
          <div className="relative w-full max-w-[540px] mx-auto lg:ml-auto aspect-[4/4.2] rounded-[32px] bg-[#313736] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCat.id}
                src={activeCat.img}
                alt={activeCat.label}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
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
