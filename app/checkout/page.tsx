'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

interface CheckoutPageProps {
  searchParams: {
    plan?: string;
    price?: string;
  };
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const plan = searchParams.plan || 'pro';
  const price = searchParams.price || '9.99';

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan,
          planPrice: parseFloat(price),
          planDescription: `Financial Coach - Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear sesión de pago');
      }

      const data = await response.json();
      setSuccess(true);

      // Mostrar la URL de Stripe Checkout para que el usuario pueda copiarla
      const checkoutUrl = `https://checkout.stripe.com/pay/${data.sessionId}`;
      
      // Copiar a portapapeles
      navigator.clipboard.writeText(checkoutUrl);
      
      // Abrir en nueva ventana
      setTimeout(() => {
        window.open(checkoutUrl, '_blank');
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#0a7ea4', textDecoration: 'none', fontSize: '14px' }}>
            ← Volver al Inicio
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#11181c', marginTop: '20px' }}>
            Completa tu Suscripción
          </h1>
        </div>

        {/* Checkout Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Plan Summary */}
          <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#11181c', marginBottom: '8px' }}>
              Plan {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </h2>
            <p style={{ fontSize: '14px', color: '#687076', marginBottom: '16px' }}>
              Acceso a todas las características premium
            </p>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0a7ea4' }}>
              ${price}
              <span style={{ fontSize: '16px', color: '#687076', marginLeft: '8px' }}>/mes</span>
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#11181c', marginBottom: '16px' }}>
              Incluye:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', color: '#687076', fontSize: '14px' }}>
                ✓ Coach IA sin límites
              </li>
              <li style={{ padding: '8px 0', color: '#687076', fontSize: '14px' }}>
                ✓ Integración bancaria
              </li>
              <li style={{ padding: '8px 0', color: '#687076', fontSize: '14px' }}>
                ✓ Análisis avanzado
              </li>
              <li style={{ padding: '8px 0', color: '#687076', fontSize: '14px' }}>
                ✓ Soporte prioritario
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
            }}>
              <strong>❌ Error:</strong> {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              backgroundColor: '#dcfce7',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
            }}>
              <strong>✅ Éxito:</strong> Se abrirá Stripe Checkout en una nueva ventana. Si no se abre, copia el enlace que se copió al portapapeles.
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#0a7ea4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              marginBottom: '16px',
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? 'Procesando...' : 'Ir a Pagar'}
          </button>

          {/* Back Button */}
          <Link href="/" style={{
            display: 'block',
            textAlign: 'center',
            padding: '12px',
            color: '#0a7ea4',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            Cancelar
          </Link>

          {/* Info */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#687076',
            textAlign: 'center',
          }}>
            <p>
              💳 Pagos seguros procesados por Stripe
            </p>
            <p style={{ marginTop: '8px' }}>
              Tu información de pago está protegida con encriptación de nivel bancario
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
