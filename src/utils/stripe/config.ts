import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_dummy',
  {
    apiVersion: '2026-06-24.dahlia', // Use the latest stable Stripe API version
    appInfo: {
      name: 'Aetros Boilerplate',
      version: '1.0.0',
    },
  }
);
