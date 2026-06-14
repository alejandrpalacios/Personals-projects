'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { defaultLang, t as translate, type Lang, type TranslationKey } from '@/lib/i18n/translations';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: defaultLang,
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  // Lee el idioma guardado al montar
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && ['en', 'es', 'fr'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  }

  const tFn = (key: TranslationKey) => translate(lang, key);

  return (
    <LangContext.Provider value={{ lang, setLang, t: tFn }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
