import React from 'react';

// --- POMELO ICON (MODERN CITRUS — FLAT MINIMAL GEOMETRIC SVG, ZERO STROKES) ---
export const PomeloIcon: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Minimal flat leaf accent */}
    <path
      d="M36 14C37 6 47 3 53 8C55 14 48 21 38 19C36.8 18.8 35.8 16.5 36 14Z"
      fill="#252A29"
    />
    {/* Outer citrus rind (Orange) */}
    <circle cx="30" cy="36" r="24" fill="#FFB45E" />
    {/* Soft inner pith ring (Offwhite) */}
    <circle cx="30" cy="36" r="19.5" fill="#F9F4E9" />
    {/* Four clean rounded citrus segments (Coral & Lemon) */}
    <path
      d="M31.8 18.5C40.1 19.3 46.7 25.9 47.5 34.2H31.8V18.5Z"
      fill="#FF786B"
    />
    <path
      d="M28.2 18.5V34.2H12.5C13.3 25.9 19.9 19.3 28.2 18.5Z"
      fill="#F5D86E"
    />
    <path
      d="M12.5 37.8H28.2V53.5C19.9 52.7 13.3 46.1 12.5 37.8Z"
      fill="#FF786B"
    />
    <path
      d="M31.8 37.8H47.5C46.7 46.1 40.1 52.7 31.8 53.5V37.8Z"
      fill="#FFB45E"
    />
    {/* Center core */}
    <circle cx="30" cy="36" r="4" fill="#F9F4E9" />
  </svg>
);
