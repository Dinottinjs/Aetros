'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'de';

const dictionaries = {
  en: {
    heroTitle: 'Deploy Your SaaS in Minutes',
    heroSubtitle: 'The ultimate zero-error boilerplate for Next.js, Supabase, and Stripe. Built for scale and speed.',
    getStarted: 'Get Started',
    viewGithub: 'View on GitHub',
    featuresTitle: 'Everything you need',
    featureAuth: 'Authentication',
    featureAuthDesc: 'Secure user login and management powered by Supabase.',
    featurePay: 'Payments',
    featurePayDesc: 'Fully integrated Stripe checkout and webhook handling.',
    featureUI: 'Premium UI',
    featureUIDesc: 'Beautiful components using TailwindCSS and Shadcn/ui.',
    pricingTitle: 'Simple Pricing',
    priceStarter: 'Starter',
    pricePro: 'Pro',
    subscribe: 'Subscribe via Stripe',
    subscribeBank: 'Buy via Bank Transfer (IBAN)',
    bankDialogTitle: 'Bank Transfer Details',
    bankDialogDesc: 'Please transfer the exact amount to the following IBAN to activate your subscription.',
    bankIbanLabel: 'IBAN',
    bankIbanValue: 'AT053947900000077446',
    bankAccountHolder: 'Account Holder',
    bankAccountName: 'Aetros SaaS',
    bankClose: 'Close',
  },
  de: {
    heroTitle: 'Starte dein SaaS in Minuten',
    heroSubtitle: 'Die ultimative Zero-Error Boilerplate für Next.js, Supabase und Stripe. Gebaut für Skalierung und Geschwindigkeit.',
    getStarted: 'Jetzt Starten',
    viewGithub: 'Auf GitHub ansehen',
    featuresTitle: 'Alles, was du brauchst',
    featureAuth: 'Authentifizierung',
    featureAuthDesc: 'Sicherer Login und Nutzerverwaltung, angetrieben von Supabase.',
    featurePay: 'Zahlungen',
    featurePayDesc: 'Vollständig integrierter Stripe Checkout und Webhook-Verarbeitung.',
    featureUI: 'Premium UI',
    featureUIDesc: 'Wunderschöne Komponenten mit TailwindCSS und Shadcn/ui.',
    pricingTitle: 'Einfache Preise',
    priceStarter: 'Starter',
    pricePro: 'Pro',
    subscribe: 'Mit Stripe abonnieren',
    subscribeBank: 'Per Banküberweisung (IBAN) kaufen',
    bankDialogTitle: 'Details zur Banküberweisung',
    bankDialogDesc: 'Bitte überweise den genauen Betrag auf die folgende IBAN, um dein Abonnement zu aktivieren.',
    bankIbanLabel: 'IBAN',
    bankIbanValue: 'AT053947900000077446',
    bankAccountHolder: 'Kontoinhaber',
    bankAccountName: 'Aetros SaaS',
    bankClose: 'Schließen',
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
