import React, { useState, useEffect } from 'react';
import { EditorialHero } from './src/components/EditorialHero';
import { EditorialDiscovery } from './src/components/EditorialDiscovery';
import { EditorialComparison } from './src/components/EditorialComparison';
import { EditorialLedger } from './src/components/EditorialLedger';
import { EditorialIntegrations } from './src/components/EditorialIntegrations';
import { EditorialOnboarding } from './src/components/EditorialOnboarding';
import { PomeloIcon } from './src/components/PomeloIcon';
import { useLanguage, type Lang } from './src/i18n/LanguageContext';
export { PomeloIcon };

const LANGUAGES: readonly Lang[] = ['es', 'en'];

export default function App() {
  const { lang, setLang, t } = useLanguage();
  const [activeProfileId, setActiveProfileId] = useState('isabella');
  const [chatStep, setChatStep] = useState(1);
  const [activeIntentIndex, setActiveIntentIndex] = useState(0);
  const [ledgerIndex, setLedgerIndex] = useState(0);
  const [activeIntegrationId, setActiveIntegrationId] = useState('shopify');
  const [ctaCategory, setCtaCategory] = useState('fashion');

  const scenarios = t.hero.scenarios;
  const discoveryIntents = t.discovery.intents;
  const ledgerData = t.ledger.entries;
  const integrationData = t.integrations.platforms;
  const ctaCategories = t.onboarding.categories;

  useEffect(() => {
    setChatStep(1);
    const t2 = setTimeout(() => setChatStep(2), 1100);
    const t3 = setTimeout(() => setChatStep(3), 2600);
    const t4 = setTimeout(() => setChatStep(4), 3200);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [activeProfileId]);

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
    // scenarios keys and cycleDuration are identical across languages; keep active timer steady on language toggle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIntentIndex((prev) => (prev + 1) % discoveryIntents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [discoveryIntents.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLedgerIndex((prev) => (prev + 1) % ledgerData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [ledgerData.length]);

  const scrollToIntegrar = () => {
    const el = document.getElementById('integrar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F4E9] text-[#252A29] font-citrus-sans overflow-x-hidden">
      {/* 1. NAVBAR (clean, simple, rounded button, zero borders) */}
      <header className="fixed top-0 w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-5 lg:py-6 flex justify-between items-center gap-2 z-50 bg-[#F9F4E9]/95 backdrop-blur-sm">
        <a
          href="#"
          className="font-citrus-display font-bold tracking-[-0.025em] text-base sm:text-lg text-[#252A29] flex items-center gap-2 sm:gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF786B] rounded-full"
        >
          <PomeloIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          <span>Pomera</span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label={t.nav.langSwitcherLabel}
            className="inline-flex items-center bg-[#F2EAD8] rounded-full p-0.5 sm:p-1"
          >
            {LANGUAGES.map((code) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  lang={code}
                  aria-pressed={isActive}
                  onClick={() => setLang(code)}
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF786B] ${
                    isActive
                      ? 'bg-[#252A29] text-[#F9F4E9]'
                      : 'text-[#555D5B] hover:text-[#252A29]'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollToIntegrar}
            className="bg-[#252A29] text-[#F9F4E9] hover:bg-[#FF786B] hover:text-[#252A29] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] tracking-[0.04em] font-semibold whitespace-nowrap transition-all duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF786B]"
          >
            {t.nav.cta}
          </button>
        </div>
      </header>

      {/* 2. HERO EXPERIENCE */}
      <EditorialHero
        scenarios={scenarios}
        activeProfileId={activeProfileId}
        setActiveProfileId={setActiveProfileId}
        chatStep={chatStep}
      />

      {/* 3. VISUAL DISCOVERY PLATFORM */}
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
      <footer className="bg-[#F9F4E9] pt-20 pb-16 sm:pt-24 sm:pb-20 px-6 lg:px-12 text-center font-citrus-sans">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <PomeloIcon className="w-7 h-7" />
          <span className="font-citrus-display font-bold tracking-[-0.025em] text-lg text-[#252A29]">
            Pomera
          </span>
        </div>
        <p className="text-[#555D5B] text-[13px] font-normal">
          © {new Date().getFullYear()} Pomera · ispomera.com — {t.footer.tagline}
        </p>
      </footer>
    </div>
  );
}
