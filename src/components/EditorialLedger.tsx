import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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
            Las conversaciones{' '}
            <span className="text-[#DC2626]">estructuran</span> tu negocio.
          </h2>
          <p
            className="mt-4 text-[17px] sm:text-[19px] leading-[1.48] text-[#52524E] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            El asistente no solo vende; extrae inteligencia de negocio de cada chat en tiempo real. Descubre lo que tus clientes realmente buscan.
          </p>
        </motion.div>

        {/* Two-column Editorial Ledger */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          {/* Left Column: Customer Chat Stream (no Live Stream or category badges) */}
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
                          className={`mt-2 w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                            msg.active ? 'bg-[#F97316]' : 'bg-[#D4D4D0]'
                          }`}
                        />
                        <p
                          className={`text-[16px] sm:text-[17px] leading-[1.5] transition-colors duration-300 ${
                            msg.active
                              ? 'text-[#111111] font-medium'
                              : 'text-[#737370] font-normal'
                          }`}
                        >
                          {parts && parts.length > 1 ? (
                            <>
                              {parts[0]}
                              <span className="text-[#DC2626] font-semibold">
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

            {/* Orange Dots Selector */}
            <nav
              aria-label="Seleccionar ejemplo de conversación"
              className="mt-6 flex items-center gap-2"
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
                    className="p-1.5 flex items-center justify-center focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-2.5 h-2.5 bg-[#F97316]'
                          : 'w-2 h-2 bg-[#FDBA74] hover:bg-[#FB923C]'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Extracted Intelligence Plate */}
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
                {/* Raw Borderless Editorial Banner */}
                <div className="mb-6 w-full h-48 sm:h-60 bg-[#F3F3F1] overflow-hidden">
                  <img
                    src={activeLedger.img}
                    alt={activeLedger.extracted}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium mb-2">
                  Concepto Extraído
                </div>

                <h3 className="text-[26px] sm:text-[32px] leading-[1.18] tracking-[-0.025em] font-medium text-[#111111] mb-7">
                  {activeLedger.extracted}
                </h3>

                {/* Metric & Action Row */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#737370] font-medium mb-1.5">
                      {activeLedger.metricTitle}
                    </div>
                    <div className="text-[32px] sm:text-[38px] leading-none font-semibold tracking-[-0.03em] text-[#C2410C] tabular-nums">
                      {activeLedger.metricValue}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-[11px] uppercase tracking-[0.16em] text-[#111111] hover:text-[#DC2626] transition-colors font-semibold inline-flex items-center gap-1.5 group focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C]"
                  >
                    <span>{activeLedger.action}</span>
                    <ChevronRight
                      size={13}
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
