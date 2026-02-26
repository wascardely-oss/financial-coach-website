import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Tu Coach Financiero Personal en tu Bolsillo
            </h1>
            <p className={styles.subtitle}>
              Gestiona tus gastos, establece metas inteligentes y mejora tu salud financiera con la ayuda de un coach IA personalizado. Todo en una sola app.
            </p>
            <div className={styles.ctaButtons}>
              <button className="btn-primary">Descargar en App Store</button>
              <button className="btn-secondary">Descargar en Google Play</button>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2.5K+</span>
                <span className={styles.statLabel}>Usuarios Activos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.8★</span>
                <span className={styles.statLabel}>Calificación</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>$2.5M</span>
                <span className={styles.statLabel}>Ahorrados</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <div className={styles.screenContent}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Salud Financiera
                  </div>
                  <div style={{ fontSize: '32px', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '16px' }}>
                    75/100
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    Excelente progreso este mes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
