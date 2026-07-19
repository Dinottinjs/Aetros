import { stripe } from '@/utils/stripe/config';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return new NextResponse('Webhook secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === 'subscription') {
          const subscriptionId = checkoutSession.subscription;
          const userId = checkoutSession.client_reference_id || checkoutSession.metadata?.user_id;

          if (userId && subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId as string) as any;
            
            await supabase.from('subscriptions').upsert({
              id: subscription.id,
              user_id: userId,
              stripe_customer_id: subscription.customer as string,
              stripe_price_id: subscription.items.data[0].price.id,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            });
          }
        }
        break;
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as any;
        
        await supabase.from('subscriptions').update({
          status: subscription.status,
          stripe_price_id: subscription.items.data[0].price.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq('id', subscription.id);
        
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Database Sync Error:', error);
    return new NextResponse('Database Sync Error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
