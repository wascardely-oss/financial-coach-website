import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Financial Coach</h3>
            <p className={styles.description}>
              Tu coach financiero personal en el bolsillo. Transforma tus finanzas hoy.
            </p>
            <div className={styles.social}>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="LinkedIn">💼</a>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.columnTitle}>Producto</h4>
            <ul className={styles.links}>
              <li><a href="#features">Características</a></li>
              <li><a href="#pricing">Precios</a></li>
              <li><a href="#how-it-works">Cómo Funciona</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.columnTitle}>Legal</h4>
            <ul className={styles.links}>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.columnTitle}>Descargar</h4>
            <ul className={styles.links}>
              <li><a href="#">App Store</a></li>
              <li><a href="#">Google Play</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>
            © {currentYear} Financial Coach. Todos los derechos reservados.
          </p>
          <p className={styles.disclaimer}>
            Financial Coach proporciona información educativa únicamente. No es asesoramiento financiero profesional.
          </p>
        </div>
      </div>
    </footer>
  );
}
