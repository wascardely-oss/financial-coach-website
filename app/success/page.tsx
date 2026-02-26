'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Aquí puedes verificar la sesión en tu backend
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          ¡Suscripción Exitosa!
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
          Gracias por suscribirte a Financial Coach. Tu suscripción está activa y puedes comenzar a usar todas las características premium.
        </p>

        <div
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #0a7ea4',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          <p style={{ fontSize: '14px', color: '#0a7ea4', margin: '0' }}>
            <strong>ID de Sesión:</strong> {sessionId}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#0a7ea4',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            Volver al Inicio
          </Link>
          <Link
            href="https://dashboard.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              backgroundColor: '#f5f5f5',
              color: '#0a7ea4',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              border: '1px solid #0a7ea4',
              display: 'inline-block',
            }}
          >
            Ver en Stripe
          </Link>
        </div>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '24px' }}>
          Revisa tu correo para la confirmación de suscripción
        </p>
      </div>
    </div>
  );
}
