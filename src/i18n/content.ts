import type { ComponentType } from 'react';
import { TrendingUp, Bell, Zap } from 'lucide-react';

export type Lang = 'es' | 'en';

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  z: number;
  rotate: number;
  x: string;
  y: string;
}

export interface InlineProduct {
  name: string;
  price: number;
  img: string;
  note?: string;
}

export interface FollowUpTurn {
  request: string;
  aiResponse: string;
}

export interface Scenario {
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
  cycleDuration: number;
}

export interface DiscoveryIntent {
  id: string;
  label: string;
  quote: string;
  tags: string[];
  activeNodes: number[];
}

export interface LedgerEntry {
  id: string;
  category: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  chat: { text: string; active: boolean }[];
  highlighted: string;
  extracted: string;
  metricTitle: string;
  metricValue: string;
  action: string;
  img: string;
  chartData: number[];
}

export interface IntegrationPlatform {
  id: string;
  name: string;
  tag: string;
  color: string;
  img: string;
  metrics: {
    products: string;
    syncTime: string;
  };
  photos: string[];
}

export interface OnboardingCategory {
  id: 'fashion' | 'home' | 'coffee' | 'beauty';
  label: string;
  img: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    cta: string;
    langSwitcherLabel: string;
  };
  hero: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitleBefore: string;
    badge: string;
    subtitleAfter: string;
    scenarioNavAria: string;
    viewScenario: (name: string) => string;
    cartPromptFallback: (count: number) => string;
    cartReplyFallback: string;
    cartSummaryFallback: (count: number) => string;
    scenarios: Record<string, Scenario>;
  };
  discovery: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    groupAria: string;
    catalogMapping: string;
    matches: string;
    intents: DiscoveryIntent[];
  };
  comparison: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    traditionalLabel: string;
    slowBadge: string;
    traditionalQuery: string;
    traditionalCaption: string;
    instantBadge: string;
    pomeraQuery: string;
    exactMatch: string;
    kitTitle: string;
    kitSubtitle: string;
    pomeraCaption: string;
  };
  ledger: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    navAria: string;
    viewExample: (title: string) => string;
    extractedConcept: string;
    entries: LedgerEntry[];
  };
  integrations: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    groupAria: string;
    rawCatalog: string;
    aiIntelligence: string;
    recommendedBundle: string;
    semanticMatch: string;
    connected: (name: string) => string;
    productAlt: (name: string, index: number) => string;
    platforms: Record<string, IntegrationPlatform>;
  };
  onboarding: {
    sectionAria: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    groupAria: string;
    ctaButton: string;
    categories: OnboardingCategory[];
  };
  footer: {
    tagline: string;
  };
}

const SCENARIO_SHARED = {
  isabella: {
    id: 'isabella',
    name: 'Isabella',
    color: '#FF786B',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    basePrice: 42,
    kitPrice: 105,
    cycleDuration: 15500,
    products: {
      p7: { id: 'p7', price: 42, img: '/images/crema_facial_2.jpg', z: 30, rotate: -2, x: '-15%', y: '-5%' },
      p8: { id: 'p8', price: 38, img: '/images/crema_facial_1.jpg', z: 20, rotate: 8, x: '15%', y: '30%' },
      p9: { id: 'p9', price: 25, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop', z: 40, rotate: -4, x: '35%', y: '5%' },
    },
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo',
    color: '#252A29',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    basePrice: 1728,
    kitPrice: 1728,
    cycleDuration: 26000,
    inlineProduct: { price: 85, img: '/images/molino_acero.jpg' },
    products: {
      p4: { id: 'p4', price: 85, img: '/images/molino_acero.jpg', z: 30, rotate: 1, x: '0%', y: '0%' },
      p5: { id: 'p5', price: 35, img: '/images/bascula_digital.jpg', z: 20, rotate: -3, x: '-20%', y: '25%' },
      p6: { id: 'p6', price: 24, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop', z: 40, rotate: 5, x: '30%', y: '20%' },
    },
  },
  sofia: {
    id: 'sofia',
    name: 'Sofía',
    color: '#FFB45E',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    basePrice: 45,
    kitPrice: 92,
    cycleDuration: 26000,
    inlineProduct: { price: 45, img: 'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?w=300&h=300&fit=crop' },
    products: {
      p1: { id: 'p1', price: 32, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop', z: 30, rotate: -2, x: '-10%', y: '5%' },
      p3: { id: 'p3', price: 15, img: '/images/sustrato_drenaje.jpg', z: 40, rotate: -5, x: '35%', y: '40%' },
    },
  },
} as const;

const LEDGER_SHARED = {
  unmet: {
    id: 'unmet',
    icon: TrendingUp,
    color: '#F5D86E',
    metricValue: '42%',
    img: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=400&fit=crop',
    chartData: [15, 22, 28, 45, 65, 80, 100],
  },
  b2b: {
    id: 'b2b',
    icon: Bell,
    color: '#FFB45E',
    metricValue: '$3,800',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=400&fit=crop',
    chartData: [5, 8, 12, 10, 50, 95],
  },
  cross: {
    id: 'cross',
    icon: Zap,
    color: '#FF786B',
    metricValue: '84%',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
    chartData: [60, 65, 62, 70, 78, 84, 85],
  },
};

const INTEGRATION_SHARED = {
  shopify: {
    id: 'shopify',
    color: '#FF786B',
    img: '/icons/shopify.svg',
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=250&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop',
    ],
  },
  woo: {
    id: 'woo',
    color: '#FFB45E',
    img: '/icons/woocommerce.svg',
    photos: [
      'https://images.unsplash.com/photo-1487798452839-c748a707a6b2?w=200&h=250&fit=crop',
      '/images/sustrato_drenaje.jpg',
    ],
  },
  magento: {
    id: 'magento',
    color: '#F5D86E',
    img: '/icons/magento.svg',
    photos: ['/images/molino_acero.jpg', '/images/bascula_digital.jpg'],
  },
  api: {
    id: 'api',
    color: '#252A29',
    img: '/icons/graphql.svg',
    photos: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=250&fit=crop',
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=200&h=250&fit=crop',
    ],
  },
};

const ONBOARDING_IMAGES = {
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop',
  home: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop',
  coffee: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop',
} as const;

export const content: Record<Lang, SiteContent> = {
  es: {
    meta: {
      title: 'Buscador inteligente para ecommerce 24/7 | Pomera',
      description:
        'Tu propio vendedor 24/7 en tu tienda online: conectado a tu catálogo para recomendar el producto ideal con stock real en Shopify o WooCommerce.',
    },
    nav: {
      cta: 'Integrar en mi tienda',
      langSwitcherLabel: 'Idioma',
    },
    hero: {
      sectionAria: 'Experiencia conversacional de recomendación',
      titleBefore: 'Buscador',
      titleHighlight: 'inteligente',
      titleAfter: 'para ecommerce',
      subtitleBefore: 'Tu propio vendedor',
      badge: '24/7',
      subtitleAfter: ', conectado a tu catálogo para recomendar el producto ideal.',
      scenarioNavAria: 'Cambiar escenario de demostración',
      viewScenario: (name) => `Ver escenario de ${name}`,
      cartPromptFallback: (count) => `¿Agrego los ${count} productos a tu carrito?`,
      cartReplyFallback: 'Sí, agrégalos.',
      cartSummaryFallback: (count) => `${count} productos agregados al carrito`,
      scenarios: {
        isabella: {
          ...SCENARIO_SHARED.isabella,
          theme: 'Cuidado Personal',
          request:
            'Últimamente siento la piel muy tensa y seca, mi crema habitual ya no me está hidratando suficiente.',
          aiResponse:
            'El cambio de clima exige hidratación en capas. Un sérum de ácido hialurónico antes de tu crema ayudará a retener el agua. Armé esta rutina para ti:',
          products: [
            { ...SCENARIO_SHARED.isabella.products.p7, name: 'Sérum Hialurónico' },
            { ...SCENARIO_SHARED.isabella.products.p8, name: 'Crema Barrera' },
            { ...SCENARIO_SHARED.isabella.products.p9, name: 'Limpiador Suave' },
          ],
          multiplier: '2.5x ticket',
          cartPrompt: '¿Agrego los 3 productos a tu carrito?',
          cartReply: 'Sí, arma mi rutina.',
          cartSummary: '3 productos agregados al carrito',
        },
        mateo: {
          ...SCENARIO_SHARED.mateo,
          theme: 'Café de especialidad',
          request:
            'Quería el Molino Comandante pero veo que está agotado, ¿tienen algo similar en acero?',
          aiResponse:
            'Vuelve en 2 semanas, pero nuestro Molino de Acero tiene el mismo ajuste micrométrico y stock inmediato.',
          inlineProduct: {
            ...SCENARIO_SHARED.mateo.inlineProduct,
            name: 'Molino de Acero',
            note: 'Stock inmediato',
          },
          followUp: {
            request:
              'Perfecto. Necesito 12 kits completos para mi equipo esta semana, ¿tienen stock y facturan?',
            aiResponse:
              'Tenemos 20 unidades listas de cada pieza con envío en 48 h y factura automática. Cada kit queda en $144:',
          },
          products: [
            { ...SCENARIO_SHARED.mateo.products.p4, name: 'Molino de Acero' },
            { ...SCENARIO_SHARED.mateo.products.p5, name: 'Báscula Digital' },
            { ...SCENARIO_SHARED.mateo.products.p6, name: 'Café Kenia Lavado' },
          ],
          multiplier: 'B2B · 12 kits',
          cartPrompt: '¿Agrego los 12 kits a tu carrito?',
          cartReply: 'Dale, súmalos al pedido.',
          cartSummary: '12 kits agregados al carrito',
        },
        sofia: {
          ...SCENARIO_SHARED.sofia,
          theme: 'Plantas y hogar',
          request:
            'Ya tengo la Maceta Terracota ($45) en mi carrito, ¿cuánto me falta para envío gratis?',
          aiResponse:
            'Te faltan $45 sobre tu Maceta Terracota para activar el envío gratis hoy mismo.',
          inlineProduct: {
            ...SCENARIO_SHARED.sofia.inlineProduct,
            name: 'Maceta Terracota',
            note: 'En tu carrito',
          },
          followUp: {
            request:
              'Genial, pero mi tope total son $100, ¿qué planta y tierra puedo sumar sin pasarme?',
            aiResponse:
              'Sumando la Zamioculcas ($32) y el Sustrato drenante ($15) cubres el envío gratis y queda lista en $92 totales:',
          },
          products: [
            { ...SCENARIO_SHARED.sofia.products.p1, name: 'Zamioculcas (ZZ)' },
            { ...SCENARIO_SHARED.sofia.products.p3, name: 'Sustrato Drenaje' },
          ],
          multiplier: 'Envío gratis',
          cartPrompt: '¿Agrego esos 2 productos a tu carrito?',
          cartReply: 'Perfecto, agrégalas.',
          cartSummary: '2 productos agregados al carrito',
        },
      },
    },
    discovery: {
      sectionAria: 'Descubrimiento inteligente por intención',
      titleBefore: 'Transformando catálogos estáticos en',
      titleHighlight: 'experiencias',
      titleAfter: 'de compra inteligentes.',
      groupAria: 'Seleccionar intención de compra',
      catalogMapping: 'Mapeo de catálogo',
      matches: 'Coincidencias',
      intents: [
        {
          id: 'wellness',
          label: 'Bienestar',
          quote: 'Necesito algo para relajarme antes de dormir...',
          tags: ['Intención: Relajación', 'Momento: Noche'],
          activeNodes: [5, 9, 10],
        },
        {
          id: 'fashion',
          label: 'Moda',
          quote: 'Tengo una boda en la playa y no quiero asarme...',
          tags: ['Evento: Formal', 'Clima: Cálido'],
          activeNodes: [2, 6, 12, 14],
        },
        {
          id: 'productivity',
          label: 'Productividad',
          quote: 'Me cuesta mucho concentrarme trabajando en casa...',
          tags: ['Objetivo: Enfoque', 'Entorno: Home Office'],
          activeNodes: [0, 3, 7, 15],
        },
      ],
    },
    comparison: {
      sectionAria: 'Comparativa entre búsqueda tradicional y Pomera',
      titleBefore: 'Ayuda a tus clientes a encontrar los',
      titleHighlight: 'productos correctos, más rápido.',
      subtitle:
        'Reduce la fricción entre la intención y el carrito de compras mediante una experiencia de descubrimiento contextual.',
      traditionalLabel: 'Búsqueda Tradicional',
      slowBadge: 'Lenta',
      traditionalQuery: 'crema hidratante para invierno...',
      traditionalCaption: 'Resultados abrumadores, filtros manuales y alta fricción.',
      instantBadge: 'Instantánea',
      pomeraQuery: 'Tengo la piel muy seca por el frío...',
      exactMatch: 'Solución Exacta',
      kitTitle: 'Kit Hidratación Profunda',
      kitSubtitle: 'Sérum + Crema Barrera',
      pomeraCaption: 'Descubrimiento contextual y recomendaciones listas para comprar.',
    },
    ledger: {
      sectionAria: 'Inteligencia de negocio extraída en tiempo real',
      titleBefore: 'Las conversaciones',
      titleHighlight: 'estructuran',
      titleAfter: 'tu negocio.',
      subtitle:
        'El asistente no solo vende; extrae inteligencia de negocio de cada chat en tiempo real. Descubre lo que tus clientes realmente buscan.',
      navAria: 'Seleccionar ejemplo de conversación',
      viewExample: (title) => `Ver ejemplo: ${title}`,
      extractedConcept: 'Concepto Extraído',
      entries: [
        {
          ...LEDGER_SHARED.unmet,
          category: 'Demanda Latente',
          chat: [
            { text: 'Buscando algo para el frío...', active: false },
            { text: 'Tengo la piel muy seca por el clima.', active: true },
            { text: '¿Tienen cremas ultra hidratantes?', active: false },
          ],
          highlighted: 'piel muy seca por el clima',
          extracted: 'Problemas de hidratación invernal',
          metricTitle: 'Incidencia en chats (7 días)',
          action: 'Sugerir nueva línea de cuidado intensivo',
        },
        {
          ...LEDGER_SHARED.b2b,
          category: 'Oportunidad B2B',
          chat: [
            { text: 'Hola, busco detalles para mis empleados.', active: false },
            { text: 'Necesito 40 kits de regalo para fin de año.', active: true },
            { text: '¿Manejan envíos a múltiples oficinas?', active: false },
          ],
          highlighted: '40 kits de regalo',
          extracted: 'Solicitud de compras al por mayor',
          metricTitle: 'Valor Potencial Detectado',
          action: 'Redirigir a ejecutivo VIP',
        },
        {
          ...LEDGER_SHARED.cross,
          category: 'Patrón Cross-sell',
          chat: [
            { text: 'Quiero comprar una buena cafetera.', active: false },
            { text: 'Y algo para medir el café exactamente.', active: true },
            { text: 'Recomiéndame una báscula precisa.', active: false },
          ],
          highlighted: 'medir el café exactamente',
          extracted: 'Match Frecuente: Cafetera + Báscula',
          metricTitle: 'Tasa de Conversión (Bundle)',
          action: "Crear 'Kit Barista' en catálogo",
        },
      ],
    },
    integrations: {
      sectionAria: 'Integración con plataformas de ecommerce',
      titleBefore: 'Conecta tu catálogo en',
      titleHighlight: 'minutos.',
      titleAfter: 'Empieza a vender mejor.',
      subtitle:
        'Pomera procesa tu inventario, variables y contexto de forma nativa sin interrumpir la operación de tu tienda.',
      groupAria: 'Seleccionar plataforma',
      rawCatalog: 'Catálogo Bruto',
      aiIntelligence: 'Inteligencia AI',
      recommendedBundle: 'Bundle Recomendado',
      semanticMatch: 'Match Semántico',
      connected: (name) => `${name} conectado`,
      productAlt: (name, index) => `${name} producto ${index}`,
      platforms: {
        shopify: {
          ...INTEGRATION_SHARED.shopify,
          name: 'Shopify',
          tag: '1-Click App',
          metrics: { products: '12.4K', syncTime: '45s' },
        },
        woo: {
          ...INTEGRATION_SHARED.woo,
          name: 'WooCommerce',
          tag: 'Native Plugin',
          metrics: { products: '3.2K', syncTime: '18s' },
        },
        magento: {
          ...INTEGRATION_SHARED.magento,
          name: 'Magento / VTEX',
          tag: 'Enterprise API',
          metrics: { products: '85.1K', syncTime: '3m 12s' },
        },
        api: {
          ...INTEGRATION_SHARED.api,
          name: 'Tienda a medida',
          tag: 'REST API / GraphQL',
          metrics: { products: 'Tiempo real', syncTime: '12ms' },
        },
      },
    },
    onboarding: {
      sectionAria: 'Comenzar integración por sector',
      titleBefore: 'Prepara tu tienda para',
      titleHighlight: 'entender',
      titleAfter: 'mejor.',
      subtitle:
        'Selecciona tu sector principal y descubre cómo Pomera se adapta a tu catálogo.',
      groupAria: 'Seleccionar sector principal',
      ctaButton: 'Comenzar Integración',
      categories: [
        { id: 'fashion', label: 'Moda', img: ONBOARDING_IMAGES.fashion },
        { id: 'home', label: 'Hogar y Decoración', img: ONBOARDING_IMAGES.home },
        { id: 'coffee', label: 'Café y Gourmet', img: ONBOARDING_IMAGES.coffee },
        { id: 'beauty', label: 'Belleza', img: ONBOARDING_IMAGES.beauty },
      ],
    },
    footer: {
      tagline: 'Redefiniendo el descubrimiento de productos.',
    },
  },
  en: {
    meta: {
      title: 'AI-powered ecommerce search, 24/7 | Pomera',
      description:
        'Your own 24/7 salesperson in your online store: connected to your catalog to recommend the perfect product with real stock on Shopify or WooCommerce.',
    },
    nav: {
      cta: 'Add to my store',
      langSwitcherLabel: 'Language',
    },
    hero: {
      sectionAria: 'Conversational product recommendation experience',
      titleBefore: '',
      titleHighlight: 'Smart',
      titleAfter: 'search for ecommerce',
      subtitleBefore: 'Your own',
      badge: '24/7',
      subtitleAfter: ' salesperson, connected to your catalog to recommend the perfect product.',
      scenarioNavAria: 'Switch demo scenario',
      viewScenario: (name) => `View ${name}'s scenario`,
      cartPromptFallback: (count) => `Add all ${count} items to your cart?`,
      cartReplyFallback: 'Yes, add them.',
      cartSummaryFallback: (count) => `${count} items added to cart`,
      scenarios: {
        isabella: {
          ...SCENARIO_SHARED.isabella,
          theme: 'Skincare',
          request:
            "Lately my skin feels super tight and dry—my usual cream isn't hydrating enough anymore.",
          aiResponse:
            'Seasonal shifts call for layered hydration. Applying a hyaluronic acid serum before your cream locks in moisture. I built this routine for you:',
          products: [
            { ...SCENARIO_SHARED.isabella.products.p7, name: 'Hyaluronic Serum' },
            { ...SCENARIO_SHARED.isabella.products.p8, name: 'Barrier Cream' },
            { ...SCENARIO_SHARED.isabella.products.p9, name: 'Gentle Cleanser' },
          ],
          multiplier: '2.5x AOV',
          cartPrompt: 'Add all 3 products to your cart?',
          cartReply: 'Yes, build my routine.',
          cartSummary: '3 items added to cart',
        },
        mateo: {
          ...SCENARIO_SHARED.mateo,
          theme: 'Specialty Coffee',
          request:
            "I wanted the Comandante Grinder, but I see it's sold out. Do you have anything similar in steel?",
          aiResponse:
            "It's back in 2 weeks, but our Steel Burr Grinder offers the same micro-step adjustment and ships today.",
          inlineProduct: {
            ...SCENARIO_SHARED.mateo.inlineProduct,
            name: 'Steel Burr Grinder',
            note: 'In stock now',
          },
          followUp: {
            request:
              'Great. I need 12 complete kits for my team this week—do you have stock and issue invoices?',
            aiResponse:
              'We have 20 units of every item ready to ship within 48h with automatic invoicing. Each kit comes out to $144:',
          },
          products: [
            { ...SCENARIO_SHARED.mateo.products.p4, name: 'Steel Burr Grinder' },
            { ...SCENARIO_SHARED.mateo.products.p5, name: 'Digital Scale' },
            { ...SCENARIO_SHARED.mateo.products.p6, name: 'Washed Kenya Coffee' },
          ],
          multiplier: 'B2B · 12 kits',
          cartPrompt: 'Add all 12 kits to your cart?',
          cartReply: 'Sounds good, add them.',
          cartSummary: '12 kits added to cart',
        },
        sofia: {
          ...SCENARIO_SHARED.sofia,
          theme: 'Plants & Home',
          request:
            'I already have the Terracotta Pot ($45) in my cart—how much more do I need for free shipping?',
          aiResponse:
            "You're $45 away from unlocking free shipping today on top of your Terracotta Pot.",
          inlineProduct: {
            ...SCENARIO_SHARED.sofia.inlineProduct,
            name: 'Terracotta Pot',
            note: 'In your cart',
          },
          followUp: {
            request:
              'Nice, though my budget cap is $100 total. Which plant and soil can I add without going over?',
            aiResponse:
              'Adding the ZZ Plant ($32) and Draining Soil Mix ($15) unlocks free shipping and brings your total to $92:',
          },
          products: [
            { ...SCENARIO_SHARED.sofia.products.p1, name: 'ZZ Plant' },
            { ...SCENARIO_SHARED.sofia.products.p3, name: 'Draining Soil Mix' },
          ],
          multiplier: 'Free shipping',
          cartPrompt: 'Add those 2 items to your cart?',
          cartReply: 'Perfect, add them.',
          cartSummary: '2 items added to cart',
        },
      },
    },
    discovery: {
      sectionAria: 'Intent-based smart discovery',
      titleBefore: 'Turning static catalogs into smart',
      titleHighlight: 'shopping',
      titleAfter: 'experiences.',
      groupAria: 'Select shopping intent',
      catalogMapping: 'Catalog mapping',
      matches: 'Matches',
      intents: [
        {
          id: 'wellness',
          label: 'Wellness',
          quote: 'I need something to help me unwind before bed...',
          tags: ['Intent: Relaxation', 'Moment: Night'],
          activeNodes: [5, 9, 10],
        },
        {
          id: 'fashion',
          label: 'Fashion',
          quote: "I have a beach wedding coming up and don't want to overheat...",
          tags: ['Event: Formal', 'Weather: Warm'],
          activeNodes: [2, 6, 12, 14],
        },
        {
          id: 'productivity',
          label: 'Productivity',
          quote: "I'm having a really hard time focusing while working from home...",
          tags: ['Goal: Focus', 'Setting: Home Office'],
          activeNodes: [0, 3, 7, 15],
        },
      ],
    },
    comparison: {
      sectionAria: 'Comparison between traditional search and Pomera',
      titleBefore: 'Help customers find the',
      titleHighlight: 'right products, faster.',
      subtitle:
        'Reduce friction between intent and the shopping cart through a contextual discovery experience.',
      traditionalLabel: 'Traditional Search',
      slowBadge: 'Slow',
      traditionalQuery: 'winter moisturizing cream...',
      traditionalCaption: 'Overwhelming results, manual filters, and high friction.',
      instantBadge: 'Instant',
      pomeraQuery: 'My skin gets really dry in the cold...',
      exactMatch: 'Exact Match',
      kitTitle: 'Deep Hydration Kit',
      kitSubtitle: 'Serum + Barrier Cream',
      pomeraCaption: 'Contextual discovery and shoppable recommendations.',
    },
    ledger: {
      sectionAria: 'Real-time extracted business intelligence',
      titleBefore: 'Conversations',
      titleHighlight: 'structure',
      titleAfter: 'your business.',
      subtitle:
        "The assistant doesn't just sell—it extracts real-time business intelligence from every chat. Discover what your customers are truly looking for.",
      navAria: 'Select conversation example',
      viewExample: (title) => `View example: ${title}`,
      extractedConcept: 'Extracted Insight',
      entries: [
        {
          ...LEDGER_SHARED.unmet,
          category: 'Unmet Demand',
          chat: [
            { text: 'Looking for something for the cold...', active: false },
            { text: 'My skin feels very dry from the weather.', active: true },
            { text: 'Do you have ultra-hydrating creams?', active: false },
          ],
          highlighted: 'very dry from the weather',
          extracted: 'Winter hydration challenges',
          metricTitle: 'Chat incidence (7 days)',
          action: 'Suggest new intensive care line',
        },
        {
          ...LEDGER_SHARED.b2b,
          category: 'B2B Opportunity',
          chat: [
            { text: "Hi, I'm looking for gifts for my team.", active: false },
            { text: 'I need 40 gift kits for the end of the year.', active: true },
            { text: 'Do you handle shipping to multiple offices?', active: false },
          ],
          highlighted: '40 gift kits',
          extracted: 'Wholesale purchase request',
          metricTitle: 'Detected Potential Value',
          action: 'Route to VIP account lead',
        },
        {
          ...LEDGER_SHARED.cross,
          category: 'Cross-sell Pattern',
          chat: [
            { text: 'I want to buy a good coffee maker.', active: false },
            { text: 'And something to measure coffee precisely.', active: true },
            { text: 'Recommend an accurate scale.', active: false },
          ],
          highlighted: 'measure coffee precisely',
          extracted: 'Frequent Pair: Coffee Maker + Scale',
          metricTitle: 'Bundle Conversion Rate',
          action: "Create 'Barista Kit' in catalog",
        },
      ],
    },
    integrations: {
      sectionAria: 'Ecommerce platform integrations',
      titleBefore: 'Connect your catalog in',
      titleHighlight: 'minutes.',
      titleAfter: 'Start selling better.',
      subtitle:
        "Pomera natively processes your inventory, variants, and context without interrupting your store's operations.",
      groupAria: 'Select platform',
      rawCatalog: 'Raw Catalog',
      aiIntelligence: 'AI Intelligence',
      recommendedBundle: 'Recommended Bundle',
      semanticMatch: 'Semantic Match',
      connected: (name) => `${name} connected`,
      productAlt: (name, index) => `${name} product ${index}`,
      platforms: {
        shopify: {
          ...INTEGRATION_SHARED.shopify,
          name: 'Shopify',
          tag: '1-Click App',
          metrics: { products: '12.4K', syncTime: '45s' },
        },
        woo: {
          ...INTEGRATION_SHARED.woo,
          name: 'WooCommerce',
          tag: 'Native Plugin',
          metrics: { products: '3.2K', syncTime: '18s' },
        },
        magento: {
          ...INTEGRATION_SHARED.magento,
          name: 'Magento / VTEX',
          tag: 'Enterprise API',
          metrics: { products: '85.1K', syncTime: '3m 12s' },
        },
        api: {
          ...INTEGRATION_SHARED.api,
          name: 'Custom Store',
          tag: 'REST API / GraphQL',
          metrics: { products: 'Real-time', syncTime: '12ms' },
        },
      },
    },
    onboarding: {
      sectionAria: 'Start integration by industry',
      titleBefore: 'Get your store ready to',
      titleHighlight: 'understand',
      titleAfter: 'better.',
      subtitle:
        'Select your main industry and see how Pomera adapts to your catalog.',
      groupAria: 'Select main industry',
      ctaButton: 'Start Integration',
      categories: [
        { id: 'fashion', label: 'Fashion', img: ONBOARDING_IMAGES.fashion },
        { id: 'home', label: 'Home & Decor', img: ONBOARDING_IMAGES.home },
        { id: 'coffee', label: 'Coffee & Gourmet', img: ONBOARDING_IMAGES.coffee },
        { id: 'beauty', label: 'Beauty', img: ONBOARDING_IMAGES.beauty },
      ],
    },
    footer: {
      tagline: 'Redefining product discovery.',
    },
  },
};
