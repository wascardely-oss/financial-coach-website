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
      // Redirigir a la página de pago
      const paymentUrl = `/payment?plan=${planName}&price=${planPrice}`;
      window.location.href = paymentUrl;
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
