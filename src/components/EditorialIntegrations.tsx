import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';
import { useLanguage } from '../i18n/LanguageContext';
import type { IntegrationPlatform } from '../i18n/content';

export type { IntegrationPlatform };

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
  const { t } = useLanguage();
  const integrationList = Object.values(integrations);
  const activeIntegration = integrations[activeIntegrationId] ?? integrationList[0];

  return (
    <section
      aria-label={t.integrations.sectionAria}
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
            {t.integrations.titleBefore}{' '}
            <span className="text-[#FF786B]">{t.integrations.titleHighlight}</span>{' '}
            {t.integrations.titleAfter}
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.5] text-[#555D5B] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            {t.integrations.subtitle}
          </p>
        </motion.div>

        {/* Two-column Integration Pipeline */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-20 items-center">
          {/* Left Column: Open Platform Selector */}
          <div
            role="group"
            aria-label={t.integrations.groupAria}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            {integrationList.map((node) => {
              const isActive = activeIntegrationId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveIntegrationId(node.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF786B] group ${
                    isActive ? 'bg-[#F2EAD8]' : 'hover:bg-[#F2EAD8]/60'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`block rounded-full shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'w-5 h-2.5 bg-[#FF786B]'
                        : 'w-2.5 h-2.5 bg-[#FFB45E] group-hover:bg-[#FF786B]'
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
                      className={`font-citrus-display text-[17px] tracking-[-0.015em] transition-colors duration-300 ${
                        isActive
                          ? 'text-[#252A29] font-semibold'
                          : 'text-[#555D5B] font-medium group-hover:text-[#252A29]'
                      }`}
                    >
                      {node.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] mt-0.5">
                      {node.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Animated Flow from Raw Catalog to Pomeva AI */}
          <div className="lg:col-span-8 flex flex-col min-w-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 xl:gap-10">
              {/* Step 1: Raw Catalog */}
              <div className="flex flex-col items-center gap-4 shrink-0">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold">
                  {t.integrations.rawCatalog}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`raw-${activeIntegration.id}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="flex items-center -space-x-3 pt-1"
                  >
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, -4, 0] }
                      }
                      transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
                      className="w-28 h-36 xl:w-32 xl:h-40 rounded-3xl bg-[#F2EAD8] overflow-hidden -rotate-3 relative z-10"
                    >
                      <img
                        src={activeIntegration.photos[0]}
                        alt={t.integrations.productAlt(activeIntegration.name, 1)}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, 4, 0] }
                      }
                      transition={{ repeat: Infinity, duration: 3.4, delay: 0.5, ease: 'easeInOut' }}
                      className="w-28 h-36 xl:w-32 xl:h-40 rounded-3xl bg-[#F2EAD8] overflow-hidden rotate-3 translate-y-2 relative z-0"
                    >
                      <img
                        src={activeIntegration.photos[1]}
                        alt={t.integrations.productAlt(activeIntegration.name, 2)}
                        className="w-full h-full object-cover opacity-85"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Animated Stream: Catálogo Bruto -> Pomeva AI -> Inteligencia AI */}
              <div
                className="flex flex-col md:flex-row items-center gap-2 xl:gap-3 shrink-0"
                aria-hidden="true"
              >
                {/* Incoming traveling particles */}
                <div className="relative w-12 xl:w-16 h-5 overflow-hidden flex items-center justify-end rotate-90 md:rotate-0 my-3 md:my-0">
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
                        className="absolute left-0 w-2 h-2 rounded-full bg-[#FFB45E]"
                      />
                    ))}
                  <ArrowRight size={15} className="text-[#FFB45E] relative z-10 bg-[#F9F4E9]" />
                </div>

                {/* Processing Pomelo on sunlit Lemon flat circle */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.07, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-[#F5D86E] flex items-center justify-center shrink-0"
                >
                  <PomeloIcon className="w-8 h-8 xl:w-9 xl:h-9 shrink-0" />
                </motion.div>

                {/* Outgoing traveling particles */}
                <div className="relative w-12 xl:w-16 h-5 overflow-hidden flex items-center justify-end rotate-90 md:rotate-0 my-3 md:my-0">
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
                        className="absolute left-0 w-2 h-2 rounded-full bg-[#FF786B]"
                      />
                    ))}
                  <ArrowRight size={15} className="text-[#FF786B] relative z-10 bg-[#F9F4E9]" />
                </div>
              </div>

              {/* Step 3: Structured AI Output */}
              <div className="flex flex-col items-center md:items-start gap-4 w-full max-w-[270px] xl:max-w-[290px] min-w-0">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#C94437] font-semibold">
                  {t.integrations.aiIntelligence}
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
                          className="w-12 h-14 rounded-2xl object-cover bg-[#F2EAD8]"
                        />
                        <img
                          src={activeIntegration.photos[1]}
                          alt=""
                          className="w-12 h-14 rounded-2xl object-cover bg-[#F2EAD8]"
                        />
                      </div>
                      <div>
                        <div className="font-citrus-display text-[17px] font-semibold text-[#252A29] leading-tight">
                          {t.integrations.recommendedBundle}
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.12em] text-[#C94437] font-semibold mt-1">
                          {t.integrations.semanticMatch}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[14px]">
                      <span className="w-5 h-5 rounded-full bg-[#FF786B] flex items-center justify-center text-[#F9F4E9] shrink-0">
                        <Check size={11} strokeWidth={2.8} />
                      </span>
                      <span className="font-semibold text-[#252A29]">
                        {t.integrations.connected(activeIntegration.name)}
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
