import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const nodeEnv = process.env.NODE_ENV;

    return NextResponse.json({
      status: 'ok',
      environment: {
        NODE_ENV: nodeEnv,
        NEXT_PUBLIC_BASE_URL: baseUrl,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: stripePublicKey ? '✓ Configurada' : '✗ No configurada',
        STRIPE_SECRET_KEY: stripeSecretKey ? '✓ Configurada' : '✗ No configurada',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error en endpoint de debug:', error);
    return NextResponse.json(
      { error: 'Error al obtener información de debug' },
      { status: 500 }
    );
  }
}
