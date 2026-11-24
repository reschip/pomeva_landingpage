import React, { createContext, useContext, useEffect, useState } from 'react';
import { content, type Lang, type SiteContent } from './content';

export type { Lang, SiteContent };

const STORAGE_KEY = 'pomera-lang';

function resolveInitialLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
    if (param === 'es' || param === 'en') {
      return param;
    }
  } catch {
    // Ignore URL parsing errors
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore localStorage access errors
  }

  try {
    if (navigator.language?.toLowerCase().startsWith('en')) {
      return 'en';
    }
  } catch {
    // Ignore navigator errors
  }

  return 'es';
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: SiteContent;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(resolveInitialLang);
  const t = content[lang];

  const setLang = (nextLang: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore localStorage write errors
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState(window.history.state, '', url.toString());
    } catch {
      // Ignore history API errors
    }

    setLangState(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.meta.description);
    }
  }, [lang, t.meta.title, t.meta.description]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
