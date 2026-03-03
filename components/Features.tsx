import styles from './Features.module.css';

const features = [
  {
    icon: '📊',
    title: 'Análisis Inteligente',
    description: 'Visualiza tus gastos en tiempo real con gráficos interactivos y análisis detallados de tus patrones de gasto.',
  },
  {
    icon: '🤖',
    title: 'Coach IA Personalizado',
    description: 'Recibe recomendaciones personalizadas basadas en tus hábitos de gasto y metas financieras.',
  },
  {
    icon: '🎯',
    title: 'Metas Inteligentes',
    description: 'Establece metas financieras y el coach IA te ayudará a alcanzarlas con un plan personalizado.',
  },
  {
    icon: '🏦',
    title: 'Integración Bancaria',
    description: 'Conecta tus cuentas bancarias de forma segura con Plaid para un seguimiento automático.',
  },
  {
    icon: '💳',
    title: 'Gestión de Billeteras',
    description: 'Administra múltiples billeteras digitales y tarjetas de crédito en un solo lugar.',
  },
  {
    icon: '🎮',
    title: 'Gamificación',
    description: 'Participa en retos semanales y gana insignias mientras mejoras tu salud financiera.',
  },
  {
    icon: '🔒',
    title: 'Seguridad de Nivel Bancario',
    description: 'Tus datos están protegidos con encriptación de nivel bancario y cumplimiento de estándares internacionales.',
  },
  {
    icon: '📱',
    title: 'Disponible en Todas Partes',
    description: 'Accede a tu información desde iOS, Android o web en cualquier momento y lugar.',
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Características Poderosas</h2>
          <p className={styles.subtitle}>
            Todas las herramientas que necesitas para tomar control de tus finanzas
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
