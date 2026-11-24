import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hero decorative flat-fill citrus compositions anchored at the edges of the viewport.
 * Pure flat fills, organic geometric curves, zero strokes.
 */
export const HeroCitrusBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Top-left large organic Lemon + Coral overlapping citrus composition */}
      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 10, 0], rotate: [0, 1.8, 0] }
        }
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
        className="hidden sm:block absolute sm:top-28 sm:-left-32 lg:top-24 lg:-left-24 sm:w-[300px] lg:w-[380px] h-auto opacity-85"
      >
        {/* Large sunlit Lemon circle */}
        <circle cx="155" cy="155" r="145" fill="#F5D86E" />
        {/* Overlapping warm Orange semi-circle */}
        <path
          d="M155 155A105 105 0 0 1 365 155Z"
          fill="#FFB45E"
        />
        {/* Coral citrus drop */}
        <circle cx="235" cy="235" r="64" fill="#FF786B" />
        {/* Soft Offwhite pith cutout accent */}
        <circle cx="235" cy="235" r="24" fill="#F9F4E9" />
      </motion.svg>

      {/* Bottom-right large half-pomelo flat geometric composition */}
      <motion.svg
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -12, 0], rotate: [0, -2, 0] }
        }
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-28 w-[280px] sm:w-[390px] lg:w-[480px] h-auto opacity-90"
      >
        {/* Outer Orange bowl */}
        <circle cx="285" cy="285" r="168" fill="#FFB45E" />
        {/* Inner Offwhite pith */}
        <circle cx="285" cy="285" r="134" fill="#F9F4E9" />
        {/* Coral citrus wedges */}
        <path d="M294 166C352 171 399 218 404 276H294V166Z" fill="#FF786B" />
        <path d="M276 166V276H166C171 218 218 171 276 166Z" fill="#F5D86E" />
        <path d="M166 294H276V404C218 399 171 352 166 294Z" fill="#FF786B" />
        <path d="M294 294H404C399 352 352 399 294 404V294Z" fill="#FFB45E" />
        <circle cx="285" cy="285" r="26" fill="#F9F4E9" />
        {/* Minimal Graphite botanical leaf */}
        <path
          d="M118 190C118 134 166 96 218 110C224 162 178 206 118 190Z"
          fill="#252A29"
        />
      </motion.svg>
    </div>
  );
};

/**
 * Discovery section subtle flat-fill citrus backdrop on Graphite #252A29.
 */
export const DiscoveryCitrusBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <motion.svg
        viewBox="0 0 380 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={prefersReducedMotion ? undefined : { rotate: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[240px] sm:w-[320px] lg:w-[380px] h-auto opacity-95"
      >
        <circle cx="240" cy="140" r="130" fill="#313736" />
        <path d="M240 46A94 94 0 0 1 334 140H240V46Z" fill="#FF786B" />
        <circle cx="132" cy="212" r="38" fill="#F5D86E" />
        <circle cx="176" cy="242" r="22" fill="#FFB45E" />
      </motion.svg>

      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-28 -left-24 w-[220px] sm:w-[280px] h-auto opacity-90"
      >
        <circle cx="110" cy="210" r="120" fill="#313736" />
        <path d="M110 210A84 84 0 0 1 194 126V210H110Z" fill="#FFB45E" />
        <circle cx="215" cy="235" r="28" fill="#FF786B" />
      </svg>
    </div>
  );
};

/**
 * Comparison section organic flat citrus shape framing the Pomeva AI solution.
 */
export const ComparisonCitrusAccent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      className="pointer-events-none absolute -top-10 -left-10 w-44 sm:w-56 h-auto select-none"
    >
      {/* Warm sunlit Lemon arch */}
      <circle cx="120" cy="120" r="105" fill="#F5D86E" />
      {/* Coral overlapping accent circle */}
      <circle cx="205" cy="75" r="46" fill="#FF786B" />
      {/* Small Orange citrus dot */}
      <circle cx="65" cy="220" r="28" fill="#FFB45E" />
    </motion.svg>
  );
};

/**
 * Dynamic flat-fill SVG artwork for the Live Ledger (Business Intelligence) section.
 * Replaces generic stock photography with expressive Modern Citrus vector illustrations.
 */
export const LedgerCitrusArt: React.FC<{ variant: string }> = ({ variant }) => {
  const prefersReducedMotion = useReducedMotion();

  if (variant === 'b2b') {
    // Oportunidad B2B: Stacked overlapping geometric citrus spheres & rising arc
    return (
      <svg
        viewBox="0 0 640 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <rect width="640" height="280" rx="28" fill="#252A29" />
        {/* Large Lemon sun quarter */}
        <path d="M440 280A200 200 0 0 1 640 80V280H440Z" fill="#F5D86E" />
        {/* Overlapping Coral & Orange stacked B2B bundle shapes */}
        <motion.circle
          cx="155"
          cy="155"
          r="76"
          fill="#FF786B"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="255"
          cy="155"
          r="76"
          fill="#FFB45E"
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay: 0.4, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="355"
          cy="155"
          r="76"
          fill="#F9F4E9"
          animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay: 0.8, ease: 'easeInOut' }}
        />
        {/* Inner citrus seeds / cores */}
        <circle cx="155" cy="155" r="24" fill="#F9F4E9" />
        <circle cx="255" cy="155" r="24" fill="#252A29" />
        <circle cx="355" cy="155" r="24" fill="#FF786B" />
        {/* Rising pill bars symbolizing sudden spike */}
        <rect x="492" y="168" width="24" height="68" rx="12" fill="#252A29" />
        <rect x="530" y="132" width="24" height="104" rx="12" fill="#FF786B" />
        <rect x="568" y="88" width="24" height="148" rx="12" fill="#FFB45E" />
      </svg>
    );
  }

  if (variant === 'cross') {
    // Patrón Cross-sell: Two interlocking citrus halves forming a complete bundle
    return (
      <svg
        viewBox="0 0 640 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <rect width="640" height="280" rx="28" fill="#FFB45E" />
        {/* Large soft Offwhite backdrop circle */}
        <circle cx="520" cy="60" r="140" fill="#F5D86E" />
        {/* Left interlocking half-circle (Graphite) */}
        <motion.path
          d="M280 54A86 86 0 0 0 280 226V54Z"
          fill="#252A29"
          animate={prefersReducedMotion ? undefined : { x: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        />
        {/* Right interlocking half-circle (Coral) */}
        <motion.path
          d="M300 54A86 86 0 0 1 300 226V54Z"
          fill="#FF786B"
          animate={prefersReducedMotion ? undefined : { x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        />
        {/* Connecting Offwhite core */}
        <circle cx="290" cy="140" r="32" fill="#F9F4E9" />
        {/* Complementary floating citrus satellites */}
        <circle cx="115" cy="96" r="34" fill="#F9F4E9" />
        <circle cx="115" cy="184" r="20" fill="#FF786B" />
        <path d="M445 190C445 148 484 118 526 128C530 170 494 204 445 190Z" fill="#252A29" />
      </svg>
    );
  }

  // Default: 'unmet' (Demanda Latente) — Organic rising citrus wave & bloom
  return (
    <svg
      viewBox="0 0 640 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="640" height="280" rx="28" fill="#F9F4E9" />
      {/* Large soft Lemon semicircle anchored bottom-left */}
      <path d="M0 280A210 210 0 0 1 420 280H0Z" fill="#F5D86E" />
      {/* Rising Coral citrus sphere */}
      <motion.circle
        cx="465"
        cy="132"
        r="84"
        fill="#FF786B"
        animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      {/* Overlapping Orange wedge */}
      <path d="M465 132A84 84 0 0 1 549 216H465V132Z" fill="#FFB45E" />
      {/* Rising rounded geometric trend pills */}
      <rect x="88" y="176" width="36" height="62" rx="18" fill="#FFB45E" />
      <rect x="144" y="140" width="36" height="98" rx="18" fill="#FF786B" />
      <rect x="200" y="96" width="36" height="142" rx="18" fill="#252A29" />
      {/* Botanical citrus leaf */}
      <path d="M292 104C292 64 328 38 366 48C370 86 336 116 292 104Z" fill="#252A29" />
    </svg>
  );
};

/**
 * Onboarding section bold Modern Citrus geometric composition on Graphite #252A29.
 */
export const OnboardingCitrusBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Bottom-left large overlapping citrus arcs */}
      <motion.svg
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-24 w-[260px] sm:w-[340px] lg:w-[400px] h-auto"
      >
        <circle cx="145" cy="275" r="145" fill="#313736" />
        <path d="M145 275A105 105 0 0 1 250 170V275H145Z" fill="#FF786B" />
        <circle cx="272" cy="300" r="44" fill="#F5D86E" />
      </motion.svg>

      {/* Top-right vibrant Orange + Lemon flat circle cluster */}
      <motion.svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={prefersReducedMotion ? undefined : { rotate: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[240px] sm:w-[320px] h-auto"
      >
        <circle cx="230" cy="120" r="115" fill="#FFB45E" />
        <circle cx="155" cy="190" r="58" fill="#FF786B" />
        <circle cx="155" cy="190" r="22" fill="#252A29" />
      </motion.svg>
    </div>
  );
};

/**
 * Minimal flat-fill scroll cue (replaces vertical 1px line).
 */
export const ScrollCitrusCue: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      className="w-5 h-6"
    >
      <rect x="6" y="2" width="12" height="18" rx="6" fill="#F2EAD8" />
      <circle cx="12" cy="13" r="3.5" fill="#FF786B" />
    </motion.svg>
  );
};
