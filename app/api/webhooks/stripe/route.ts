import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Manejar diferentes tipos de eventos
  switch (event.type) {
    case 'customer.subscription.created':
      console.log('✅ Suscripción creada:', event.data.object);
      // Aquí puedes guardar la suscripción en tu base de datos
      break;

    case 'customer.subscription.updated':
      console.log('✅ Suscripción actualizada:', event.data.object);
      break;

    case 'customer.subscription.deleted':
      console.log('✅ Suscripción cancelada:', event.data.object);
      break;

    case 'invoice.payment_succeeded':
      console.log('✅ Pago exitoso:', event.data.object);
      break;

    case 'invoice.payment_failed':
      console.log('❌ Pago fallido:', event.data.object);
      break;

    default:
      console.log('Evento no manejado:', event.type);
  }

  return NextResponse.json({ received: true });
}
