'use client';

import { useState } from 'react';

interface SubscriptionButtonProps {
  planName: 'pro' | 'premium';
  planPrice: number;
  planDescription: string;
}

export default function SubscriptionButton({
  planName,
  planPrice,
  planDescription,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Crear sesión de checkout en el servidor
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          planPrice,
          planDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear sesión de pago');
      }

      const { sessionId } = await response.json();

      // 2. Redirigir a Stripe Checkout usando la URL de sesión
      // Construir la URL de Stripe Checkout directamente
      const checkoutUrl = `https://checkout.stripe.com/pay/${sessionId}`;
      
      // Redirigir al usuario
      window.location.href = checkoutUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#0a7ea4',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
          transition: 'all 0.3s ease',
        }}
      >
        {isLoading ? 'Procesando...' : 'Suscribirse'}
      </button>
      {error && (
        <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
