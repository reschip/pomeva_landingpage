import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowRight, Plus, TrendingUp, Search, Bell, Check, Database, Zap, Layers, Cpu, Clock, ChevronRight, ShoppingBag, Box, Globe, Code, Link } from 'lucide-react';
import { EditorialHero } from './src/components/EditorialHero';
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

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// PomeloIcon importado y re-exportado desde ./src/components/PomeloIcon

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
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] font-sans selection:bg-[#DC2626] selection:text-white overflow-x-hidden">
      
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
