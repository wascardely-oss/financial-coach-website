import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// GET: Obtener todas las suscripciones
export async function GET(request: NextRequest) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
    });

    return NextResponse.json({
      success: true,
      data: subscriptions.data,
      total: subscriptions.data.length,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener suscripciones' },
      { status: 500 }
    );
  }
}

// POST: Crear nueva suscripción
export async function POST(request: NextRequest) {
  try {
    const { customerId, planId } = await request.json();

    if (!customerId || !planId) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: planId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    return NextResponse.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al crear suscripción' },
      { status: 500 }
    );
  }
}
