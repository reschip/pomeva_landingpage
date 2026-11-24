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
import { HeroCitrusBackdrop, ScrollCitrusCue } from './CitrusIllustrations';
import { useLanguage } from '../i18n/LanguageContext';
import type { Scenario } from '../i18n/content';

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
  const { t } = useLanguage();
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const [showShowcase, setShowShowcase] = useState(false);
  const [cartStep, setCartStep] = useState(0);
  const [activeTurn, setActiveTurn] = useState<1 | 2>(1);
  const [followUpStep, setFollowUpStep] = useState(0);

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

  const yCluster = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const parallaxY = prefersReducedMotion ? 0 : yCluster;

  const threePhotoSpecs = [
    {
      rotate: -3.5,
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
      rotate: 4,
      offsetY: 'translate-y-3 sm:translate-y-4',
      aspect: 'aspect-[3/3.9]',
      width: 'w-[112px] sm:w-[178px] lg:w-[205px]',
      zIndex: 10,
    },
  ];

  const twoPhotoSpecs = [
    {
      rotate: -3,
      offsetY: 'translate-y-1 sm:translate-y-2',
      aspect: 'aspect-[3/4]',
      width: 'w-[140px] sm:w-[200px] lg:w-[230px]',
      zIndex: 10,
    },
    {
      rotate: 3,
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
      aria-label={t.hero.sectionAria}
      className="relative min-h-[100dvh] flex flex-col justify-start bg-[#F9F4E9] text-[#252A29] font-citrus-sans pt-24 sm:pt-28 lg:pt-[108px] pb-8 sm:pb-10 px-6 lg:px-12 overflow-hidden"
    >
      <HeroCitrusBackdrop />

      <div className="relative z-10 w-full max-w-[1160px] mx-auto flex-1 flex flex-col">
        {/* 1. CENTERED HERO HEADLINE & SUBHEADLINE */}
        <div className="text-center mx-auto pb-4 sm:pb-6">
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="font-citrus-display text-[clamp(1.75rem,4.5vw,3.65rem)] leading-[1.06] tracking-[-0.03em] font-semibold text-[#252A29]"
            style={{ textWrap: 'balance' }}
          >
            {t.hero.titleBefore && <>{t.hero.titleBefore}{' '}</>}
            <span className="text-[#FF786B]">{t.hero.titleHighlight}</span>
            {t.hero.titleAfter && <>{' '}{t.hero.titleAfter}</>}
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT }}
            className="mt-4 sm:mt-5 text-[17px] sm:text-[19.5px] lg:text-[21px] leading-[1.5] text-[#555D5B] max-w-2xl mx-auto font-normal"
            style={{ textWrap: 'balance' }}
          >
            {t.hero.subtitleBefore}{' '}
            <span className="whitespace-nowrap">
              <span className="inline-block font-citrus-display font-bold text-[0.95em] leading-none tracking-[-0.01em] text-[#252A29] bg-[#F5D86E] px-2.5 py-1 rounded-full mx-0.5 align-baseline">
                {t.hero.badge}
              </span>
              {t.hero.subtitleAfter.startsWith(',') ? ',' : ''}
            </span>
            {t.hero.subtitleAfter.startsWith(',')
              ? t.hero.subtitleAfter.slice(1)
              : t.hero.subtitleAfter}
          </motion.p>
        </div>

        {/* 2. LOCKED-HEIGHT STAGE */}
        <div className="w-full max-w-[960px] mx-auto my-auto h-[465px] sm:h-[515px] lg:h-[530px] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {!showShowcase ? (
              /* ACT 1: MULTI-TURN CONVERSATIONAL TRANSCRIPT */
              <motion.div
                key={`initial-chat-${activeData.id}`}
                initial={{ opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, transition: { duration: 0.25 } }
                    : { opacity: 0, y: -10, transition: { duration: 0.4, ease: EASE_OUT } }
                }
                className="w-full max-w-[740px] mx-auto h-full flex flex-col justify-start pt-10 md:pt-14 gap-8"
              >
                {/* Customer Voice */}
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
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold">
                            {activeData.name}
                          </span>
                        </div>
                        <p
                          className="font-citrus-display text-[20px] sm:text-[23px] leading-[1.38] tracking-[-0.02em] font-medium text-[#252A29]"
                          style={{ textWrap: 'pretty' }}
                        >
                          “{activePrompt}”
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AI Thinking & Curated Response */}
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
                        <div className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.14em] text-[#555D5B] font-semibold">
                          <span>Pomera</span>
                          <PomeloIcon className="w-5 h-5 shrink-0" />
                        </div>
                        <div className="h-[26px] flex items-center justify-end gap-2">
                          {[
                            { color: '#FF786B', delay: 0 },
                            { color: '#FFB45E', delay: 0.22 },
                            { color: '#F5D86E', delay: 0.44 },
                          ].map((dot, idx) => (
                            <motion.span
                              key={idx}
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }
                              }
                              transition={{
                                repeat: Infinity,
                                duration: 1.35,
                                delay: dot.delay,
                                ease: 'easeInOut',
                              }}
                              style={{ backgroundColor: dot.color }}
                              className="w-2.5 h-2.5 rounded-full"
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
                        <div className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.14em] text-[#252A29] font-semibold">
                          <span>Pomera</span>
                          <PomeloIcon className="w-5 h-5 shrink-0" />
                        </div>
                        <p
                          className="font-citrus-sans text-[18px] sm:text-[20px] leading-[1.5] text-[#555D5B] font-normal"
                          style={{ textWrap: 'pretty' }}
                        >
                          {activeResponse}
                        </p>

                        {/* Inline Product Context */}
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
                              <div className="text-[14px] font-semibold text-[#252A29]">
                                {activeData.inlineProduct.name}
                              </div>
                              <div className="flex items-center justify-end gap-2 mt-0.5">
                                {activeData.inlineProduct.note && (
                                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#555D5B]">
                                    {activeData.inlineProduct.note}
                                  </span>
                                )}
                                <span className="font-citrus-display text-[17px] font-bold text-[#C94437] tabular-nums">
                                  ${activeData.inlineProduct.price}
                                </span>
                              </div>
                            </div>
                            <div className="w-12 h-14 rounded-2xl overflow-hidden bg-[#F2EAD8] shrink-0">
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
              /* ACT 2: CLUSTERED ROUNDED PRODUCT PHOTOGRAPHS + FLAT CITRUS CALLOUTS + CART DIALOGUE */
              <motion.div
                key={`showcase-${activeData.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex flex-col items-center justify-start"
              >
                <div className="relative w-full max-w-[980px] mx-auto pt-10 md:pt-14 pb-2 flex items-center justify-center">
                  {/* Top-Center Callout (no line, flat citrus dot) */}
                  {products.length === 3 && products[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
                      className="hidden md:flex flex-col items-center gap-1.5 absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[12px] font-medium text-[#555D5B]">
                          {products[1].name}
                        </span>
                        <span className="font-citrus-display text-[24px] lg:text-[26px] leading-none font-bold text-[#C94437] tracking-[-0.02em] tabular-nums">
                          ${products[1].price}
                        </span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F5D86E] shrink-0" />
                    </motion.div>
                  )}

                  {/* Left Outer Callout */}
                  {products[0] && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3 absolute left-0 lg:left-4 top-16 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="text-right">
                        <div className="font-citrus-display text-[24px] lg:text-[26px] leading-none font-bold text-[#C94437] tracking-[-0.02em] tabular-nums">
                          ${products[0].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#555D5B] mt-1">
                          {products[0].name}
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF786B] shrink-0" />
                    </motion.div>
                  )}

                  {/* Right Outer Callout */}
                  {products[products.length - 1] && products.length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.65, ease: EASE_OUT }}
                      className="hidden md:flex items-center gap-3 absolute right-0 lg:right-4 bottom-10 whitespace-nowrap z-30 pointer-events-none"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFB45E] shrink-0" />
                      <div className="text-left">
                        <div className="font-citrus-display text-[24px] lg:text-[26px] leading-none font-bold text-[#C94437] tracking-[-0.02em] tabular-nums">
                          ${products[products.length - 1].price}
                        </div>
                        <div className="text-[12px] font-medium text-[#555D5B] mt-1">
                          {products[products.length - 1].name}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Rounded Borderless Shadowless Clustered Photos */}
                  <motion.div
                    style={{ y: parallaxY }}
                    className="flex items-center justify-center -space-x-3 sm:-space-x-6 py-2"
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
                                  x: -20,
                                  rotate: spec.rotate * 0.5,
                                  scale: 0.96,
                                }
                          }
                          animate={{
                            opacity: isDimmed ? 0.55 : 1,
                            x: 0,
                            rotate: isHovered ? 0 : spec.rotate,
                            scale: isHovered ? 1.04 : 1,
                          }}
                          transition={{
                            duration: 0.75,
                            delay: idx * 0.2,
                            ease: EASE_OUT,
                          }}
                          style={{ zIndex: isHovered ? 40 : spec.zIndex }}
                          onMouseEnter={() => setHoveredProductId(product.id)}
                          onMouseLeave={() => setHoveredProductId(null)}
                          className={`relative cursor-pointer ${spec.width} ${spec.offsetY}`}
                        >
                          <motion.div
                            initial={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { clipPath: 'inset(0% 100% 0% 0% round 24px)' }
                            }
                            animate={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { clipPath: 'inset(0% 0% 0% 0% round 24px)' }
                            }
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.2,
                              ease: EASE_OUT,
                            }}
                            className={`w-full ${spec.aspect} rounded-3xl overflow-hidden bg-[#F2EAD8]`}
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

                {/* Compact Inline Index on Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT }}
                  className="md:hidden mt-4 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[12px] text-[#555D5B] text-center"
                >
                  {products.map((product, i) => (
                    <span
                      key={`compact-${product.id}`}
                      className="inline-flex items-baseline gap-1.5"
                    >
                      <span className="font-medium">{product.name}</span>
                      <span className="font-citrus-display text-[15px] font-bold text-[#C94437] tabular-nums">
                        ${product.price}
                      </span>
                      {i < products.length - 1 && (
                        <span className="text-[#FFB45E] ml-1.5" aria-hidden="true">
                          ●
                        </span>
                      )}
                    </span>
                  ))}
                </motion.div>

                {/* Follow-up Dialogue & Cart Conversion (separated by whitespace, no border-t) */}
                <div className="w-full max-w-[560px] mx-auto mt-6 md:mt-8 h-[168px] flex flex-col justify-start gap-3.5">
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
                          <span className="font-citrus-sans text-[16px] sm:text-[18px] text-[#555D5B]">
                            {activeData.cartPrompt ?? t.hero.cartPromptFallback(products.length)}
                          </span>
                          <PomeloIcon className="w-5 h-5 shrink-0" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

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
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <span className="font-citrus-display text-[17px] sm:text-[19px] font-medium text-[#252A29] tracking-[-0.015em]">
                            “{activeData.cartReply ?? t.hero.cartReplyFallback}”
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="min-h-[54px] flex items-end">
                    <AnimatePresence>
                      {cartStep >= 3 && (
                        <motion.div
                          initial={
                            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="w-full pt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2"
                        >
                          <div className="inline-flex items-center gap-2.5 text-[14px] sm:text-[15px] font-semibold text-[#252A29]">
                            <span className="w-6 h-6 rounded-full bg-[#FF786B] flex items-center justify-center text-[#F9F4E9] shrink-0">
                              <Check size={13} strokeWidth={2.6} />
                            </span>
                            <span>
                              {activeData.cartSummary ?? t.hero.cartSummaryFallback(products.length)}
                            </span>
                          </div>

                          <div className="inline-flex items-baseline gap-2.5 ml-auto">
                            <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#252A29] bg-[#F5D86E] px-2.5 py-1 rounded-full">
                              {activeData.multiplier}
                            </span>
                            <span className="font-citrus-display text-[28px] sm:text-[32px] leading-none font-bold tracking-[-0.02em] text-[#C94437] tabular-nums">
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

      {/* SCENARIO PILL DOTS + FLAT CITRUS SCROLL CUE */}
      <div className="relative z-10 mt-auto pt-4 flex flex-col items-center gap-4">
        <nav
          aria-label={t.hero.scenarioNavAria}
          className="flex items-center justify-center gap-2"
        >
          {scenarioList.map((profile) => {
            const isActive = profile.id === activeProfileId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setActiveProfileId(profile.id)}
                aria-label={t.hero.viewScenario(profile.name)}
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

        <ScrollCitrusCue />
      </div>
    </section>
  );
};
