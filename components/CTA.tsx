import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>
            Comienza tu Transformación Financiera Hoy
          </h2>
          <p className={styles.subtitle}>
            Miles de personas ya están mejorando su salud financiera. ¿Serás el próximo?
          </p>
          <div className={styles.buttons}>
            <button className="btn-primary">Descargar en App Store</button>
            <button className="btn-secondary">Descargar en Google Play</button>
          </div>
          <p className={styles.note}>
            ✓ Descarga gratuita • ✓ Sin tarjeta de crédito • ✓ Acceso inmediato
          </p>
        </div>
      </div>
    </section>
  );
}
