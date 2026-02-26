import styles from './Features.module.css';

const features = [
  {
    icon: '📊',
    title: 'Seguimiento de Gastos',
    description: 'Registra y categoriza automáticamente todos tus gastos. Obtén insights detallados sobre dónde va tu dinero.',
  },
  {
    icon: '🎯',
    title: 'Metas Inteligentes',
    description: 'Establece metas financieras personalizadas. El Coach IA te ayuda a crearlas y monitorear tu progreso.',
  },
  {
    icon: '🤖',
    title: 'Coach IA Personalizado',
    description: 'Recibe recomendaciones financieras personalizadas basadas en tu perfil y hábitos de gasto.',
  },
  {
    icon: '🏆',
    title: 'Retos Semanales',
    description: 'Participa en retos gamificados para mejorar tus hábitos financieros y ganar puntos.',
  },
  {
    icon: '🏦',
    title: 'Integración Bancaria',
    description: 'Conecta tus cuentas bancarias reales con Plaid para sincronización automática de transacciones.',
  },
  {
    icon: '📱',
    title: 'Billeteras Digitales',
    description: 'Integra Stripe y PayPal para gestionar tus transacciones digitales en un solo lugar.',
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Características Principales</h2>
          <p className={styles.subtitle}>
            Todo lo que necesitas para tomar control de tus finanzas personales
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
