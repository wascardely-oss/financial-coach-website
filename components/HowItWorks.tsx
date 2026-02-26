import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '1',
    title: 'Descarga la App',
    description: 'Disponible en App Store y Google Play. Descarga gratis y comienza hoy mismo.',
  },
  {
    number: '2',
    title: 'Configura tu Perfil',
    description: 'Proporciona información básica sobre tus ingresos y gastos mensuales.',
  },
  {
    number: '3',
    title: 'Conecta tus Cuentas',
    description: 'Sincroniza tus cuentas bancarias y billeteras digitales de forma segura.',
  },
  {
    number: '4',
    title: 'Recibe Recomendaciones',
    description: 'El Coach IA analiza tus hábitos y te proporciona recomendaciones personalizadas.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Cómo Funciona</h2>
          <p className={styles.subtitle}>
            Cuatro pasos simples para transformar tu vida financiera
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
