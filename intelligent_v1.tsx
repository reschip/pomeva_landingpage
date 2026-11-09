import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowRight, Plus, TrendingUp, Search, Bell, Check, Database, Zap, Layers, Cpu, Clock, ChevronRight, ShoppingBag, Box, Globe, Code, Link } from 'lucide-react';

// --- SCENE 2: HERO DATA ---
const scenarios: Record<string, any> = {
  isabella: {
    id: 'isabella',
    name: 'Isabella',
    theme: 'Cuidado Personal',
    color: '#DC2626', // Vermilion Red
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    request: "Últimamente siento la piel muy tensa y seca, mi crema habitual ya no me está hidratando suficiente.",
    aiResponse: "El cambio de clima exige hidratación en capas. Un sérum de ácido hialurónico antes de tu crema ayudará a retener el agua. Armé esta rutina para ti:",
    products: [
      { id: 'p7', name: 'Sérum Hialurónico', price: 42, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop', z: 30, rotate: -2, x: '-15%', y: '-5%' },
      { id: 'p8', name: 'Crema Barrera', price: 38, img: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=250&h=250&fit=crop', z: 20, rotate: 8, x: '15%', y: '30%' },
      { id: 'p9', name: 'Limpiador Suave', price: 25, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop', z: 40, rotate: -4, x: '35%', y: '5%' }
    ],
    basePrice: 42,
    kitPrice: 105,
    multiplier: '2.5x'
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    theme: 'Café de especialidad',
    color: '#1F2937', // Charcoal
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    request: "Mi café siempre me sabe muy ácido o muy aguado. No sé qué estoy haciendo mal al prepararlo en casa.",
    aiResponse: "Suele ser por la molienda inconsistente o la temperatura del agua. Con un buen molino manual y control de vertido, tu café cambiará drásticamente. Mira esto:",
    products: [
      { id: 'p4', name: 'Molino de Acero', price: 85, img: '/images/molino_acero.jpg', z: 30, rotate: 1, x: '0%', y: '0%' },
      { id: 'p5', name: 'Báscula Digital', price: 35, img: '/images/bascula_digital.jpg', z: 20, rotate: -3, x: '-20%', y: '25%' },
      { id: 'p6', name: 'Café Kenia Lavado', price: 24, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop', z: 40, rotate: 5, x: '30%', y: '20%' }
    ],
    basePrice: 24,
    kitPrice: 144,
    multiplier: '6x'
  },
  sofia: {
    id: 'sofia',
    name: 'Sofía',
    theme: 'Plantas y hogar',
    color: '#059669', // Emerald
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    request: "Mi departamento casi no tiene luz natural, pero me encantaría tener plantas que no se mueran a la semana.",
    aiResponse: "He seleccionado especies de sombra muy resistentes y macetas con el drenaje adecuado para evitar excesos de humedad.",
    products: [
      { id: 'p1', name: 'Zamioculcas (ZZ)', price: 32, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop', z: 30, rotate: -2, x: '-10%', y: '5%' },
      { id: 'p2', name: 'Maceta Terracota', price: 45, img: 'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?w=300&h=300&fit=crop', z: 20, rotate: 4, x: '25%', y: '-10%' },
      { id: 'p3', name: 'Sustrato Drenaje', price: 15, img: '/images/sustrato_drenaje.jpg', z: 40, rotate: -5, x: '35%', y: '40%' }
    ],
    basePrice: 32,
    kitPrice: 92,
    multiplier: '2.8x'
  }
};

// --- SCENE 3: DISCOVERY INTENTS ---
const discoveryIntents = [
  {
    id: 'Bienestar',
    quote: "Necesito algo para relajarme antes de dormir...",
    tags: ['Intención: Relajación', 'Momento: Noche'],
    activeNodes: [5, 9, 10], 
  },
  {
    id: 'Moda',
    quote: "Tengo una boda en la playa y no quiero asarme...",
    tags: ['Evento: Formal', 'Clima: Cálido'],
    activeNodes: [2, 6, 12, 14],
  },
  {
    id: 'Productividad',
    quote: "Me cuesta mucho concentrarme trabajando en casa...",
    tags: ['Objetivo: Enfoque', 'Entorno: Home Office'],
    activeNodes: [0, 3, 7, 15],
  }
];

// --- SCENE 5: LIVE LEDGER DATA ---
const ledgerData = [
  {
    id: 'unmet',
    category: 'Demanda Latente',
    icon: TrendingUp,
    color: '#059669', // Emerald
    chat: [
      { text: "Buscando algo para el frío...", active: false },
      { text: "Tengo la piel muy seca por el clima.", active: true },
      { text: "¿Tienen cremas ultra hidratantes?", active: false }
    ],
    highlighted: "piel muy seca por el clima",
    extracted: "Problemas de hidratación invernal",
    metricTitle: "Incidencia en chats (7 días)",
    metricValue: "42%",
    action: "Sugerir nueva línea de cuidado intensivo",
    img: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=400&fit=crop",
    chartData: [15, 22, 28, 45, 65, 80, 100] // Trending up curve
  },
  {
    id: 'b2b',
    category: 'Oportunidad B2B',
    icon: Bell,
    color: '#D97706', // Amber
    chat: [
      { text: "Hola, busco detalles para mis empleados.", active: false },
      { text: "Necesito 40 kits de regalo para fin de año.", active: true },
      { text: "¿Manejan envíos a múltiples oficinas?", active: false }
    ],
    highlighted: "40 kits de regalo",
    extracted: "Solicitud de compras al por mayor",
    metricTitle: "Valor Potencial Detectado",
    metricValue: "$3,800",
    action: "Redirigir a ejecutivo VIP",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=400&fit=crop",
    chartData: [5, 8, 12, 10, 50, 95] // Sudden spike
  },
  {
    id: 'cross',
    category: 'Patrón Cross-sell',
    icon: Zap,
    color: '#DC2626', // Vermilion
    chat: [
      { text: "Quiero comprar una buena cafetera.", active: false },
      { text: "Y algo para medir el café exactamente.", active: true },
      { text: "Recomiéndame una báscula precisa.", active: false }
    ],
    highlighted: "medir el café exactamente",
    extracted: "Match Frecuente: Cafetera + Báscula",
    metricTitle: "Tasa de Conversión (Bundle)",
    metricValue: "84%",
    action: "Crear 'Kit Barista' en catálogo",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop",
    chartData: [60, 65, 62, 70, 78, 84, 85] // High and steady
  }
];

// --- SCENE 6: DYNAMIC ONBOARDING CATEGORIES ---
const ctaCategories: Record<string, { img: string }> = {
  'Moda': { img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop' },
  'Hogar y Decoración': { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop' },
  'Café y Gourmet': { img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop' },
  'Belleza': { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop' }
};

// --- SCENE 5.5: VISUAL INTEGRATION DATA ---
const integrationData: Record<string, any> = {
  shopify: {
    id: 'shopify', name: 'Shopify', tag: '1-Click App', color: '#96BF48', img: "/icons/shopify.svg",
    metrics: { products: '12.4K', syncTime: '45s' },
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=250&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop'
    ]
  },
  woo: {
    id: 'woo', name: 'WooCommerce', tag: 'Native Plugin', color: '#96588A', img: "/icons/woocommerce.svg",
    metrics: { products: '3.2K', syncTime: '18s' },
    photos: [
      'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?w=200&h=250&fit=crop',
      '/images/sustrato_drenaje.jpg'
    ]
  },
  magento: {
    id: 'magento', name: 'Magento / VTEX', tag: 'Enterprise API', color: '#EE672F', img: "/icons/magento.svg",
    metrics: { products: '85.1K', syncTime: '3m 12s' },
    photos: [
      '/images/molino_acero.jpg',
      '/images/bascula_digital.jpg'
    ]
  },
  api: {
    id: 'api', name: 'Custom Store', tag: 'REST API / GraphQL', color: '#E10098', img: "/icons/graphql.svg",
    metrics: { products: 'Real-time', syncTime: '12ms' },
    photos: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=250&fit=crop',
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=200&h=250&fit=crop'
    ]
  }
};

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- POMELO ICON (HAND-DRAWN HALF POMELO / MITAD DE POMELO 3D) ---
export const PomeloIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(-10 32 33)">
      {/* Fresh Botanical Leaf on Top-Right */}
      <path d="M 40 16 C 42 7, 53 5, 58 10 C 60 16, 52 24, 42 21 Z" fill="#10B981" stroke="#047857" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 43 18 C 48 15.5, 52 13, 55.5 11" stroke="#047857" strokeWidth="1.2" strokeLinecap="round"/>
      
      {/* Second Small Leaf */}
      <path d="M 39 16 C 35 10, 28 9, 26 13 C 25 16, 32 20, 39 18 Z" fill="#34D399" stroke="#047857" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Unified 3D Pomelo Peel Body (Lower Bowl + Upper Rim) */}
      <path d="M 7.5 28 C 7.5 47.5, 19 57, 32 57 C 45 57, 56.5 47.5, 56.5 28 A 24.5 15 0 0 0 7.5 28 Z" fill="#FB923C"/>

      {/* Rich Warm Orange Shading on Right/Bottom of Bowl */}
      <path d="M 17 53 C 33 58, 52 49, 55.5 29 C 55.5 46, 44.5 56, 32 56 C 26 56, 21 55, 17 53 Z" fill="#EA580C" opacity="0.55"/>

      {/* Glossy Sunny Highlight on Left of Bowl */}
      <path d="M 12.5 34 C 13.5 40.5, 17 45.5, 22 48.5" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" opacity="0.75"/>
      <circle cx="25.5" cy="50.5" r="1.1" fill="#FEF08A" opacity="0.75"/>

      {/* Subtle Peel Texture Dimples */}
      <circle cx="44" cy="47" r="1.1" fill="#9A3412" opacity="0.35"/>
      <circle cx="48.5" cy="42" r="0.9" fill="#9A3412" opacity="0.35"/>
      <circle cx="40.5" cy="50.5" r="0.9" fill="#9A3412" opacity="0.35"/>

      {/* Outer Silhouette Stroke of the Half-Pomelo */}
      <path d="M 7.5 28 C 7.5 47.5, 19 57, 32 57 C 45 57, 56.5 47.5, 56.5 28" stroke="#C2410C" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="32" cy="28" rx="24.5" ry="15" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.4"/>

      {/* Top Cut Face in 3D Perspective */}
      <g transform="translate(32, 28) scale(1, 0.61)">
        {/* Thick Creamy-White Pomelo Pith (Albedo) */}
        <circle cx="0" cy="0" r="22.2" fill="#FFFBEB" stroke="#F97316" strokeWidth="1"/>
        
        {/* Soft Pinkish Blush around the Pulp Ring */}
        <circle cx="0" cy="0" r="19.6" fill="#FFE4E6"/>

        {/* 8 Plump, Tangentially-Rounded Ruby Segments */}
        <path d="M 3.66 1.01 L 16.24 4.50 A 2.2 2.2 0 0 1 17.68 7.48 A 19.2 19.2 0 0 1 13.32 13.83 A 2.2 2.2 0 0 1 10.03 13.55 L 2.26 3.05 A 0.9 0.9 0 0 1 2.29 1.93 A 3 3 0 0 0 2.63 1.45 A 0.9 0.9 0 0 1 3.66 1.01 Z" fill="#F43F5E"/>
        <path d="M 4.63 1.46 L 14.20 4.48 A 1.8 1.8 0 0 1 15.30 6.94 A 16.8 16.8 0 0 1 11.96 11.80 A 1.8 1.8 0 0 1 9.27 11.65 L 3.02 3.80 A 0.7 0.7 0 0 1 3.06 2.88 A 4.2 4.2 0 0 0 3.78 1.82 A 0.7 0.7 0 0 1 4.63 1.46 Z" fill="#E11D48"/>
        <ellipse cx="9.48" cy="6.51" rx="0.9" ry="1.8" transform="rotate(124.5 9.48 6.51)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M 1.87 3.30 L 8.30 14.67 A 2.2 2.2 0 0 1 7.21 17.79 A 19.2 19.2 0 0 1 -0.36 19.20 A 2.2 2.2 0 0 1 -2.49 16.67 L -0.56 3.75 A 0.9 0.9 0 0 1 0.25 2.99 A 3 3 0 0 0 0.83 2.88 A 0.9 0.9 0 0 1 1.87 3.30 Z" fill="#F43F5E"/>
        <path d="M 2.24 4.30 L 6.88 13.21 A 1.8 1.8 0 0 1 5.91 15.72 A 16.8 16.8 0 0 1 0.11 16.80 A 1.8 1.8 0 0 1 -1.69 14.80 L -0.55 4.82 A 0.7 0.7 0 0 1 0.13 4.20 A 4.2 4.2 0 0 0 1.39 3.96 A 0.7 0.7 0 0 1 2.24 4.30 Z" fill="#E11D48"/>
        <ellipse cx="2.10" cy="11.31" rx="0.9" ry="1.8" transform="rotate(169.5 2.10 11.31)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M -1.01 3.66 L -4.50 16.24 A 2.2 2.2 0 0 1 -7.48 17.68 A 19.2 19.2 0 0 1 -13.83 13.32 A 2.2 2.2 0 0 1 -13.55 10.03 L -3.05 2.26 A 0.9 0.9 0 0 1 -1.93 2.29 A 3 3 0 0 0 -1.45 2.63 A 0.9 0.9 0 0 1 -1.01 3.66 Z" fill="#F43F5E"/>
        <path d="M -1.46 4.63 L -4.48 14.20 A 1.8 1.8 0 0 1 -6.94 15.30 A 16.8 16.8 0 0 1 -11.80 11.96 A 1.8 1.8 0 0 1 -11.65 9.27 L -3.80 3.02 A 0.7 0.7 0 0 1 -2.88 3.06 A 4.2 4.2 0 0 0 -1.82 3.78 A 0.7 0.7 0 0 1 -1.46 4.63 Z" fill="#E11D48"/>
        <ellipse cx="-6.51" cy="9.48" rx="0.9" ry="1.8" transform="rotate(214.5 -6.51 9.48)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M -3.30 1.87 L -14.67 8.30 A 2.2 2.2 0 0 1 -17.79 7.21 A 19.2 19.2 0 0 1 -19.20 -0.36 A 2.2 2.2 0 0 1 -16.67 -2.49 L -3.75 -0.56 A 0.9 0.9 0 0 1 -2.99 0.25 A 3 3 0 0 0 -2.88 0.83 A 0.9 0.9 0 0 1 -3.30 1.87 Z" fill="#F43F5E"/>
        <path d="M -4.30 2.24 L -13.21 6.88 A 1.8 1.8 0 0 1 -15.72 5.91 A 16.8 16.8 0 0 1 -16.80 0.11 A 1.8 1.8 0 0 1 -14.80 -1.69 L -4.82 -0.55 A 0.7 0.7 0 0 1 -4.20 0.13 A 4.2 4.2 0 0 0 -3.96 1.39 A 0.7 0.7 0 0 1 -4.30 2.24 Z" fill="#E11D48"/>
        <ellipse cx="-11.31" cy="2.10" rx="0.9" ry="1.8" transform="rotate(259.5 -11.31 2.10)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M -3.66 -1.01 L -16.24 -4.50 A 2.2 2.2 0 0 1 -17.68 -7.48 A 19.2 19.2 0 0 1 -13.32 -13.83 A 2.2 2.2 0 0 1 -10.03 -13.55 L -2.26 -3.05 A 0.9 0.9 0 0 1 -2.29 -1.93 A 3 3 0 0 0 -2.63 -1.45 A 0.9 0.9 0 0 1 -3.66 -1.01 Z" fill="#F43F5E"/>
        <path d="M -4.63 -1.46 L -14.20 -4.48 A 1.8 1.8 0 0 1 -15.30 -6.94 A 16.8 16.8 0 0 1 -11.96 -11.80 A 1.8 1.8 0 0 1 -9.27 -11.65 L -3.02 -3.80 A 0.7 0.7 0 0 1 -3.06 -2.88 A 4.2 4.2 0 0 0 -3.78 -1.82 A 0.7 0.7 0 0 1 -4.63 -1.46 Z" fill="#E11D48"/>
        <ellipse cx="-9.48" cy="-6.51" rx="0.9" ry="1.8" transform="rotate(304.5 -9.48 -6.51)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M -1.87 -3.30 L -8.30 -14.67 A 2.2 2.2 0 0 1 -7.21 -17.79 A 19.2 19.2 0 0 1 0.36 -19.20 A 2.2 2.2 0 0 1 2.49 -16.67 L 0.56 -3.75 A 0.9 0.9 0 0 1 -0.25 -2.99 A 3 3 0 0 0 -0.83 -2.88 A 0.9 0.9 0 0 1 -1.87 -3.30 Z" fill="#F43F5E"/>
        <path d="M -2.24 -4.30 L -6.88 -13.21 A 1.8 1.8 0 0 1 -5.91 -15.72 A 16.8 16.8 0 0 1 -0.11 -16.80 A 1.8 1.8 0 0 1 1.69 -14.80 L 0.55 -4.82 A 0.7 0.7 0 0 1 0.13 -4.20 A 4.2 4.2 0 0 0 -1.39 -3.96 A 0.7 0.7 0 0 1 -2.24 -4.30 Z" fill="#E11D48"/>
        <ellipse cx="-2.10" cy="-11.31" rx="0.9" ry="1.8" transform="rotate(349.5 -2.10 -11.31)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M 1.01 -3.66 L 4.50 -16.24 A 2.2 2.2 0 0 1 7.48 -17.68 A 19.2 19.2 0 0 1 13.83 -13.32 A 2.2 2.2 0 0 1 13.55 -10.03 L 3.05 -2.26 A 0.9 0.9 0 0 1 1.93 -2.29 A 3 3 0 0 0 1.45 -2.63 A 0.9 0.9 0 0 1 1.01 -3.66 Z" fill="#F43F5E"/>
        <path d="M 1.46 -4.63 L 4.48 -14.20 A 1.8 1.8 0 0 1 6.94 -15.30 A 16.8 16.8 0 0 1 11.80 -11.96 A 1.8 1.8 0 0 1 11.65 -9.27 L 3.80 -3.02 A 0.7 0.7 0 0 1 2.88 -3.06 A 4.2 4.2 0 0 0 1.82 -3.78 A 0.7 0.7 0 0 1 1.46 -4.63 Z" fill="#E11D48"/>
        <ellipse cx="6.51" cy="-9.48" rx="0.9" ry="1.8" transform="rotate(394.5 6.51 -9.48)" fill="#FFE4E6" opacity="0.9"/>
        <path d="M 3.30 -1.87 L 14.67 -8.30 A 2.2 2.2 0 0 1 17.79 -7.21 A 19.2 19.2 0 0 1 19.20 0.36 A 2.2 2.2 0 0 1 16.67 2.49 L 3.75 0.56 A 0.9 0.9 0 0 1 2.99 -0.25 A 3 3 0 0 0 2.88 -0.83 A 0.9 0.9 0 0 1 3.30 -1.87 Z" fill="#F43F5E"/>
        <path d="M 4.30 -2.24 L 13.21 -6.88 A 1.8 1.8 0 0 1 15.72 -5.91 A 16.8 16.8 0 0 1 16.80 -0.11 A 1.8 1.8 0 0 1 14.80 1.69 L 4.82 0.55 A 0.7 0.7 0 0 1 4.20 -0.13 A 4.2 4.2 0 0 0 3.96 -1.39 A 0.7 0.7 0 0 1 4.30 -2.24 Z" fill="#E11D48"/>
        <ellipse cx="11.31" cy="-2.10" rx="0.9" ry="1.8" transform="rotate(439.5 11.31 -2.10)" fill="#FFE4E6" opacity="0.9"/>

        {/* Central Creamy Pith Core */}
        <circle cx="0" cy="0" r="2.8" fill="#FFFBEB"/>
        <circle cx="0" cy="0" r="1.1" fill="#FDBA74"/>
      </g>
    </g>
  </svg>
);

export default function App() {
  // Hero State
  const [activeProfileId, setActiveProfileId] = useState('isabella');
  const [chatStep, setChatStep] = useState(0); 
  const activeData = scenarios[activeProfileId];

  // Discovery Intent State
  const [activeIntentIndex, setActiveIntentIndex] = useState(0);
  const activeIntent = discoveryIntents[activeIntentIndex];

  // Live Ledger State
  const [ledgerIndex, setLedgerIndex] = useState(0);
  const activeLedger = ledgerData[ledgerIndex];

  // Integration State
  const [activeIntegrationId, setActiveIntegrationId] = useState('shopify');
  const activeIntegration = integrationData[activeIntegrationId];

  // CTA State
  const [ctaCategory, setCtaCategory] = useState('Moda');

  // Orquestación Hero Chat
  useEffect(() => {
    setChatStep(0);
    const t1 = setTimeout(() => setChatStep(1), 300); // Mostrar mensaje usuario
    const t2 = setTimeout(() => setChatStep(2), 800); // Mostrar "escribiendo..." (Más rápido)
    const t3 = setTimeout(() => setChatStep(3), 2000); // Mostrar respuesta AI (Más rápido)
    const t4 = setTimeout(() => setChatStep(4), 2500); // Mostrar productos en Kit Builder (Más rápido)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [activeProfileId]);

  // Orquestación Discovery Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIntentIndex((prev) => (prev + 1) % discoveryIntents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Orquestación Live Ledger Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setLedgerIndex((prev) => (prev + 1) % ledgerData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] font-sans selection:bg-[#DC2626] selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <header className="fixed top-0 w-full px-6 lg:px-12 py-6 flex justify-between items-center z-50 bg-[#F3F4F6]/80 backdrop-blur-md border-b border-gray-200">
        <div className="font-bold tracking-tighter text-xl text-[#1F2937] flex items-center gap-2.5">
          <PomeloIcon className="w-8 h-8 drop-shadow-sm" />
          Pomeva AI
        </div>
        <button className="text-xs uppercase tracking-widest text-[#1F2937] border-b border-[#1F2937] pb-1 hover:text-[#DC2626] hover:border-[#DC2626] transition-colors font-medium">
          Integrar en mi tienda
        </button>
      </header>

      {/* 2. HERO EXPERIENCE */}
      <section className="min-h-screen pt-32 pb-16 px-6 lg:px-12 flex flex-col relative bg-white">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-[#1F2937]">
            Escucha. Comprende. Recomienda.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light">
            Cada conversación se convierte en una oportunidad de venta curada e inteligente.
          </p>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto w-full">
          
          {/* LEFT: INTELLIGENT CONVERSATION */}
          <div className="lg:col-span-5 flex flex-col relative z-10">
            {/* Profile Selector */}
            <div className="flex gap-4 mb-8">
              {Object.values(scenarios).map((profile: any) => (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfileId(profile.id)}
                  style={{ borderColor: activeProfileId === profile.id ? profile.color : 'transparent' }}
                  className={`relative rounded-full overflow-hidden w-14 h-14 transition-all duration-500 ease-out border-2 ${
                    activeProfileId === profile.id ? 'scale-110 shadow-lg' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Chat UI */}
            <div className="flex-1 bg-[#F3F4F6] border border-gray-200 p-6 md:p-8 rounded-[2rem] shadow-inner flex flex-col justify-between min-h-[420px]">
              <div className="space-y-6">
                {/* User Message */}
                <AnimatePresence>
                  {chatStep >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
                      <img src={activeData.avatar} alt="" className="w-8 h-8 rounded-full object-cover mt-1 shadow-sm" />
                      <div className="bg-white p-4 rounded-2xl rounded-tl-sm text-[#1F2937] text-sm md:text-base leading-relaxed shadow-sm border border-gray-100">
                        "{activeData.request}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Typing Indicator */}
                <AnimatePresence>
                  {chatStep === 2 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-start gap-4 flex-row-reverse">
                       <div style={{ backgroundColor: activeData.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white mt-1 shrink-0 shadow-md">
                        <Zap size={14} />
                      </div>
                      <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tr-sm flex gap-1 items-center shadow-sm">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Response */}
                <AnimatePresence>
                  {chatStep >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 flex-row-reverse">
                      <div style={{ backgroundColor: activeData.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white mt-1 shrink-0 shadow-md">
                        <Zap size={14} />
                      </div>
                      <div className="bg-[#1F2937] text-white p-4 rounded-2xl rounded-tr-sm text-sm md:text-base leading-relaxed shadow-lg font-light">
                        {activeData.aiResponse}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT KIT BUILDER */}
          <div className="lg:col-span-7 flex flex-col justify-center relative min-h-[500px] lg:min-h-0">
            <div className="relative w-full h-[60%] md:h-[70%] mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {chatStep >= 4 && (
                  <motion.div key={activeData.id} className="absolute inset-0 flex items-center justify-center">
                    {activeData.products.map((product: any, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
                        animate={{ opacity: 1, scale: 1, x: product.x, y: product.y }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.8, delay: index * 0.15, type: "spring", damping: 15 }}
                        style={{ zIndex: product.z, rotate: product.rotate }}
                        className="absolute shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:scale-105 hover:z-50 transition-transform duration-500 cursor-pointer"
                      >
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="w-32 md:w-48 lg:w-56 object-cover border-[6px] border-white bg-white" 
                        />
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 text-xs whitespace-nowrap shadow-sm border border-gray-100 font-medium text-[#1F2937]">
                          {product.name}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Value Transformation UI */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="text-center sm:text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Producto Base</div>
                  <div className="text-xl line-through opacity-40 font-light">${activeData.basePrice}</div>
                </div>
                <ArrowRight className="text-gray-300" size={20} />
                <div className="text-center sm:text-left">
                  <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: activeData.color }}>
                    Kit Personalizado ({activeData.multiplier})
                  </div>
                  <AnimatePresence mode="popLayout">
                    {chatStep >= 4 ? (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-light text-[#1F2937]">
                        ${activeData.kitPrice}
                      </motion.div>
                    ) : (
                      <div className="text-3xl font-light text-transparent bg-gray-100 animate-pulse rounded w-20 h-9"></div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <button 
                disabled={chatStep < 4}
                className="w-full sm:w-auto bg-[#DC2626] text-white px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B91C1C] transition-colors duration-300 flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(220,38,38,0.3)] font-medium rounded-full"
              >
                Añadir Kit al Carrito
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL DISCOVERY PLATFORM (Intent Parser) */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-[#F3F4F6] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:mb-24 text-center">
            <div className="text-[#DC2626] font-bold text-xs uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
              <PomeloIcon className="w-4 h-4 inline-block" /> Pomeva Product Discovery Platform
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1F2937] leading-tight">
              Transformando catálogos estáticos en <br className="hidden md:block"/>
              <span className="italic font-normal">experiencias de compra inteligentes.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Intents List */}
            <div className="w-full lg:w-5/12 flex flex-col gap-2">
              {discoveryIntents.map((intent, idx) => {
                const isActive = activeIntentIndex === idx;
                return (
                  <motion.button
                    key={intent.id}
                    onClick={() => setActiveIntentIndex(idx)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-full text-left py-6 px-2 flex items-start gap-5 transition-all duration-500 border-b border-gray-200 last:border-0 ${
                      isActive 
                        ? 'opacity-100 pl-6 border-b-[#DC2626]' 
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className={`mt-1 transition-colors ${isActive ? 'text-[#DC2626]' : 'text-gray-400'}`}>
                      <MessageSquare size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${isActive ? 'text-[#DC2626]' : 'text-gray-400'}`}>
                        {intent.id}
                      </div>
                      <p className={`text-lg md:text-xl leading-relaxed ${isActive ? 'text-[#1F2937] font-medium italic' : 'text-gray-500 font-light'}`}>
                        "{intent.quote}"
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: The Engine (Catalog Grid) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="w-full lg:w-7/12 bg-white h-[500px] md:h-[600px] rounded-[3rem] p-8 relative flex flex-col justify-center items-center shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Background Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" preserveAspectRatio="none">
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1F2937" strokeWidth="1"/>
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Database size={14} /> Neural Catalog Mapping
              </div>

              {/* The Grid */}
              <div className="grid grid-cols-4 gap-4 md:gap-6 relative z-10">
                {/* Laser Scanner Line */}
                <motion.div 
                  key={`scanner-${activeIntentIndex}`}
                  initial={{ top: '-10%', opacity: 0 }}
                  animate={{ top: ['-10%', '110%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute left-[-20%] w-[140%] h-[2px] bg-[#DC2626] z-20 shadow-[0_0_20px_rgba(220,38,38,1)] pointer-events-none"
                />
                {Array.from({ length: 16 }).map((_, i) => {
                  const isActive = activeIntent.activeNodes.includes(i);
                  return (
                    <motion.div 
                      key={`${activeIntentIndex}-${i}`}
                      initial={{ backgroundColor: '#F3F4F6', borderColor: '#E5E7EB', scale: 1 }}
                      animate={{
                        backgroundColor: isActive ? '#DC2626' : '#F3F4F6',
                        borderColor: isActive ? '#FCA5A5' : '#E5E7EB',
                        scale: isActive ? [1, 1.15, 1.05] : 1
                      }}
                      transition={{ duration: 0.4, delay: isActive ? (i % 4) * 0.1 : 0 }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center transition-shadow ${
                        isActive ? 'shadow-[0_0_20px_rgba(220,38,38,0.3)] z-10' : 'z-0'
                      }`}
                    >
                      {isActive && (
                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                          <Check size={20} className="text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Extracted Tags Popup */}
              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 md:gap-4 px-6">
                <AnimatePresence mode="wait">
                  {activeIntent.tags.map((tag, i) => (
                    <motion.div
                      key={`${activeIntentIndex}-${tag}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      transition={{ type: "spring", damping: 15, delay: 0.6 + (i * 0.1) }}
                      className="bg-[#1F2937] px-5 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-white shadow-xl flex items-center gap-2 whitespace-nowrap"
                    >
                      <Layers size={14} className="text-[#DC2626]" />
                      {tag}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-[#1F2937]">
              Help customers find the right products, faster.
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Reduce la fricción entre la intención y el carrito de compras mediante una experiencia de descubrimiento contextual.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* Traditional Search */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col grayscale hover:grayscale-[50%] transition-all duration-500 group relative">
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-10 flex items-center gap-2">
                <Clock size={14} /> Búsqueda Tradicional (Lenta)
              </div>
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-4 flex items-center gap-4">
                  <Search size={20} className="text-gray-400" />
                  <div className="text-lg text-gray-400 font-light italic">"crema hidratante para invierno..."</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=150&h=150&fit=crop',
                    'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=150&h=150&fit=crop',
                    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&h=150&fit=crop',
                    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop',
                    '/images/crema_facial_1.jpg',
                    '/images/crema_facial_2.jpg'
                  ].map((img, i) => (
                    <div key={i} className="aspect-square bg-gray-100 overflow-hidden group-hover:animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                      <img src={img} className="w-full h-full object-cover opacity-30 mix-blend-multiply" alt=""/>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 font-light pt-2">Resultados abrumadores, filtros manuales y alta fricción.</div>
              </div>
            </motion.div>

            {/* Pomeva AI */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DC2626]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="text-xs uppercase tracking-widest text-[#DC2626] font-bold mb-10 flex items-center gap-2 relative z-10">
                <PomeloIcon className="w-4 h-4" /> Pomeva AI (Instantánea)
              </div>
              <div className="space-y-8 relative z-10">
                <div className="border-b border-gray-200 pb-4 flex items-center gap-4">
                  <MessageSquare size={20} className="text-[#DC2626]" />
                  <div className="text-lg text-[#1F2937] font-medium italic">"Tengo la piel muy seca por el frío..."</div>
                </div>
                <div className="flex gap-6 items-center bg-transparent mt-4">
                  <div className="relative shrink-0">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&h=120&fit=crop" className="w-28 h-28 object-cover border-[4px] border-white shadow-xl z-10 relative" alt="Skincare kit" />
                    <div className="absolute -bottom-3 -right-3 w-28 h-28 bg-[#F3F4F6] border border-gray-200 z-0"></div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest bg-[#1F2937] text-white px-2 py-1 inline-block mb-3">Solución Exacta</div>
                    <div className="text-lg font-bold text-[#1F2937] mb-1">Kit Hidratación Profunda</div>
                    <div className="text-sm text-gray-500 mb-3">Sérum + Crema Barrera</div>
                  </div>
                </div>
                <div className="text-sm text-[#DC2626] font-medium pt-4">Descubrimiento contextual y recomendaciones listas para comprar.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. BUSINESS INTELLIGENCE (LIVE LEDGER) */}
      <section className="py-24 px-6 lg:px-12 bg-[#F3F4F6] border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center max-w-2xl mx-auto">
             <div className="text-[#DC2626] font-bold text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Database size={14} /> Intelligence Engine
            </div>
            <h2 className="text-3xl lg:text-5xl font-light tracking-tight mb-6 text-[#1F2937]">Las conversaciones estructuran tu negocio.</h2>
            <p className="text-lg text-gray-500 font-light">El asistente no solo vende; extrae inteligencia de negocio de cada chat en tiempo real. Descubre lo que tus clientes realmente buscan.</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[500px] border-t border-gray-200 pt-12">
            
            {/* Left: Chat Stream */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center relative">
              <div className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                <Clock size={14} /> Live Stream
              </div>
              
              <div className="space-y-6 mt-8">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeLedger.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {activeLedger.chat.map((msg: any, i: number) => (
                      <div key={i} className={`flex items-start gap-4 ${msg.active ? 'opacity-100 scale-100' : 'opacity-40 scale-95'} transition-all duration-500`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${msg.active ? 'bg-[#DC2626]' : 'bg-gray-300'}`}>
                           <MessageSquare size={12} />
                        </div>
                        <div className={`py-2 px-1 text-base ${msg.active ? 'text-[#1F2937]' : 'text-gray-500'}`}>
                          {msg.active ? (
                            <span>
                              {msg.text.split(activeLedger.highlighted)[0]}
                              <span className="bg-[#DC2626]/10 text-[#DC2626] font-medium px-1 mx-1 rounded">{activeLedger.highlighted}</span>
                              {msg.text.split(activeLedger.highlighted)[1]}
                            </span>
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Extracted Intelligence */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center relative border-l border-gray-200 pl-0 lg:pl-12">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeLedger.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full"
                >
                  {/* Ledger Visual Image Banner */}
                  <div className="w-full h-40 md:h-52 overflow-hidden mb-8 relative group">
                    <img 
                      src={activeLedger.img} 
                      alt={activeLedger.extracted} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: activeLedger.color }}>
                      {React.createElement(activeLedger.icon, { size: 14 })}
                      {activeLedger.category}
                    </div>
                  </div>

                  <div className="mb-10">
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Concepto Extraído</div>
                    <h3 className="text-3xl md:text-5xl font-light text-[#1F2937] leading-tight">
                      {activeLedger.extracted}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8 mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">{activeLedger.metricTitle}</div>
                      <div className="flex items-end gap-3">
                        <div className="text-4xl font-light text-[#1F2937]">{activeLedger.metricValue}</div>
                        {/* Animated Sparkline Micro-chart */}
                        {(() => {
                            const data = activeLedger.chartData;
                            const max = Math.max(...data);
                            const min = Math.min(...data);
                            const range = max - min || 1;
                            const width = 70;
                            const height = 24;
                            const points = data.map((d: number, index: number) => `${(index / (data.length - 1)) * width},${height - ((d - min) / range) * height}`).join(" ");
                            return (
                                <svg viewBox={`-5 -5 ${width+10} ${height+10}`} className="w-16 h-8 overflow-visible mb-1 opacity-60">
                                  <motion.polyline
                                    fill="none"
                                    stroke={activeLedger.color}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={points}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                  />
                                </svg>
                            );
                        })()}
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                       <button className="text-[10px] font-bold uppercase tracking-widest border-b border-[#1F2937] text-[#1F2937] hover:text-[#DC2626] hover:border-[#DC2626] transition-colors pb-1 w-fit flex items-center gap-2 group">
                          {activeLedger.action}
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="absolute -bottom-10 right-0 flex gap-2 z-10">
                {ledgerData.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === ledgerIndex ? 'bg-[#DC2626] w-6' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 INTEGRATION SHOWCASE */}
      <section className="py-24 px-6 lg:px-12 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center max-w-3xl mx-auto">
            <div className="text-[#DC2626] font-bold text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Link size={14} /> Ecosistema Conectado
            </div>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-[#1F2937]">
              Conecta tu catálogo en minutos. <br className="hidden sm:block" />Empieza a vender mejor.
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Pomeva procesa tu inventario, variables y contexto de forma nativa sin interrumpir la operación de tu tienda.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mt-12">
            
            {/* Left: Platform Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {Object.values(integrationData).map((node: any) => (
                <button 
                  key={node.id}
                  onClick={() => setActiveIntegrationId(node.id)}
                  className={`flex items-center gap-6 py-6 border-b border-gray-100 last:border-0 transition-all duration-300 text-left group ${
                    activeIntegrationId === node.id 
                      ? 'opacity-100 pl-4 border-l-4 border-l-[#DC2626]' 
                      : 'opacity-40 hover:opacity-70 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 transition-colors duration-300`}>
                    <img 
                      src={node.img} 
                      alt={node.name} 
                      className={`w-full h-full object-contain transition-all duration-300 ${activeIntegrationId === node.id ? 'grayscale-0' : 'grayscale'}`} 
                    />
                  </div>
                  <div>
                    <div className={`font-medium text-xl transition-colors ${activeIntegrationId === node.id ? 'text-[#1F2937]' : 'text-gray-500'}`}>
                      {node.name}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{node.tag}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Visual Data Sync Pipeline */}
            <div className="lg:col-span-8 relative">
              <div className="flex flex-col h-full min-h-[450px] justify-center relative group">
                
                {/* Top badge */}
                <div className="flex justify-between items-start z-10 relative mb-16">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 flex items-center justify-center">
                       <img src={activeIntegration.img} className="w-full h-full object-contain drop-shadow-sm" alt={activeIntegration.name} />
                     </div>
                     <div>
                       <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Fuente del Catálogo</div>
                       <div className="text-[#1F2937] font-medium text-xl">{activeIntegration.name}</div>
                     </div>
                   </div>
                   <div className="bg-transparent px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F2937]">Sync Activa</span>
                   </div>
                </div>

                {/* The Visual Sync Core */}
                <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative z-10 py-10">
                   
                   {/* The raw catalog (Cascading grid) */}
                   <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                      <div className="absolute -top-8 left-0 text-[10px] uppercase font-bold tracking-widest text-gray-400 w-full text-center">Catálogo Bruto</div>
                      <motion.img 
                        key={`${activeIntegration.id}-img1`}
                        initial={{ opacity: 0, y: 10, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: -10 }} 
                        src={activeIntegration.photos[0]} 
                        className="absolute w-24 h-32 md:w-28 md:h-36 object-cover shadow-xl border-[4px] border-white left-0 top-0 z-10 grayscale-[30%]" 
                      />
                      <motion.img 
                        key={`${activeIntegration.id}-img2`}
                        initial={{ opacity: 0, y: -10, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 10 }} transition={{ delay: 0.1 }}
                        src={activeIntegration.photos[1]} 
                        className="absolute w-24 h-32 md:w-28 md:h-36 object-cover shadow-md border-[4px] border-white right-0 top-6 z-0 grayscale-[70%]" 
                      />
                   </div>

                   {/* The Connector Engine */}
                   <div className="flex flex-col items-center gap-3 shrink-0 mx-4">
                     <div className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center relative z-10">
                        <Zap size={18} className="text-[#DC2626]" />
                        <motion.div animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 rounded-full border border-[#DC2626]"></motion.div>
                     </div>
                     <div className="w-24 md:w-32 h-[1px] bg-gray-300 relative overflow-hidden">
                       <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="absolute inset-0 w-1/3 bg-[#DC2626]"></motion.div>
                     </div>
                   </div>

                   {/* The AI structured output (Bundles) */}
                   <div className="flex flex-col gap-6 relative shrink-0">
                      <div className="absolute -top-8 left-0 text-[10px] uppercase font-bold tracking-widest text-[#DC2626] w-full text-center">Inteligencia AI</div>
                      
                      <motion.div key={`${activeIntegration.id}-out1`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-4 shadow-xl border border-gray-100 flex items-center gap-4 w-56 md:w-64 relative">
                         <div className="absolute -left-1 top-0 bottom-0 w-1 bg-[#DC2626]"></div>
                         <div className="flex -space-x-3">
                           <img src={activeIntegration.photos[0]} className="w-10 h-10 rounded-full object-cover border-[2px] border-white shadow-sm" alt=""/>
                           <img src={activeIntegration.photos[1]} className="w-10 h-10 rounded-full object-cover border-[2px] border-white shadow-sm" alt=""/>
                         </div>
                         <div>
                           <div className="text-[11px] font-bold text-[#1F2937] leading-tight mb-1">Bundle Recomendado</div>
                           <div className="text-[10px] text-gray-400 flex items-center gap-1"><Check size={10} className="text-[#DC2626]"/> Match Semántico</div>
                         </div>
                      </motion.div>
                      
                      <motion.div key={`${activeIntegration.id}-out2`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-transparent p-2 flex items-center gap-4 w-56 md:w-64 opacity-70">
                         <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 shrink-0">
                            <Box size={14} />
                         </div>
                         <div>
                           <div className="text-[11px] font-bold text-gray-500 leading-tight">Variantes Indexadas</div>
                           <div className="text-[10px] text-gray-400">Inventario sincronizado</div>
                         </div>
                      </motion.div>
                   </div>
                </div>

                {/* Bottom Metrics */}
                <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8 relative z-10 mt-12">
                   <div>
                     <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Volumen</div>
                     <div className="text-3xl font-light text-[#1F2937]">{activeIntegration.metrics.products}</div>
                   </div>
                   <div>
                     <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Indexación</div>
                     <div className="text-3xl font-light text-[#1F2937]">{activeIntegration.metrics.syncTime}</div>
                   </div>
                   <div>
                     <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Estado de IA</div>
                     <div className="text-3xl font-light text-[#DC2626] flex items-center gap-2">Lista <Check size={20}/></div>
                   </div>
                </div>

                {/* Background watermark */}
                <div className="absolute -bottom-20 -right-12 w-[28rem] h-[28rem] opacity-[0.03] grayscale pointer-events-none z-0 transform -rotate-12 transition-all duration-700">
                   <img src={activeIntegration.img} className="w-full h-full object-contain" alt=""/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. DYNAMIC ONBOARDING (FINAL CTA) */}
      <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-[#1F2937]">
              Prepara tu tienda <br className="hidden md:block"/>para entender mejor.
            </h2>
            <p className="text-lg text-gray-500 font-light mb-12">
              Selecciona tu sector principal y descubre cómo Pomeva AI se adapta a tu catálogo.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {Object.keys(ctaCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCtaCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    ctaCategory === cat 
                      ? 'bg-[#1F2937] text-white border-[#1F2937] shadow-lg scale-105' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button className="bg-[#DC2626] text-white px-8 py-4 rounded-full text-lg font-medium shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:bg-[#B91C1C] transition-colors w-fit flex items-center gap-3 group">
              Comenzar Integración
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200">
             <AnimatePresence mode="wait">
                <motion.img
                  key={ctaCategory}
                  src={ctaCategories[ctaCategory].img}
                  alt={ctaCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white py-12 px-6 lg:px-12 border-t border-gray-200 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <PomeloIcon className="w-6 h-6" />
          <span className="font-bold tracking-tighter text-lg text-[#1F2937]">Pomeva AI</span>
        </div>
        <p className="text-gray-400 text-sm font-light">
          © {new Date().getFullYear()} Pomeva. Redefiniendo el descubrimiento de productos.
        </p>
      </footer>
    </div>
  );
}
