import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Check } from 'lucide-react';
import { PomeloIcon } from './PomeloIcon';

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

interface InlineProduct {
  name: string;
  price: number;
  img: string;
  note?: string;
}

interface FollowUpTurn {
  request: string;
  aiResponse: string;
}

interface Scenario {
  id: string;
  name: string;
  theme: string;
  color: string;
  avatar: string;
  request: string;
  aiResponse: string;
  inlineProduct?: InlineProduct;
  followUp?: FollowUpTurn;
  products: Product[];
  basePrice: number;
  kitPrice: number;
  multiplier: string;
  cartPrompt?: string;
  cartReply?: string;
  cartSummary?: string;
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
  setActiveProfileId,
  chatStep,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const [showShowcase, setShowShowcase] = useState(false);
  const [cartStep, setCartStep] = useState(0); // 0: none, 1: AI asks, 2: user confirms, 3: confirmed
  const [activeTurn, setActiveTurn] = useState<1 | 2>(1);
  const [followUpStep, setFollowUpStep] = useState(0); // 0: none, 1: customer, 2: thinking, 3: AI

  const scenarioList = Object.values(scenarios);
  const activeData = scenarios[activeProfileId];
  const products = activeData.products;
  const hasFollowUp = Boolean(activeData.followUp);

  useEffect(() => {
    setShowShowcase(false);
    setCartStep(0);
    setActiveTurn(1);
    setFollowUpStep(0);
    setHoveredProductId(null);
  }, [activeProfileId]);

  useEffect(() => {
    if (chatStep < 4) return;

    if (!hasFollowUp) {
      const tShow = setTimeout(() => setShowShowcase(true), 3700);
      const tAsk = setTimeout(() => setCartStep(1), 4900);
      const tReply = setTimeout(() => setCartStep(2), 6400);
      const tAdded = setTimeout(() => setCartStep(3), 7800);
      return () => {
        clearTimeout(tShow);
        clearTimeout(tAsk);
        clearTimeout(tReply);
        clearTimeout(tAdded);
      };
    }

    // Two-turn scenario choreography (Mateo & Sofía — unhurried reading pace)
    const tTurn2 = setTimeout(() => {
      setActiveTurn(2);
      setFollowUpStep(1);
    }, 5000);
    const tThink2 = setTimeout(() => setFollowUpStep(2), 6800);
    const tAi2 = setTimeout(() => setFollowUpStep(3), 8400);
    const tShow = setTimeout(() => setShowShowcase(true), 12600);
    const tAsk = setTimeout(() => setCartStep(1), 14000);
    const tReply = setTimeout(() => setCartStep(2), 15500);
    const tAdded = setTimeout(() => setCartStep(3), 17000);

    return () => {
      clearTimeout(tTurn2);
      clearTimeout(tThink2);
      clearTimeout(tAi2);
      clearTimeout(tShow);
      clearTimeout(tAsk);
      clearTimeout(tReply);
      clearTimeout(tAdded);
    };
  }, [chatStep, activeProfileId, hasFollowUp]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yCluster = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const parallaxY = prefersReducedMotion ? 0 : yCluster;

  // Raw, borderless, shadowless editorial cuts clustered with subtle organic angles
  const threePhotoSpecs = [
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

  const twoPhotoSpecs = [
    {
      rotate: -3.5,
      offsetY: 'translate-y-1 sm:translate-y-2',
      aspect: 'aspect-[3/4]',
      width: 'w-[140px] sm:w-[200px] lg:w-[230px]',
      zIndex: 10,
    },
    {
      rotate: 3.5,
      offsetY: '-translate-y-1 sm:-translate-y-2',
      aspect: 'aspect-[3/4]',
      width: 'w-[140px] sm:w-[200px] lg:w-[230px]',
      zIndex: 20,
    },
  ];

  const activePhotoSpecs = products.length === 2 ? twoPhotoSpecs : threePhotoSpecs;
  const activePrompt =
    activeTurn === 2 && activeData.followUp
      ? activeData.followUp.request
      : activeData.request;
  const activeResponse =
    activeTurn === 2 && activeData.followUp
      ? activeData.followUp.aiResponse
      : activeData.aiResponse;

  const showUserTurn = activeTurn === 1 ? chatStep >= 1 : followUpStep >= 1;
  const showThinkingTurn = activeTurn === 1 ? chatStep === 2 : followUpStep === 2;
  const showAiTurn = activeTurn === 1 ? chatStep >= 3 : followUpStep >= 3;
  const showInlineImg = activeTurn === 1 && chatStep >= 3 && Boolean(activeData.inlineProduct);

  return (
    <section
      ref={sectionRef}
      aria-label="Experiencia conversacional de recomendación"
      className="relative min-h-[100dvh] flex flex-col justify-start bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] pt-24 sm:pt-24 lg:pt-[96px] pb-6 sm:pb-8 px-6 lg:px-12 border-b border-[#E8E8E6] overflow-hidden"
    >
      <div className="w-full max-w-[1160px] mx-auto flex-1 flex flex-col">
        {/* 1. CENTERED HERO HEADLINE & SUBHEADLINE (FIXED AT TOP) */}
        <div className="text-center mx-auto pb-4 sm:pb-6">
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

        {/* 2. LOCKED-HEIGHT STAGE (CENTERED VERTICALLY IN REMAINING SPACE, ZERO JUMP) */}
        <div className="w-full max-w-[960px] mx-auto my-auto h-[465px] sm:h-[515px] lg:h-[530px] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {!showShowcase ? (
              /* ACT 1: MULTI-TURN EDITORIAL TRANSCRIPT WITH INLINE PRODUCT CONTEXT */
              <motion.div
                key={`initial-chat-${activeData.id}`}
                initial={{ opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, transition: { duration: 0.25 } }
                    : { opacity: 0, y: -10, transition: { duration: 0.4, ease: EASE_OUT } }
                }
                className="w-full max-w-[740px] mx-auto h-full flex flex-col justify-start pt-10 md:pt-14 gap-7"
              >
                {/* Customer Voice (Left-aligned directly on canvas, Baskervville) */}
                <div className="min-h-[118px] sm:min-h-[106px] flex items-start">
                  <AnimatePresence mode="wait">
                    {showUserTurn && (
                      <motion.div
                        key={`user-${activeData.id}-t${activeTurn}`}
                        initial={
                          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                        className="w-full max-w-[580px] space-y-2.5 text-left"
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
                          className="font-editorial-display text-[18px] sm:text-[21px] leading-[1.46] tracking-[-0.015em] text-[#111111]"
                          style={{ textWrap: 'pretty' }}
                        >
                          “{activePrompt}”
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AI Thinking & Curated Response (Right-aligned polarity, Archivo + PomeloIcon + Inline Photo) */}
                <div className="min-h-[190px] sm:min-h-[175px] flex items-start justify-end">
                  <AnimatePresence mode="wait">
                    {showThinkingTurn && (
                      <motion.div
                        key={`typing-${activeData.id}-t${activeTurn}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="w-full max-w-[360px] ml-auto space-y-3 pt-1 text-right"
                      >
                        <div className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.16em] text-[#737370]">
                          <span>Pomeva AI</span>
                          <PomeloIcon className="w-5 h-5 shrink-0" />
                        </div>
                        <div className="h-[26px] flex items-center justify-end gap-2">
                          {[
                            { color: '#F97316', delay: 0 },
                            { color: '#FB923C', delay: 0.22 },
                            { color: '#F43F5E', delay: 0.44 },
                          ].map((dot, idx) => (
                            <motion.span
                              key={idx}
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: [0.25, 1, 0.25] }
                              }
                              transition={{
                                repeat: Infinity,
                                duration: 1.35,
                                delay: dot.delay,
                                ease: 'easeInOut',
                              }}
                              style={{ backgroundColor: dot.color }}
                              className="w-2 h-2 rounded-full"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {showAiTurn && (
                      <motion.div
                        key={`ai-${activeData.id}-t${activeTurn}`}
                        initial={
                          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                        className="w-full max-w-[580px] ml-auto space-y-3 text-right"
                      >
                        <div className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.16em] text-[#111111] font-semibold">
                          <span>Pomeva AI</span>
                          <PomeloIcon className="w-5 h-5 shrink-0" />
                        </div>
                        <p
                          className="font-editorial-sans text-[18px] sm:text-[21px] leading-[1.46] text-[#3A3A38] font-normal"
                          style={{ textWrap: 'pretty' }}
                        >
                          {activeResponse}
                        </p>

                        {/* Inline Product Photo inside Turn 1 when referenced */}
                        {showInlineImg && activeData.inlineProduct && (
                          <motion.div
                            initial={
                              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
                            className="pt-2 flex items-center justify-end gap-3.5"
                          >
                            <div className="text-right">
                              <div className="text-[13px] font-medium text-[#111111]">
                                {activeData.inlineProduct.name}
                              </div>
                              <div className="flex items-center justify-end gap-2 mt-0.5">
                                {activeData.inlineProduct.note && (
                                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#737370]">
                                    {activeData.inlineProduct.note}
                                  </span>
                                )}
                                <span className="font-editorial-display text-[17px] font-semibold text-[#C2410C] tabular-nums">
                                  ${activeData.inlineProduct.price}
                                </span>
                              </div>
                            </div>
                            <div className="w-12 h-14 overflow-hidden bg-[#F3F3F1] shrink-0">
                              <img
                                src={activeData.inlineProduct.img}
                                alt={activeData.inlineProduct.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* ACT 2: RAW BORDERLESS EDITORIAL PHOTOGRAPHS (2 OR 3) + OUTER CALLOUTS + CART DIALOGUE */
              <motion.div
                key={`showcase-${activeData.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex flex-col items-center justify-start"
              >
                <div className="relative w-full max-w-[980px] mx-auto pt-10 md:pt-14 pb-2 flex items-center justify-center">
                  {/* Top-Center Callout only when 3 photos */}
                  {products.length === 3 && products[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
                      className="hidden md:flex flex-col items-center gap-1.5 absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[12px] font-medium text-[#595957] tracking-[-0.01em]">
                          {products[1].name}
                        </span>
                        <span className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#C2410C] tracking-[-0.03em] tabular-nums">
                          ${products[1].price}
                        </span>
                      </div>
                      <span className="w-[1px] h-3.5 bg-[#111111] shrink-0" />
                    </motion.div>
                  )}

                  {/* Left Outer Callout (first product) */}
                  {products[0] && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3.5 absolute left-0 lg:left-4 top-16 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="text-right">
                        <div className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#C2410C] tracking-[-0.03em] tabular-nums">
                          ${products[0].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#595957] tracking-[-0.01em] mt-1">
                          {products[0].name}
                        </div>
                      </div>
                      <span className="w-4 h-[1px] bg-[#111111] shrink-0" />
                    </motion.div>
                  )}

                  {/* Right Outer Callout (last product: index 2 or index 1 when 2 photos) */}
                  {products[products.length - 1] && products.length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.65, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3.5 absolute right-0 lg:right-4 bottom-10 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <span className="w-4 h-[1px] bg-[#111111] shrink-0" />
                      <div className="text-left">
                        <div className="font-editorial-display text-[24px] lg:text-[28px] leading-none font-semibold text-[#C2410C] tracking-[-0.03em] tabular-nums">
                          ${products[products.length - 1].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#595957] tracking-[-0.01em] mt-1">
                          {products[products.length - 1].name}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Raw, borderless, shadowless clustered photos (left-to-right reveal) */}
                  <motion.div
                    style={{ y: parallaxY }}
                    className="flex items-center justify-center -space-x-4 sm:-space-x-7 py-2"
                  >
                    {products.map((product, idx) => {
                      const spec = activePhotoSpecs[idx] ?? activePhotoSpecs[0];
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
                                  x: -24,
                                  rotate: spec.rotate * 0.5,
                                  scale: 0.96,
                                }
                          }
                          animate={{
                            opacity: isDimmed ? 0.5 : 1,
                            x: 0,
                            rotate: isHovered ? 0 : spec.rotate,
                            scale: isHovered ? 1.04 : 1,
                          }}
                          transition={{
                            duration: 0.75,
                            delay: idx * 0.22,
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
                                : { clipPath: 'inset(0% 100% 0% 0%)' }
                            }
                            animate={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { clipPath: 'inset(0% 0% 0% 0%)' }
                            }
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.22,
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
                    <span
                      key={`compact-${product.id}`}
                      className="inline-flex items-baseline gap-1.5"
                    >
                      <span className="font-medium">{product.name}</span>
                      <span className="font-editorial-display text-[16px] font-semibold text-[#C2410C] tabular-nums">
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

                {/* Follow-up Editorial Dialogue Below Images + Explicit Cart Conversion */}
                <div className="w-full max-w-[560px] mx-auto mt-6 md:mt-8 h-[168px] flex flex-col justify-start gap-3.5">
                  {/* AI asks */}
                  <div className="h-[44px] flex items-center justify-end">
                    <AnimatePresence>
                      {cartStep >= 1 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="flex items-center gap-2.5 text-right"
                        >
                          <span className="font-editorial-sans text-[16px] sm:text-[18px] text-[#3A3A38]">
                            {activeData.cartPrompt ??
                              `¿Agrego los ${products.length} productos a tu carrito?`}
                          </span>
                          <PomeloIcon className="w-4 h-4 shrink-0" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Customer replies */}
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
                          <span className="font-editorial-display text-[16px] sm:text-[18px] text-[#111111] tracking-[-0.015em]">
                            “{activeData.cartReply ?? 'Sí, agrégalos.'}”
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirmation below: Editorial Receipt Line (no pill badge, no filled circle) */}
                  <div className="min-h-[54px] flex items-end">
                    <AnimatePresence>
                      {cartStep >= 3 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="w-full pt-3.5 border-t border-[#E8E8E6] flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2"
                        >
                          <div className="inline-flex items-center gap-2.5 text-[14px] sm:text-[15px] font-medium text-[#111111]">
                            <span className="w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center text-[#FFFFFF] shrink-0">
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                            <span>
                              {activeData.cartSummary ??
                                `${products.length} productos agregados al carrito`}
                            </span>
                          </div>

                          <div className="inline-flex items-baseline gap-2.5 ml-auto">
                            <span className="text-[11px] uppercase tracking-[0.12em] text-[#737370]">
                              {activeData.multiplier}
                            </span>
                            <span className="font-editorial-display text-[28px] sm:text-[32px] leading-none font-semibold tracking-[-0.03em] text-[#C2410C] tabular-nums">
                              ${activeData.kitPrice.toLocaleString('en-US')}
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

      {/* 3 ORANGE SCENARIO DOTS + DISCREET SCROLL CONTINUITY CUE */}
      <div className="mt-auto pt-4 flex flex-col items-center gap-3">
        <nav
          aria-label="Cambiar escenario de demostración"
          className="flex items-center justify-center gap-2"
        >
          {scenarioList.map((profile) => {
            const isActive = profile.id === activeProfileId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setActiveProfileId(profile.id)}
                aria-label={`Ver escenario de ${profile.name}`}
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

        <motion.div
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-[1px] h-[18px] bg-[#D4D4D0]"
        />
      </div>
    </section>
  );
};
