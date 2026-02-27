'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  plan: {
    amount: number;
    currency: string;
    interval: string;
  };
  customer: {
    email: string;
  };
}

export default function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      if (!response.ok) throw new Error('Error al obtener suscripciones');
      const data = await response.json();
      setSubscriptions(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('es-ES');
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>
            Panel de Suscripciones
          </h1>
          <Link
            href="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#0a7ea4',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
            }}
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Cargando suscripciones...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
              color: '#c33',
            }}
          >
            {error}
          </div>
        )}

        {/* Subscriptions List */}
        {!loading && subscriptions.length > 0 && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                  }}
                >
                  {/* Left Column */}
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      ID de Suscripción
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        marginBottom: '16px',
                        wordBreak: 'break-all',
                      }}
                    >
                      {sub.id}
                    </p>

                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      Email del Cliente
                    </p>
                    <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                      {sub.customer?.email || 'N/A'}
                    </p>

                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      Estado
                    </p>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        backgroundColor:
                          sub.status === 'active' ? '#efe' : '#fee',
                        color: sub.status === 'active' ? '#3c3' : '#c33',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}
                    >
                      {sub.status}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      Precio Mensual
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                      {formatPrice(sub.plan.amount, sub.plan.currency)}
                    </p>

                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      Próxima Renovación
                    </p>
                    <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                      {formatDate(sub.current_period_end)}
                    </p>

                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                      Intervalo
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      {sub.plan.interval === 'month' ? 'Mensual' : 'Anual'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#0a7ea4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}
                  >
                    Editar Suscripción
                  </button>
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#f5f5f5',
                      color: '#c33',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}
                  >
                    Cancelar Suscripción
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && subscriptions.length === 0 && !error && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
              No hay suscripciones activas
            </p>
            <Link
              href="/#pricing"
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
              Ver Planes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
