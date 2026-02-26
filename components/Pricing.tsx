import styles from './Pricing.module.css';
import SubscriptionButton from './SubscriptionButton';

const plans = [
  {
    name: 'Gratuito',
    price: '0',
    description: 'Perfecto para comenzar',
    features: [
      'Seguimiento básico de gastos',
      'Categorización automática',
      'Resumen mensual',
      'Acceso limitado al Coach IA',
    ],
    cta: 'Descargar Gratis',
    highlighted: false,
    planType: null,
  },
  {
    name: 'Pro',
    price: '9.99',
    description: 'Para usuarios serios',
    features: [
      'Todo en Gratuito',
      'Coach IA sin límites',
      'Integración bancaria (Plaid)',
      'Billeteras digitales',
      'Retos semanales gamificados',
      'Análisis avanzado',
    ],
    cta: 'Suscribirse',
    highlighted: true,
    planType: 'pro',
  },
  {
    name: 'Premium',
    price: '19.99',
    description: 'Control total',
    features: [
      'Todo en Pro',
      'Análisis predictivo',
      'Reportes personalizados',
      'Soporte prioritario',
      'Exportar datos',
      'Sin publicidad',
    ],
    cta: 'Suscribirse',
    highlighted: false,
    planType: 'premium',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Planes Simples y Transparentes</h2>
          <p className={styles.subtitle}>
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''}`}
            >
              {plan.highlighted && (
                <div className={styles.badge}>Más Popular</div>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>/mes</span>
              </div>
              
              {plan.planType ? (
                <SubscriptionButton
                  planName={plan.planType as 'pro' | 'premium'}
                  planPrice={parseFloat(plan.price)}
                  planDescription={`Financial Coach - Plan ${plan.name}`}
                />
              ) : (
                <button
                  className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  {plan.cta}
                </button>
              )}
              
              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          <p>
            💡 <strong>Nota:</strong> La suscripción se realiza a través de nuestro sitio web para evitar
            las comisiones de las tiendas de aplicaciones. Accede a través de la app.
          </p>
        </div>
      </div>
    </section>
  );
}
