'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    name: 'Gratuito',
    price: 0,
    description: 'Perfecto para comenzar',
    features: [
      'Seguimiento básico de gastos',
      'Categorización automática',
      'Resumen mensual',
      'Acceso limitado al Coach IA',
    ],
  },
  {
    name: 'Pro',
    price: 9.99,
    description: 'Para usuarios serios',
    popular: true,
    features: [
      'Todo en Gratuito',
      'Coach IA sin límites',
      'Integración bancaria (Plaid)',
      'Billeteras digitales',
      'Retos semanales gamificados',
      'Análisis avanzado',
    ],
  },
  {
    name: 'Premium',
    price: 19.99,
    description: 'Control total',
    features: [
      'Todo en Pro',
      'Análisis predictivo',
      'Reportes personalizados',
      'Soporte prioritario',
      'Exportar datos',
      'Sin publicidad',
    ],
  },
];

export default function DemoPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (plan.price === 0) {
      setSuccess(`¡Bienvenido al plan ${plan.name}! Acceso inmediato.`);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setSelectedPlan(plan.name);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.name.toLowerCase(),
          planPrice: plan.price,
          planDescription: plan.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la sesión de pago');
      }

      const data = await response.json();
      setSuccess(`✅ Sesión de Stripe creada: ${data.sessionId.substring(0, 20)}...`);
      
      // En una aplicación real, aquí redirigirías a Stripe Checkout
      console.log('Sesión de Stripe:', data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0a7ea4' }}>Financial Coach</h1>
          <Link href="/" style={{ color: '#0a7ea4', textDecoration: 'none', fontWeight: '500' }}>
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', color: '#11181c', marginBottom: '16px' }}>
            Flujo de Suscripción Corregido
          </h2>
          <p style={{ fontSize: '18px', color: '#687076', maxWidth: '600px', margin: '0 auto' }}>
            Prueba los botones de suscripción corregidos. Haz clic en cualquier plan para ver cómo funciona el flujo de pago con Stripe.
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px',
          }}>
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px',
          }}>
            <strong>✅ Éxito:</strong> {success}
          </div>
        )}

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '60px',
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: plan.popular ? '0 10px 25px rgba(10, 126, 164, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: plan.popular ? '2px solid #0a7ea4' : '1px solid #e5e7eb',
                position: 'relative',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#0a7ea4',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  Más Popular
                </div>
              )}

              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#11181c', marginBottom: '8px' }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#687076', marginBottom: '16px' }}>
                {plan.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '36px', fontWeight: '700', color: '#0a7ea4' }}>
                  ${plan.price}
                </span>
                <span style={{ fontSize: '14px', color: '#687076', marginLeft: '8px' }}>
                  /mes
                </span>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading && selectedPlan === plan.name}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: plan.popular ? '#0a7ea4' : '#f5f5f5',
                  color: plan.popular ? 'white' : '#0a7ea4',
                  border: plan.popular ? 'none' : '2px solid #0a7ea4',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: loading && selectedPlan === plan.name ? 'not-allowed' : 'pointer',
                  opacity: loading && selectedPlan === plan.name ? 0.6 : 1,
                  marginBottom: '24px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!(loading && selectedPlan === plan.name)) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 126, 164, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {loading && selectedPlan === plan.name ? 'Procesando...' : 'Suscribirse'}
              </button>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '12px 0',
                      borderTop: index === 0 ? 'none' : '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#687076',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#11181c', marginBottom: '24px' }}>
            📋 Detalles del Flujo de Suscripción
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0a7ea4', marginBottom: '8px' }}>
                ✅ Problemas Corregidos
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#687076', lineHeight: '1.8' }}>
                <li>✓ Rutas de API funcionando correctamente</li>
                <li>✓ Sesiones de Stripe generándose exitosamente</li>
                <li>✓ Prerendering resuelto con Suspense</li>
                <li>✓ Servidor Express personalizado activo</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0a7ea4', marginBottom: '8px' }}>
                🔄 Flujo del Proceso
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#687076', lineHeight: '1.8' }}>
                <li>1. Usuario selecciona un plan</li>
                <li>2. Se envía solicitud a /api/create-checkout-session</li>
                <li>3. Se recibe sessionId de Stripe</li>
                <li>4. Usuario es redirigido a Stripe Checkout</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0a7ea4', marginBottom: '8px' }}>
                🎯 Próximos Pasos
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#687076', lineHeight: '1.8' }}>
                <li>✓ Integrar Stripe Checkout en producción</li>
                <li>✓ Configurar webhooks de Stripe</li>
                <li>✓ Implementar confirmación de pago</li>
                <li>✓ Activar acceso a características premium</li>
              </ul>
            </div>
          </div>

          {/* Code Example */}
          <div style={{ marginTop: '32px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #0a7ea4' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#11181c', marginBottom: '12px' }}>
              💻 Ejemplo de Respuesta de API
            </h4>
            <pre style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '16px',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '12px',
              fontFamily: 'monospace',
              margin: 0,
            }}>
{`POST /api/create-checkout-session
Content-Type: application/json

{
  "planName": "pro",
  "planPrice": 9.99,
  "planDescription": "Para usuarios serios"
}

Response:
{
  "sessionId": "cs_test_a1Ki16umJW2h9GHZvBnyMtHz3eTZX9S90fdt3ztTDgO5D4SLijUFPCA2QX"
}`}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', padding: '40px 20px', marginTop: '60px', textAlign: 'center', color: '#687076', fontSize: '14px' }}>
        <p>© 2026 Financial Coach. Todos los derechos reservados.</p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          Esta es una página de demostración del flujo de suscripción corregido.
        </p>
      </footer>
    </div>
  );
}
