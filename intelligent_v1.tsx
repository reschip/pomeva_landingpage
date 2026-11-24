import React, { useState, useEffect } from 'react';
import { TrendingUp, Bell, Zap } from 'lucide-react';
import { EditorialHero } from './src/components/EditorialHero';
import { EditorialDiscovery } from './src/components/EditorialDiscovery';
import { EditorialComparison } from './src/components/EditorialComparison';
import { EditorialLedger } from './src/components/EditorialLedger';
import { EditorialIntegrations } from './src/components/EditorialIntegrations';
import { EditorialOnboarding } from './src/components/EditorialOnboarding';
import { PomeloIcon } from './src/components/PomeloIcon';
export { PomeloIcon };

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
      { id: 'p7', name: 'Sérum Hialurónico', price: 42, img: '/images/crema_facial_2.jpg', z: 30, rotate: -2, x: '-15%', y: '-5%' },
      { id: 'p8', name: 'Crema Barrera', price: 38, img: '/images/crema_facial_1.jpg', z: 20, rotate: 8, x: '15%', y: '30%' },
      { id: 'p9', name: 'Limpiador Suave', price: 25, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop', z: 40, rotate: -4, x: '35%', y: '5%' }
    ],
    basePrice: 42,
    kitPrice: 105,
    multiplier: '2.5x ticket',
    cartPrompt: '¿Agrego los 3 productos a tu carrito?',
    cartReply: 'Sí, arma mi rutina.',
    cartSummary: '3 productos agregados al carrito',
    cycleDuration: 15500,
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    theme: 'Café de especialidad',
    color: '#1F2937', // Charcoal
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    request: "Quería el Molino Comandante pero veo que está agotado, ¿tienen algo similar en acero?",
    aiResponse: "Vuelve en 2 semanas, pero nuestro Molino de Acero tiene el mismo ajuste micrométrico y stock inmediato.",
    inlineProduct: {
      name: 'Molino de Acero',
      price: 85,
      img: '/images/molino_acero.jpg',
      note: 'Stock inmediato',
    },
    followUp: {
      request: "Perfecto. Necesito 12 kits completos para mi equipo esta semana, ¿tienen stock y facturan?",
      aiResponse: "Tenemos 20 unidades listas de cada pieza con envío en 48 h y factura automática. Cada kit queda en $144:",
    },
    products: [
      { id: 'p4', name: 'Molino de Acero', price: 85, img: '/images/molino_acero.jpg', z: 30, rotate: 1, x: '0%', y: '0%' },
      { id: 'p5', name: 'Báscula Digital', price: 35, img: '/images/bascula_digital.jpg', z: 20, rotate: -3, x: '-20%', y: '25%' },
      { id: 'p6', name: 'Café Kenia Lavado', price: 24, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop', z: 40, rotate: 5, x: '30%', y: '20%' }
    ],
    basePrice: 1728,
    kitPrice: 1728,
    multiplier: 'B2B · 12 kits',
    cartPrompt: '¿Agrego los 12 kits a tu carrito?',
    cartReply: 'Dale, súmalos al pedido.',
    cartSummary: '12 kits agregados al carrito',
    cycleDuration: 26000,
  },
  sofia: {
    id: 'sofia',
    name: 'Sofía',
    theme: 'Plantas y hogar',
    color: '#059669', // Emerald
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    request: "Ya tengo la Maceta Terracota ($45) en mi carrito, ¿cuánto me falta para envío gratis?",
    aiResponse: "Te faltan $45 sobre tu Maceta Terracota para activar el envío gratis hoy mismo.",
    inlineProduct: {
      name: 'Maceta Terracota',
      price: 45,
      img: 'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?w=300&h=300&fit=crop',
      note: 'En tu carrito',
    },
    followUp: {
      request: "Genial, pero mi tope total son $100, ¿qué planta y tierra puedo sumar sin pasarme?",
      aiResponse: "Sumando la Zamioculcas ($32) y el Sustrato drenante ($15) cubres el envío gratis y queda lista en $92 totales:",
    },
    products: [
      { id: 'p1', name: 'Zamioculcas (ZZ)', price: 32, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop', z: 30, rotate: -2, x: '-10%', y: '5%' },
      { id: 'p3', name: 'Sustrato Drenaje', price: 15, img: '/images/sustrato_drenaje.jpg', z: 40, rotate: -5, x: '35%', y: '40%' }
    ],
    basePrice: 45,
    kitPrice: 92,
    multiplier: 'Envío gratis',
    cartPrompt: '¿Agrego esos 2 productos a tu carrito?',
    cartReply: 'Perfecto, agrégalas.',
    cartSummary: '2 productos agregados al carrito',
    cycleDuration: 26000,
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

// PomeloIcon importado y re-exportado desde ./src/components/PomeloIcon

export default function App() {
  // Hero State
  const [activeProfileId, setActiveProfileId] = useState('isabella');
  const [chatStep, setChatStep] = useState(0);

  // Discovery Intent State
  const [activeIntentIndex, setActiveIntentIndex] = useState(0);

  // Live Ledger State
  const [ledgerIndex, setLedgerIndex] = useState(0);

  // Integration State
  const [activeIntegrationId, setActiveIntegrationId] = useState('shopify');

  // CTA State
  const [ctaCategory, setCtaCategory] = useState('Moda');

  // Orquestación Hero Chat (ritmo pausado y cinematográfico)
  useEffect(() => {
    setChatStep(0);
    const t1 = setTimeout(() => setChatStep(1), 450); // Mostrar mensaje usuario
    const t2 = setTimeout(() => setChatStep(2), 1400); // Mostrar analizando
    const t3 = setTimeout(() => setChatStep(3), 3000); // Mostrar respuesta AI
    const t4 = setTimeout(() => setChatStep(4), 3600); // Iniciar transición a productos
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [activeProfileId]);

  // Orquestación Hero Auto-cycle (respeta duración por escenario)
  useEffect(() => {
    const profileIds = Object.keys(scenarios);
    const duration = scenarios[activeProfileId]?.cycleDuration ?? 16500;
    const timeout = setTimeout(() => {
      setActiveProfileId((prev) => {
        const idx = profileIds.indexOf(prev);
        return profileIds[(idx + 1) % profileIds.length];
      });
    }, duration);
    return () => clearTimeout(timeout);
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-editorial-sans selection:bg-[#111111] selection:text-[#FFFFFF] overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <header className="fixed top-0 w-full px-6 lg:px-12 py-6 lg:py-7 flex justify-between items-center z-50 bg-[#FFFFFF] font-editorial-sans">
        <div className="font-semibold tracking-[-0.03em] text-lg text-[#111111] flex items-center gap-2.5">
          <PomeloIcon className="w-7 h-7" />
          Pomeva AI
        </div>
        <button className="text-[11px] uppercase tracking-[0.16em] text-[#111111] border-b border-[#111111] pb-1 hover:text-[#DC2626] hover:border-[#DC2626] transition-colors font-medium">
          Integrar en mi tienda
        </button>
      </header>

      {/* 2. HERO EXPERIENCE */}
      <EditorialHero
        scenarios={scenarios}
        activeProfileId={activeProfileId}
        setActiveProfileId={setActiveProfileId}
        chatStep={chatStep}
      />

      {/* 3. VISUAL DISCOVERY PLATFORM (Intent Parser) */}
      <EditorialDiscovery
        intents={discoveryIntents}
        activeIntentIndex={activeIntentIndex}
        setActiveIntentIndex={setActiveIntentIndex}
      />

      {/* 4. VALUE PROPOSITION */}
      <EditorialComparison />

      {/* 5. BUSINESS INTELLIGENCE (LIVE LEDGER) */}
      <EditorialLedger
        entries={ledgerData}
        ledgerIndex={ledgerIndex}
        setLedgerIndex={setLedgerIndex}
      />

      {/* 5.5 INTEGRATION SHOWCASE */}
      <EditorialIntegrations
        integrations={integrationData}
        activeIntegrationId={activeIntegrationId}
        setActiveIntegrationId={setActiveIntegrationId}
      />

      {/* 6. DYNAMIC ONBOARDING (FINAL CTA) */}
      <EditorialOnboarding
        categories={ctaCategories}
        ctaCategory={ctaCategory}
        setCtaCategory={setCtaCategory}
      />

      {/* 7. FOOTER */}
      <footer className="bg-[#FFFFFF] pt-20 pb-16 sm:pt-24 sm:pb-20 px-6 lg:px-12 text-center font-editorial-sans">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <PomeloIcon className="w-6 h-6" />
          <span className="font-semibold tracking-[-0.03em] text-lg text-[#111111]">Pomeva AI</span>
        </div>
        <p className="text-[#737370] text-[13px] font-normal">
          © {new Date().getFullYear()} Pomeva. Redefiniendo el descubrimiento de productos.
        </p>
      </footer>
    </div>
  );
}
