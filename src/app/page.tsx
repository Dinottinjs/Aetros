'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for side projects and small startups.',
    features: ['Up to 1,000 users', 'Basic analytics', 'Community support'],
    priceId: 'price_starter_placeholder', // replace with actual Stripe price ID
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Ideal for growing businesses needing more power.',
    features: ['Up to 10,000 users', 'Advanced analytics', 'Priority email support', 'Custom domain'],
    priceId: 'price_pro_placeholder',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large scale applications with dedicated support.',
    features: ['Unlimited users', 'Custom reporting', '24/7 phone support', 'SLA guaranteed'],
    priceId: 'price_enterprise_placeholder',
  },
];

const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Simply choose a plan above and create an account. You can upgrade or downgrade at any time.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time from your billing dashboard.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'We currently do not offer a free trial, but we have a 14-day money-back guarantee.',
  },
];

export default function Home() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingPriceId(priceId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Checkout error. Please check console or make sure you are logged in.');
      }
    } catch (error) {
      console.error('Checkout request failed', error);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold tracking-tighter">Aetros</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container relative mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm text-slate-300 backdrop-blur-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
              v1.0 is now live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Build SaaS Faster.<br />Zero Errors.
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-400 sm:text-xl sm:leading-8 mb-10">
              Aetros is the ultimate Boilerplate with Next.js App Router, Supabase Auth & Database, TailwindCSS, and Stripe Billing. Start your next big idea today.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'})}>
                Get Started <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-900/50 border-t border-slate-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Choose the perfect plan for your needs. Upgrade or downgrade at any time.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`bg-slate-900 border-slate-800 flex flex-col ${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">/month</span>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                      onClick={() => handleCheckout(plan.priceId)}
                      disabled={loadingPriceId === plan.priceId}
                    >
                      {loadingPriceId === plan.priceId ? 'Processing...' : 'Subscribe'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-800 pb-8">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-slate-400 text-sm">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Zap className="h-5 w-5 text-indigo-500" />
            <span className="font-semibold text-slate-300">Aetros Boilerplate</span>
          </div>
          <p>© {new Date().getFullYear()} Aetros. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
