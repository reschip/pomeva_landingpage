import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';

export interface DiscoveryIntent {
  id: string;
  quote: string;
  tags: string[];
  activeNodes: number[];
}

interface EditorialDiscoveryProps {
  intents: DiscoveryIntent[];
  activeIntentIndex: number;
  setActiveIntentIndex: (idx: number) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CATALOG_SLOTS = Array.from({ length: 16 }, (_, idx) => idx);

/**
 * Splits a `"Clave: Valor"` intent tag into structured editorial parts.
 */
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
  const activeIntent = intents[activeIntentIndex] ?? intents[0];

  return (
    <section
      aria-label="Descubrimiento inteligente por intención"
      className="relative bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto">
        {/* Centered Editorial Headline */}
        <motion.div
          initial={false}
          whileInView={prefersReducedMotion ? undefined : { y: [8, 0] }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="text-center mx-auto max-w-[960px] mb-16 sm:mb-20 lg:mb-24"
        >
          <h2
            className="font-editorial-sans text-[clamp(1.75rem,3.6vw,3.05rem)] leading-[1.1] tracking-[-0.035em] font-medium text-[#111111]"
            style={{ textWrap: 'balance' }}
          >
            Transformando catálogos estáticos en{' '}
            <span className="text-[#DC2626]">experiencias</span> de compra inteligentes.
          </h2>
        </motion.div>

        {/* Two-column Editorial Layout with locked stage height to prevent layout jump */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center lg:min-h-[540px]">
          {/* Left Column: Open Editorial Intent List (consistent weight avoids line-wrap jumps) */}
          <div
            role="group"
            aria-label="Seleccionar intención de compra"
            className="lg:col-span-5 flex flex-col gap-7"
          >
            {intents.map((intent, idx) => {
              const isActive = activeIntentIndex === idx;
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => setActiveIntentIndex(idx)}
                  aria-pressed={isActive}
                  className="w-full text-left transition-colors duration-300 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] group"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-3 h-3 flex items-center justify-center shrink-0">
                      <span
                        aria-hidden="true"
                        className={`block rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-2.5 h-2.5 bg-[#F97316]'
                            : 'w-2 h-2 bg-[#FDBA74] group-hover:bg-[#FB923C]'
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-[#111111]'
                          : 'text-[#737370] group-hover:text-[#111111]'
                      }`}
                    >
                      {intent.id}
                    </span>
                  </div>

                  <p
                    className={`font-editorial-sans text-[17px] sm:text-[19px] leading-[1.48] tracking-[-0.015em] font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-[#111111]'
                        : 'text-[#737370] group-hover:text-[#111111]'
                    }`}
                    style={{ textWrap: 'pretty' }}
                  >
                    “{intent.quote}”
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Borderless Editorial Catalog Mapping */}
          <motion.div
            initial={false}
            whileInView={prefersReducedMotion ? undefined : { y: [12, 0] }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="lg:col-span-7 flex flex-col items-center"
          >
            <div className="w-full max-w-[420px] sm:max-w-[460px]">
              {/* Top Meta Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium">
                  Mapeo de catálogo
                </span>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111] font-semibold">
                  <span>Pomeva AI</span>
                  <PomeloIcon className="w-4 h-4 shrink-0" />
                </div>
              </div>

              {/* 4x4 Borderless Matte Catalog Matrix */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                {CATALOG_SLOTS.map((slotIndex) => {
                  const isActive = activeIntent.activeNodes.includes(slotIndex);
                  const skuCode = String(slotIndex + 1).padStart(2, '0');

                  return (
                    <motion.div
                      key={`${activeIntentIndex}-${slotIndex}`}
                      initial={false}
                      animate={{
                        backgroundColor: isActive ? '#111111' : '#F3F3F1',
                        scale: !prefersReducedMotion && isActive ? [1, 1.04, 1] : 1,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: isActive ? (slotIndex % 4) * 0.08 : 0,
                        ease: EASE_OUT,
                      }}
                      className="aspect-square flex flex-col justify-between p-2 sm:p-2.5 select-none"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] tracking-[0.1em] tabular-nums font-medium ${
                            isActive ? 'text-[#D4D4D0]' : 'text-[#737370]'
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
                              delay: 0.2 + (slotIndex % 4) * 0.06,
                              ease: EASE_OUT,
                            }}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#F97316] flex items-center justify-center text-[#FFFFFF] shrink-0"
                          >
                            <Check size={11} strokeWidth={2.5} />
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Locked-height Bottom Signal Readout (zero vertical shift across intents) */}
              <div className="mt-6 h-[56px] sm:h-[36px] flex items-center justify-between gap-4">
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
                                <span className="text-[11px] uppercase tracking-[0.14em] text-[#737370]">
                                  {parsed.label}
                                </span>
                              )}
                              <span className="font-editorial-sans text-[14px] sm:text-[15px] font-semibold text-[#111111] tracking-[-0.01em]">
                                {parsed.value}
                              </span>
                            </span>
                            {idx < activeIntent.tags.length - 1 && (
                              <span className="text-[#C4C4C0]" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="inline-flex items-baseline gap-2.5 shrink-0">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#737370]">
                    Coincidencias
                  </span>
                  <span className="font-editorial-sans text-[22px] sm:text-[24px] leading-none font-semibold tracking-[-0.03em] text-[#C2410C] tabular-nums">
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
