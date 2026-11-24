import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';
import { DiscoveryCitrusBackdrop } from './CitrusIllustrations';
import { useLanguage } from '../i18n/LanguageContext';
import type { DiscoveryIntent } from '../i18n/content';

export type { DiscoveryIntent };

interface EditorialDiscoveryProps {
  intents: DiscoveryIntent[];
  activeIntentIndex: number;
  setActiveIntentIndex: (idx: number) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CATALOG_SLOTS = Array.from({ length: 16 }, (_, idx) => idx);
const ACTIVE_CITRUS_FILLS = ['#FF786B', '#FFB45E', '#F5D86E'];

function parseIntentTag(tag: string): { label?: string; value: string } {
  const separatorIndex = tag.indexOf(':');
  if (separatorIndex === -1) {
    return { value: tag.trim() };
  }
  return {
    label: tag.slice(0, separatorIndex).trim(),
    value: tag.slice(separatorIndex + 1).trim(),
  };
}

export const EditorialDiscovery: React.FC<EditorialDiscoveryProps> = ({
  intents,
  activeIntentIndex,
  setActiveIntentIndex,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const activeIntent = intents[activeIntentIndex] ?? intents[0];

  return (
    <section
      aria-label={t.discovery.sectionAria}
      className="relative bg-[#252A29] text-[#F9F4E9] font-citrus-sans py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <DiscoveryCitrusBackdrop />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto">
        {/* Centered Headline */}
        <motion.div
          initial={false}
          whileInView={prefersReducedMotion ? undefined : { y: [8, 0] }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="text-center mx-auto max-w-[940px] mb-16 sm:mb-20 lg:mb-24"
        >
          <h2
            className="font-citrus-display text-[clamp(1.85rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.03em] font-semibold text-[#F9F4E9]"
            style={{ textWrap: 'balance' }}
          >
            {t.discovery.titleBefore}{' '}
            <span className="text-[#F5D86E]">{t.discovery.titleHighlight}</span>{' '}
            {t.discovery.titleAfter}
          </h2>
        </motion.div>

        {/* Two-column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center lg:min-h-[540px]">
          {/* Left Column: Open Intent List */}
          <div
            role="group"
            aria-label={t.discovery.groupAria}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {intents.map((intent, idx) => {
              const isActive = activeIntentIndex === idx;
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => setActiveIntentIndex(idx)}
                  aria-pressed={isActive}
                  className="w-full text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5D86E] rounded-2xl group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      aria-hidden="true"
                      className={`block rounded-full transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'w-6 h-2.5 bg-[#FF786B]'
                          : 'w-2.5 h-2.5 bg-[#FFB45E] opacity-55 group-hover:opacity-100'
                      }`}
                    />
                    <span
                      className={`text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-[#F5D86E]'
                          : 'text-[#C9C4B8] group-hover:text-[#F9F4E9]'
                      }`}
                    >
                      {intent.label}
                    </span>
                  </div>

                  <p
                    className={`font-citrus-display text-[19px] sm:text-[21px] leading-[1.42] tracking-[-0.015em] font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-[#F9F4E9]'
                        : 'text-[#C9C4B8] opacity-75 group-hover:opacity-100'
                    }`}
                    style={{ textWrap: 'pretty' }}
                  >
                    “{intent.quote}”
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Flat Rounded Citrus Catalog Mapping */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [12, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="lg:col-span-7 flex flex-col items-center"
          >
            <div className="w-full max-w-[430px] sm:max-w-[470px]">
              {/* Top Meta Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#C9C4B8] font-semibold">
                  {t.discovery.catalogMapping}
                </span>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#F9F4E9] font-semibold">
                  <span>Pomera</span>
                  <PomeloIcon className="w-5 h-5 shrink-0" />
                </div>
              </div>

              {/* 4x4 Rounded Flat Citrus Matrix (no borders, pure flat fills) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {CATALOG_SLOTS.map((slotIndex) => {
                  const activeOrder = activeIntent.activeNodes.indexOf(slotIndex);
                  const isActive = activeOrder !== -1;
                  const skuCode = String(slotIndex + 1).padStart(2, '0');
                  const activeFill =
                    ACTIVE_CITRUS_FILLS[activeOrder % ACTIVE_CITRUS_FILLS.length];

                  return (
                    <motion.div
                      key={`${activeIntentIndex}-${slotIndex}`}
                      initial={false}
                      animate={{
                        backgroundColor: isActive ? activeFill : '#313736',
                        scale: !prefersReducedMotion && isActive ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: isActive ? (slotIndex % 4) * 0.07 : 0,
                        ease: EASE_OUT,
                      }}
                      className="aspect-square rounded-[20px] sm:rounded-[24px] flex flex-col justify-between p-2.5 sm:p-3 select-none"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] tracking-[0.08em] tabular-nums font-semibold ${
                            isActive ? 'text-[#252A29]' : 'text-[#C9C4B8] opacity-65'
                          }`}
                        >
                          {skuCode}
                        </span>
                        {isActive && (
                          <motion.span
                            initial={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, scale: 0.6 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.18 + (slotIndex % 4) * 0.06,
                              ease: EASE_OUT,
                            }}
                            className="w-5 h-5 rounded-full bg-[#252A29] flex items-center justify-center text-[#F9F4E9] shrink-0"
                          >
                            <Check size={11} strokeWidth={2.8} />
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Signal Readout */}
              <div className="mt-7 h-[56px] sm:h-[38px] flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`signals-${activeIntent.id}`}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.38, ease: EASE_OUT }}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                    >
                      {activeIntent.tags.map((tag, idx) => {
                        const parsed = parseIntentTag(tag);
                        return (
                          <React.Fragment key={tag}>
                            <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
                              {parsed.label && (
                                <span className="text-[11px] uppercase tracking-[0.14em] text-[#C9C4B8]">
                                  {parsed.label}
                                </span>
                              )}
                              <span className="font-citrus-sans text-[14px] sm:text-[15px] font-semibold text-[#F9F4E9]">
                                {parsed.value}
                              </span>
                            </span>
                            {idx < activeIntent.tags.length - 1 && (
                              <span className="text-[#FFB45E]" aria-hidden="true">
                                ●
                              </span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="inline-flex items-baseline gap-2.5 shrink-0">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#C9C4B8]">
                    {t.discovery.matches}
                  </span>
                  <span className="font-citrus-display text-[24px] sm:text-[26px] leading-none font-bold tracking-[-0.02em] text-[#FFB45E] tabular-nums">
                    {activeIntent.activeNodes.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
