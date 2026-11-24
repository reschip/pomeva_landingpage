import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  z: number;
  rotate: number;
  x: string;
  y: string;
}

interface Scenario {
  id: string;
  name: string;
  theme: string;
  color: string;
  avatar: string;
  request: string;
  aiResponse: string;
  products: Product[];
  basePrice: number;
  kitPrice: number;
  multiplier: string;
}

interface EditorialHeroProps {
  scenarios: Record<string, Scenario>;
  activeProfileId: string;
  setActiveProfileId: (id: string) => void;
  chatStep: number;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  scenarios,
  activeProfileId,
  chatStep,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const [showShowcase, setShowShowcase] = useState(false);
  const [cartStep, setCartStep] = useState(0); // 0: none, 1: AI asks, 2: user confirms, 3: Agregado!

  const activeData = scenarios[activeProfileId];
  const products = activeData.products;

  useEffect(() => {
    setShowShowcase(false);
    setCartStep(0);
    setHoveredProductId(null);
  }, [activeProfileId]);

  useEffect(() => {
    if (chatStep < 4) return;
    const tShow = setTimeout(() => setShowShowcase(true), 1200);
    const tAsk = setTimeout(() => setCartStep(1), 2050);
    const tReply = setTimeout(() => setCartStep(2), 3200);
    const tAdded = setTimeout(() => setCartStep(3), 4250);
    return () => {
      clearTimeout(tShow);
      clearTimeout(tAsk);
      clearTimeout(tReply);
      clearTimeout(tAdded);
    };
  }, [chatStep, activeProfileId]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yCluster = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const parallaxY = prefersReducedMotion ? 0 : yCluster;

  // Raw, borderless, shadowless editorial cuts clustered with subtle organic angles
  const photoSpecs = [
    {
      rotate: -4,
      offsetY: 'translate-y-2 sm:translate-y-3',
      aspect: 'aspect-[3/4]',
      width: 'w-[116px] sm:w-[185px] lg:w-[215px]',
      zIndex: 10,
    },
    {
      rotate: 1.5,
      offsetY: '-translate-y-2 sm:-translate-y-3',
      aspect: 'aspect-[4/4.6]',
      width: 'w-[128px] sm:w-[205px] lg:w-[235px]',
      zIndex: 20,
    },
    {
      rotate: 4.5,
      offsetY: 'translate-y-3 sm:translate-y-4',
      aspect: 'aspect-[3/3.9]',
      width: 'w-[112px] sm:w-[178px] lg:w-[205px]',
      zIndex: 10,
    },
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Experiencia conversacional de recomendación"
      className="relative min-h-[100dvh] flex flex-col justify-start bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] pt-24 sm:pt-24 lg:pt-[96px] pb-8 sm:pb-10 px-6 lg:px-12 border-b border-[#E8E8E6] overflow-hidden"
    >
      <div className="w-full max-w-[1160px] mx-auto">
        {/* 1. CENTERED HERO HEADLINE & SUBHEADLINE */}
        <div className="text-center mx-auto pb-12 sm:pb-16 lg:pb-20">
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="font-editorial-sans text-[clamp(0.95rem,4.2vw,3.35rem)] whitespace-nowrap leading-[1.06] tracking-[-0.035em] font-medium text-[#111111]"
          >
            Buscador{' '}
            <span className="font-editorial-display italic font-normal text-[#DC2626] tracking-[-0.01em]">
              inteligente
            </span>{' '}
            para ecommerce
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT }}
            className="mt-3.5 sm:mt-4 text-[17px] sm:text-[19.5px] lg:text-[21px] leading-[1.45] text-[#52524E] max-w-3xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            Tu propio vendedor{' '}
            <span className="inline-block font-editorial-accent not-italic font-extrabold text-[1.24em] leading-none tracking-[-0.02em] text-[#059669] -rotate-[4deg] origin-center mx-1">
              24/7
            </span>
            , conectado a tu catálogo para recomendar el producto ideal.
          </motion.p>
        </div>

        {/* 2. LOCKED-HEIGHT STAGE (ZERO JUMP BETWEEN SCENARIOS & ACTS) */}
        <div className="max-w-[960px] mx-auto h-[465px] sm:h-[525px] lg:h-[545px] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {!showShowcase ? (
              /* ACT 1: EDITORIAL TRANSCRIPT WITHOUT BUBBLES (INTERVIEW / LOOKBOOK STYLE) */
              <motion.div
                key={`initial-chat-${activeData.id}`}
                initial={{ opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, transition: { duration: 0.25 } }
                    : { opacity: 0, y: -10, transition: { duration: 0.4, ease: EASE_OUT } }
                }
                className="w-full max-w-[740px] mx-auto h-full flex flex-col justify-center gap-8"
              >
                {/* Customer Voice (Left-aligned directly on canvas) */}
                <div className="min-h-[126px] sm:min-h-[112px] flex items-start">
                  <AnimatePresence mode="wait">
                    {chatStep >= 1 && (
                      <motion.div
                        key={`user-${activeData.id}`}
                        initial={
                          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="w-full space-y-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={activeData.avatar}
                            alt={activeData.name}
                            className="w-6 h-6 rounded-full object-cover grayscale-[20%]"
                          />
                          <span className="text-[11px] uppercase tracking-[0.16em] text-[#737370] font-medium">
                            {activeData.name}
                          </span>
                        </div>
                        <p
                          className="font-editorial-display text-[21px] sm:text-[26px] leading-[1.32] tracking-[-0.02em] text-[#111111]"
                          style={{ textWrap: 'pretty' }}
                        >
                          “{activeData.request}”
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AI Thinking & Curated Response (Indented Editorial Answer) */}
                <div className="min-h-[160px] sm:min-h-[140px] flex items-start pl-6 sm:pl-14">
                  <AnimatePresence mode="wait">
                    {chatStep === 2 && (
                      <motion.div
                        key={`typing-${activeData.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="w-full max-w-[320px] space-y-2.5 pt-2"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#737370]">
                          <span
                            className="w-1.5 h-1.5 shrink-0"
                            style={{ backgroundColor: activeData.color }}
                          />
                          <span>Pomeva AI</span>
                        </div>
                        <div className="relative h-[1px] w-full bg-[#E5E5E3] overflow-hidden">
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.05,
                              ease: 'easeInOut',
                            }}
                            className="absolute inset-y-0 w-1/3 bg-[#111111]"
                          />
                        </div>
                      </motion.div>
                    )}

                    {chatStep >= 3 && (
                      <motion.div
                        key={`ai-${activeData.id}`}
                        initial={
                          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="w-full space-y-2.5"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111] font-semibold">
                          <span
                            className="w-1.5 h-1.5 shrink-0"
                            style={{ backgroundColor: activeData.color }}
                          />
                          <span>Pomeva AI</span>
                        </div>
                        <p
                          className="text-[16.5px] sm:text-[18.5px] leading-[1.6] text-[#3A3A38] font-normal"
                          style={{ textWrap: 'pretty' }}
                        >
                          {activeData.aiResponse}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* ACT 2: RAW BORDERLESS EDITORIAL PHOTOGRAPHS + OUTER CORNER CALLOUTS + CART DIALOGUE */
              <motion.div
                key={`showcase-${activeData.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative w-full max-w-[980px] mx-auto pt-10 md:pt-14 pb-2 flex items-center justify-center">
                  {/* Top-Center Callout for Photo 2 (Desktop md+) */}
                  {products[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT }}
                      className="hidden md:flex flex-col items-center gap-1.5 absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[12px] font-medium text-[#595957] tracking-[-0.01em]">
                          {products[1].name}
                        </span>
                        <span className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#111111] tracking-[-0.03em] tabular-nums">
                          ${products[1].price}
                        </span>
                      </div>
                      <span className="w-[1px] h-3.5 bg-[#111111] shrink-0" />
                    </motion.div>
                  )}

                  {/* Left Outer Callout for Photo 1 (Desktop md+) */}
                  {products[0] && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3.5 absolute left-0 lg:left-2 top-16 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="text-right">
                        <div className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#111111] tracking-[-0.03em] tabular-nums">
                          ${products[0].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#595957] tracking-[-0.01em] mt-1">
                          {products[0].name}
                        </div>
                      </div>
                      <span className="w-4 h-[1px] bg-[#111111] shrink-0" />
                    </motion.div>
                  )}

                  {/* Right Outer Callout for Photo 3 (Desktop md+) */}
                  {products[2] && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3.5 absolute right-0 lg:right-2 bottom-10 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <span className="w-4 h-[1px] bg-[#111111] shrink-0" />
                      <div className="text-left">
                        <div className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#111111] tracking-[-0.03em] tabular-nums">
                          ${products[2].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#595957] tracking-[-0.01em] mt-1">
                          {products[2].name}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Raw, borderless, shadowless clustered photos */}
                  <motion.div
                    style={{ y: parallaxY }}
                    className="flex items-center justify-center -space-x-4 sm:-space-x-7 py-2"
                  >
                    {products.map((product, idx) => {
                      const spec = photoSpecs[idx] ?? photoSpecs[0];
                      const isHovered = hoveredProductId === product.id;
                      const isDimmed =
                        hoveredProductId !== null && hoveredProductId !== product.id;

                      return (
                        <motion.div
                          key={product.id}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0, rotate: spec.rotate }
                              : {
                                  opacity: 0,
                                  y: 16,
                                  rotate: spec.rotate * 0.5,
                                  scale: 0.96,
                                }
                          }
                          animate={{
                            opacity: isDimmed ? 0.5 : 1,
                            y: 0,
                            rotate: isHovered ? 0 : spec.rotate,
                            scale: isHovered ? 1.04 : 1,
                          }}
                          transition={{
                            duration: 0.75,
                            delay: idx * 0.1,
                            ease: EASE_OUT,
                          }}
                          style={{ zIndex: isHovered ? 40 : spec.zIndex }}
                          onMouseEnter={() => setHoveredProductId(product.id)}
                          onMouseLeave={() => setHoveredProductId(null)}
                          className={`relative cursor-pointer ring-2 ring-[#FFFFFF] ${spec.width} ${spec.offsetY}`}
                        >
                          <motion.div
                            initial={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { clipPath: 'inset(100% 0% 0% 0%)' }
                            }
                            animate={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { clipPath: 'inset(0% 0% 0% 0%)' }
                            }
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.1,
                              ease: EASE_OUT,
                            }}
                            className={`w-full ${spec.aspect} overflow-hidden bg-[#F3F3F1]`}
                          >
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Compact Inline Index on Mobile (< md) */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT }}
                  className="md:hidden mt-4 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[12px] text-[#595957] text-center"
                >
                  {products.map((product, i) => (
                    <span key={`compact-${product.id}`} className="inline-flex items-baseline gap-1.5">
                      <span className="font-medium">{product.name}</span>
                      <span className="font-editorial-display text-[16px] font-semibold text-[#111111] tabular-nums">
                        ${product.price}
                      </span>
                      {i < products.length - 1 && (
                        <span className="text-[#C4C4C0] ml-1.5" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </motion.div>

                {/* Follow-up Editorial Dialogue Below Images + "Agregado!" */}
                <div className="w-full max-w-[560px] mx-auto mt-6 md:mt-8 h-[168px] flex flex-col justify-start gap-3.5">
                  {/* AI asks: ¿Quieres que las agregue al carrito? */}
                  <div className="h-[44px] flex items-center justify-end">
                    <AnimatePresence>
                      {cartStep >= 1 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="flex items-baseline gap-2.5 text-right"
                        >
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#737370]">
                            Pomeva
                          </span>
                          <span className="text-[15.5px] sm:text-[17px] text-[#3A3A38]">
                            ¿Quieres que las agregue al carrito?
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Customer replies: Sí, agrégalas. */}
                  <div className="h-[44px] flex items-center justify-start">
                    <AnimatePresence>
                      {cartStep >= 2 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="flex items-center gap-2.5"
                        >
                          <img
                            src={activeData.avatar}
                            alt={activeData.name}
                            className="w-6 h-6 rounded-full object-cover shrink-0 grayscale-[20%]"
                          />
                          <span className="font-editorial-display text-[18px] sm:text-[20px] text-[#111111] tracking-[-0.02em]">
                            “Sí, agrégalas.”
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirmation below: Agregado! + High-Impact Value Transformation */}
                  <div className="h-[44px] flex items-center justify-center">
                    <AnimatePresence>
                      {cartStep >= 3 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="inline-flex items-center gap-3 sm:gap-4"
                        >
                          <div className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#111111]">
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[#FFFFFF]"
                              style={{ backgroundColor: activeData.color }}
                            >
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                            <span>Agregado!</span>
                          </div>

                          <span className="w-[1px] h-5 bg-[#E2E2DE]" aria-hidden="true" />

                          <div className="inline-flex items-baseline gap-2.5">
                            <span className="text-[14px] line-through text-[#8C8C88] tabular-nums">
                              ${activeData.basePrice}
                            </span>
                            <span className="text-[#8C8C88] text-xs" aria-hidden="true">
                              →
                            </span>
                            <span className="font-editorial-display text-[28px] sm:text-[32px] leading-none font-semibold tracking-[-0.03em] text-[#111111] tabular-nums">
                              ${activeData.kitPrice}
                            </span>
                            <span
                              className="text-[11px] uppercase tracking-[0.1em] font-semibold px-2 py-0.5 text-[#FFFFFF] rounded-[3px]"
                              style={{ backgroundColor: activeData.color }}
                            >
                              {activeData.multiplier}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
