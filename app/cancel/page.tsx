'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function CancelPage() {
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
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          Pago Cancelado
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
          Tu proceso de suscripción fue cancelado. No se realizó ningún cargo a tu tarjeta.
        </p>

        <p style={{ fontSize: '14px', color: '#999', marginBottom: '24px' }}>
          Si tuviste problemas o tienes preguntas, no dudes en contactarnos.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            href="/#contact"
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
            Contactar Soporte
          </Link>
        </div>

        <p style={{ fontSize: '12px', color: '#999', marginTop: '24px' }}>
          Puedes intentar de nuevo en cualquier momento
        </p>
      </div>
    </div>
  );
}
