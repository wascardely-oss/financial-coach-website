import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Validar que la clave secreta de Stripe esté configurada
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('STRIPE_SECRET_KEY no está configurada');
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-04-10',
});

export async function POST(request: NextRequest) {
  try {
    // Validar que Stripe esté configurado
    if (!stripeSecretKey) {
      console.error('Error: STRIPE_SECRET_KEY no está configurada');
      return NextResponse.json(
        { error: 'Stripe no está configurado correctamente' },
        { status: 500 }
      );
    }

    const { planName, planPrice, planDescription } = await request.json();

    // Validar datos
    if (!planName || !planPrice) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    console.log(`Creando sesión de Stripe para plan: ${planName}, precio: ${planPrice}`);

    // Crear sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Financial Coach - Plan ${planName.charAt(0).toUpperCase() + planName.slice(1)}`,
              description: planDescription,
            },
            unit_amount: Math.round(planPrice * 100), // Convertir a centavos
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://financial-coach-website.onrender.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://financial-coach-website.onrender.com'}/cancel`,
    });

    console.log(`Sesión de Stripe creada exitosamente: ${session.id}`);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error);
    
    // Proporcionar más detalles sobre el error
    let errorMessage = 'Error al crear sesión de pago';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', error.message);
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
