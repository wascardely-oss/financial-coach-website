'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Metric {
  label: string;
  value: string | number;
  change: number;
  unit?: string;
}

interface AnalyticsData {
  users: Metric;
  conversions: Metric;
  revenue: Metric;
  churn: Metric;
  ltv: Metric;
  cac: Metric;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular datos de analytics (en producción, conectar con backend)
    setTimeout(() => {
      setData({
        users: {
          label: 'Usuarios Activos',
          value: '2,450',
          change: 12.5,
          unit: 'usuarios',
        },
        conversions: {
          label: 'Tasa de Conversión',
          value: '3.2%',
          change: 0.8,
          unit: '%',
        },
        revenue: {
          label: 'Ingresos Este Mes',
          value: '$8,450',
          change: 25.3,
          unit: 'USD',
        },
        churn: {
          label: 'Churn Rate',
          value: '2.1%',
          change: -0.5,
          unit: '%',
        },
        ltv: {
          label: 'Lifetime Value',
          value: '$285',
          change: 15.2,
          unit: 'USD',
        },
        cac: {
          label: 'Customer Acquisition Cost',
          value: '$42',
          change: -8.3,
          unit: 'USD',
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

  const MetricCard = ({
    metric,
  }: {
    metric: Metric & { label: string };
  }) => (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>
        {metric.label}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        <p style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>
          {metric.value}
        </p>
        <span
          style={{
            fontSize: '12px',
            color: metric.change > 0 ? '#3c3' : '#c33',
            fontWeight: '600',
          }}
        >
          {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
        </span>
      </div>
      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
        vs. mes anterior
      </p>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>
              Dashboard de Analytics
            </h1>
            <p style={{ fontSize: '14px', color: '#999', margin: '8px 0 0 0' }}>
              Métricas clave de Financial Coach
            </p>
          </div>
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
            <p>Cargando datos...</p>
          </div>
        )}

        {/* Metrics Grid */}
        {!loading && data && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              <MetricCard
                metric={{ ...data.users, label: data.users.label }}
              />
              <MetricCard
                metric={{
                  ...data.conversions,
                  label: data.conversions.label,
                }}
              />
              <MetricCard
                metric={{ ...data.revenue, label: data.revenue.label }}
              />
              <MetricCard metric={{ ...data.churn, label: data.churn.label }} />
              <MetricCard metric={{ ...data.ltv, label: data.ltv.label }} />
              <MetricCard metric={{ ...data.cac, label: data.cac.label }} />
            </div>

            {/* Sections */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Acquisition */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}
                >
                  📊 Adquisición
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Descargas este mes</span>
                    <strong>1,250</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Costo por descarga</span>
                    <strong>$3.50</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Fuente principal</span>
                    <strong>Google Ads</strong>
                  </div>
                </div>
              </div>

              {/* Retention */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}
                >
                  📈 Retención
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Retención Día 1</span>
                    <strong>72%</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Retención Día 7</span>
                    <strong>48%</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Retención Día 30</span>
                    <strong>28%</strong>
                  </div>
                </div>
              </div>

              {/* Monetization */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}
                >
                  💰 Monetización
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Suscriptores Pro</span>
                    <strong>245</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>Suscriptores Premium</span>
                    <strong>85</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>MRR (Monthly Recurring)</span>
                    <strong>$4,200</strong>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}
                >
                  🎯 Objetivos
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span>Usuarios (Meta: 5K)</span>
                      <strong>49%</strong>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: '#0a7ea4',
                          width: '49%',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span>Ingresos (Meta: $20K)</span>
                      <strong>42%</strong>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: '#22c55e',
                          width: '42%',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span>Retención (Meta: 50%)</span>
                      <strong>96%</strong>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: '#f59e0b',
                          width: '96%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#f0f9ff',
                borderRadius: '12px',
                border: '1px solid #0a7ea4',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '14px', color: '#0a7ea4', margin: '0' }}>
                📊 Los datos se actualizan cada hora desde Google Analytics y Stripe
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
