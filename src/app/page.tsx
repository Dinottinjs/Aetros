'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Shield, CreditCard, LayoutDashboard, CheckCircle2, Globe2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [ibanModalOpen, setIbanModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-indigo-500 animate-pulse" />
            <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Aetros
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-full border border-white/10">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${language === 'en' ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
              >
                🇬🇧
              </button>
              <button 
                onClick={() => setLanguage('de')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${language === 'de' ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
              >
                🇩🇪
              </button>
            </div>
            
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] text-white">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 pt-32 pb-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v0.1.0 Released
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                {t.getStarted}
              </Button>
            </Link>
            <Link href="https://github.com/Dinottinjs/Aetros" target="_blank">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm">
                {t.viewGithub}
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 py-24 border-t border-white/5 relative z-10 bg-slate-950/50 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {t.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.3)] group">
              <Shield className="h-10 w-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-semibold mb-2">{t.featureAuth}</h3>
              <p className="text-slate-400">{t.featureAuthDesc}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] group">
              <CreditCard className="h-10 w-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-semibold mb-2">{t.featurePay}</h3>
              <p className="text-slate-400">{t.featurePayDesc}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.3)] group">
              <LayoutDashboard className="h-10 w-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-semibold mb-2">{t.featureUI}</h3>
              <p className="text-slate-400">{t.featureUIDesc}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-5xl mx-auto px-4 py-24 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {t.pricingTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-2">{t.priceStarter}</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500" /> 100 Users
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500" /> Basic Support
                </li>
              </ul>
              <form action="/api/stripe/checkout" method="POST">
                <input type="hidden" name="priceId" value="price_1Hh1" />
                <Button type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all">
                  {t.subscribe}
                </Button>
              </form>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 backdrop-blur-sm relative shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.4)] transition-all duration-500">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-indigo-600 text-xs font-semibold rounded-full text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t.pricePro}</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" /> Unlimited Users
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" /> Priority Support
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" /> Custom Analytics
                </li>
              </ul>
              <div className="space-y-3">
                <form action="/api/stripe/checkout" method="POST">
                  <input type="hidden" name="priceId" value="price_1Hh2" />
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
                    {t.subscribe}
                  </Button>
                </form>
                <Button 
                  variant="outline" 
                  onClick={() => setIbanModalOpen(true)}
                  className="w-full border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-all"
                >
                  {t.subscribeBank}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* IBAN Dialog */}
      <Dialog open={ibanModalOpen} onOpenChange={setIbanModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-50 sm:max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Globe2 className="h-5 w-5 text-indigo-500" />
              {t.bankDialogTitle}
            </DialogTitle>
            <DialogDescription className="text-slate-400 pt-2">
              {t.bankDialogDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-slate-950 rounded-lg border border-white/5 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.bankAccountHolder}</span>
              <span className="text-lg font-semibold text-white">{t.bankAccountName}</span>
            </div>
            <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/30 flex flex-col gap-1 relative group cursor-copy" onClick={() => navigator.clipboard.writeText(t.bankIbanValue)}>
              <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">{t.bankIbanLabel}</span>
              <span className="text-xl font-mono text-white tracking-widest">{t.bankIbanValue}</span>
              <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Copy</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-amber-500/80 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>Please include your registered email address in the transfer purpose field.</p>
            </div>
          </div>
          <Button onClick={() => setIbanModalOpen(false)} className="w-full bg-slate-800 hover:bg-slate-700 text-white">
            {t.bankClose}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
