'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { languages, type Lang } from '@/lib/i18n/translations';

export default function LangSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  function select(l: Lang) {
    setLang(l);
    setOpen(false);
  }

  return (
    <div className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{languages[lang].flag}</span>
        <span>{lang.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] bg-white border border-neutral-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50"
        >
          {(Object.entries(languages) as [Lang, { label: string; flag: string }][]).map(([code, info]) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button
                onClick={() => select(code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-left
                  ${lang === code ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}`}
              >
                <span>{info.flag}</span>
                <span>{info.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
