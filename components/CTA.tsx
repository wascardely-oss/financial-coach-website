'use client';

import Link from 'next/link';
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
            <Link href="#pricing" className="btn-primary">Ver Planes de Suscripción</Link>
            <Link href="/subscription-demo" className="btn-secondary">Prueba la Demo</Link>
          </div>
          <p className={styles.note}>
            ✓ Descarga gratuita • ✓ Sin tarjeta de crédito • ✓ Acceso inmediato
          </p>
        </div>
      </div>
    </section>
  );
}
