'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const plan = searchParams.get('plan') || 'pro';
  const price = searchParams.get('price') || '9.99';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Crear Payment Intent
      const intentResponse = await fetch('/api/create-payment-intent', {
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

      if (!intentResponse.ok) {
        throw new Error('Error al crear Payment Intent');
      }

      const { clientSecret } = await intentResponse.json();

      // 2. Procesar el pago con Stripe
      const response = await fetch('https://api.stripe.com/v1/payment_intents/' + clientSecret.split('_secret_')[0] + '/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
        },
        body: new URLSearchParams({
          payment_method: 'card',
          'payment_method_data[type]': 'card',
          'payment_method_data[card][number]': cardNumber.replace(/\s/g, ''),
          'payment_method_data[card][exp_month]': expiry.split('/')[0],
          'payment_method_data[card][exp_year]': expiry.split('/')[1],
          'payment_method_data[card][cvc]': cvc,
          'payment_method_data[billing_details][name]': name,
        }).toString(),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/success?session_id=' + clientSecret;
        }, 2000);
      } else {
        throw new Error('Error al procesar el pago');
      }
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
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#0a7ea4', textDecoration: 'none', fontSize: '14px' }}>
            ← Volver al Inicio
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#11181c', marginTop: '20px' }}>
            Completa tu Pago
          </h1>
        </div>

        {/* Payment Card */}
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
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0a7ea4' }}>
              ${price}
              <span style={{ fontSize: '16px', color: '#687076', marginLeft: '8px' }}>/mes</span>
            </div>
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
              <strong>✅ Éxito:</strong> Pago procesado correctamente. Redirigiendo...
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#11181c', marginBottom: '8px' }}>
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Card Number */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#11181c', marginBottom: '8px' }}>
                Número de Tarjeta
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace',
                }}
              />
            </div>

            {/* Expiry and CVC */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#11181c', marginBottom: '8px' }}>
                  Vencimiento
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#11181c', marginBottom: '8px' }}>
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#0a7ea4',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading || success ? 'not-allowed' : 'pointer',
                opacity: isLoading || success ? 0.6 : 1,
                marginTop: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              {isLoading ? 'Procesando...' : `Pagar $${price}`}
            </button>
          </form>

          {/* Test Card Info */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#687076',
            backgroundColor: '#f3f4f6',
            padding: '16px',
            borderRadius: '8px',
          }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>💳 Tarjeta de Prueba:</p>
            <p>Número: 4242 4242 4242 4242</p>
            <p>Vencimiento: 12/25</p>
            <p>CVC: 123</p>
          </div>

          {/* Security Info */}
          <div style={{
            marginTop: '16px',
            fontSize: '12px',
            color: '#687076',
            textAlign: 'center',
          }}>
            <p>🔒 Tu información está protegida con encriptación de nivel bancario</p>
          </div>
        </div>
      </div>
    </div>
  );
}
