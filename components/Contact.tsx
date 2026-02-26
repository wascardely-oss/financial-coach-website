'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Aquí puedes integrar con un servicio de email como:
      // - Formspree (https://formspree.io)
      // - EmailJS (https://www.emailjs.com)
      // - Tu propio backend

      // Por ahora, simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Formulario enviado:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div className={styles.contactContent}>
          <div className={styles.contactHeader}>
            <h2 className={styles.title}>¿Preguntas o Sugerencias?</h2>
            <p className={styles.subtitle}>
              Nos encantaría escuchar de ti. Completa el formulario y nos pondremos en contacto pronto.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tu mensaje aquí..."
                required
                rows={5}
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                ✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                ✗ Error al enviar el mensaje. Por favor, intenta de nuevo.
              </div>
            )}
          </form>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <h3>Email</h3>
                <p>contacto@financialcoach.app</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>💬</span>
              <div>
                <h3>Redes Sociales</h3>
                <p>@FinancialCoach</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>⏰</span>
              <div>
                <h3>Disponibilidad</h3>
                <p>Lunes a Viernes, 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
