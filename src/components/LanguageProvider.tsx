'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'de';

const dictionaries = {
  en: {
    heroTitle: 'Generate Content. Free & Account-less.',
    heroSubtitle: 'Experience the full power of our generative AI tools directly in your browser. No sign-up required, no subscriptions.',
    getStarted: 'Generate for free',
    viewGithub: 'View GitHub',
    featuresTitle: 'Why Account-less?',
    featureAuth: 'Maximum Privacy',
    featureAuthDesc: 'Your data stays in your browser. We don\'t store your email or track your usage across sessions.',
    featurePay: '100% Free',
    featurePayDesc: 'No credit card required. Generate content without worrying about hidden subscription fees.',
    featureUI: 'Instant Access',
    featureUIDesc: 'Jump straight into the workspace. Eliminate friction and start creating in seconds.',
    ctaTitle: 'Ready to build?',
    ctaLaunch: 'Launch Workspace',
  },
  de: {
    heroTitle: 'Generiere Inhalte. Kostenlos & Ohne Account.',
    heroSubtitle: 'Erlebe die volle Power unserer generativen KI-Tools direkt in deinem Browser. Keine Anmeldung nötig, keine Abos.',
    getStarted: 'Kostenlos generieren',
    viewGithub: 'Auf GitHub ansehen',
    featuresTitle: 'Warum ohne Account?',
    featureAuth: 'Maximale Privatsphäre',
    featureAuthDesc: 'Deine Daten bleiben in deinem Browser. Wir speichern keine E-Mail-Adressen und tracken dich nicht.',
    featurePay: '100% Kostenlos',
    featurePayDesc: 'Keine Kreditkarte erforderlich. Generiere Inhalte ohne versteckte Abo-Gebühren.',
    featureUI: 'Sofortiger Zugriff',
    featureUIDesc: 'Spring direkt in den Workspace. Keine Hürden, starte in Sekunden mit der Erstellung.',
    ctaTitle: 'Bereit zu starten?',
    ctaLaunch: 'Workspace starten',
  }
};

type Dictionary = typeof dictionaries['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('aetros_lang') as Language;
    if (stored && (stored === 'en' || stored === 'de')) {
      setLanguageState(stored);
    } else {
      const browserLang = navigator.language.startsWith('de') ? 'de' : 'en';
      setLanguageState(browserLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aetros_lang', lang);
  };

  // Avoid hydration mismatch by rendering default EN until mounted
  const t = mounted ? dictionaries[language] : dictionaries['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
