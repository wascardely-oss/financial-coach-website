import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'María García',
    role: 'Emprendedora',
    text: 'Financial Coach cambió completamente mi relación con el dinero. En 3 meses logré ahorrar más que en todo el año anterior.',
    rating: 5,
  },
  {
    name: 'Carlos López',
    role: 'Profesional Independiente',
    text: 'El Coach IA es como tener un asesor financiero en el bolsillo. Las recomendaciones son muy precisas y personalizadas.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Estudiante',
    text: 'Finalmente entiendo mis gastos y tengo un plan claro. La app es muy fácil de usar y los retos semanales son muy motivadores.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que Dicen Nuestros Usuarios</h2>
          <p className={styles.subtitle}>
            Miles de personas ya transformaron sus finanzas con Financial Coach
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className={styles.text}>"{testimonial.text}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
