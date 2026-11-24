import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { LedgerCitrusArt } from './CitrusIllustrations';

export interface LedgerEntry {
  id: string;
  category: string;
  color: string;
  chat: { text: string; active: boolean }[];
  highlighted: string;
  extracted: string;
  metricTitle: string;
  metricValue: string;
  action: string;
  img: string;
}

interface EditorialLedgerProps {
  entries: LedgerEntry[];
  ledgerIndex: number;
  setLedgerIndex: (idx: number) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EditorialLedger: React.FC<EditorialLedgerProps> = ({
  entries,
  ledgerIndex,
  setLedgerIndex,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const activeLedger = entries[ledgerIndex] ?? entries[0];

  return (
    <section
      aria-label="Inteligencia de negocio extraída en tiempo real"
      className="relative bg-[#F2EAD8] text-[#252A29] font-citrus-sans py-28 sm:py-36 lg:py-44 px-6 lg:px-12 overflow-hidden"
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
            Las conversaciones{' '}
            <span className="text-[#FF786B]">estructuran</span> tu negocio.
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.5] text-[#555D5B] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            El asistente no solo vende; extrae inteligencia de negocio de cada chat en tiempo real. Descubre lo que tus clientes realmente buscan.
          </p>
        </motion.div>

        {/* Two-column Ledger */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          {/* Left Column: Customer Chat Stream */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="min-h-[190px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLedger.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8, transition: { duration: 0.2 } }
                  }
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="space-y-5 w-full"
                >
                  {activeLedger.chat.map((msg, i) => {
                    const parts = msg.active
                      ? msg.text.split(activeLedger.highlighted)
                      : null;

                    return (
                      <div key={i} className="flex items-start gap-3.5">
                        <span
                          aria-hidden="true"
                          className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 transition-colors duration-300 ${
                            msg.active ? 'bg-[#FF786B]' : 'bg-[#FFB45E] opacity-55'
                          }`}
                        />
                        <p
                          className={`text-[17px] sm:text-[18px] leading-[1.5] transition-colors duration-300 ${
                            msg.active
                              ? 'text-[#252A29] font-medium'
                              : 'text-[#555D5B] font-normal'
                          }`}
                        >
                          {parts && parts.length > 1 ? (
                            <>
                              {parts[0]}
                              <span className="text-[#C94437] font-semibold">
                                {activeLedger.highlighted}
                              </span>
                              {parts[1]}
                            </>
                          ) : (
                            msg.text
                          )}
                        </p>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Citrus Pill Dots Selector */}
            <nav
              aria-label="Seleccionar ejemplo de conversación"
              className="mt-7 flex items-center gap-2"
            >
              {entries.map((entry, idx) => {
                const isActive = idx === ledgerIndex;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setLedgerIndex(idx)}
                    aria-label={`Ver ejemplo: ${entry.extracted}`}
                    aria-pressed={isActive}
                    className="p-1.5 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF786B] rounded-full"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-7 h-2.5 bg-[#FF786B]'
                          : 'w-2.5 h-2.5 bg-[#FFB45E] hover:bg-[#FF786B]'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Extracted Intelligence Plate with Flat Citrus SVG Art */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLedger.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, transition: { duration: 0.2 } }
                }
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="w-full"
              >
                {/* Custom Flat-Fill Modern Citrus SVG Composition */}
                <div className="mb-7 w-full aspect-[640/280] rounded-[28px] overflow-hidden">
                  <LedgerCitrusArt variant={activeLedger.id} />
                </div>

                <div className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold mb-2">
                  Concepto Extraído
                </div>

                <h3 className="font-citrus-display text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.025em] font-semibold text-[#252A29] mb-7">
                  {activeLedger.extracted}
                </h3>

                {/* Metric & Rounded Action Pill Row */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold mb-1.5">
                      {activeLedger.metricTitle}
                    </div>
                    <div className="font-citrus-display text-[36px] sm:text-[42px] leading-none font-bold tracking-[-0.03em] text-[#C94437] tabular-nums">
                      {activeLedger.metricValue}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="bg-[#252A29] text-[#F9F4E9] hover:bg-[#FF786B] hover:text-[#252A29] px-5 py-3 rounded-full text-[12px] tracking-[0.04em] transition-colors duration-300 font-semibold inline-flex items-center gap-1.5 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF786B]"
                  >
                    <span>{activeLedger.action}</span>
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
