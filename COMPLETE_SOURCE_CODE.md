# Financial Coach Website - Código Fuente Completo

## 📋 Índice de Archivos

1. [package.json](#packagejson)
2. [tsconfig.json](#tsconfigjson)
3. [next.config.js](#nextconfigjs)
4. [vercel.json](#verceljson)
5. [app/layout.tsx](#applayouttsx)
6. [app/page.tsx](#apppagetsx)
7. [app/globals.css](#appglobalscss)
8. [components/Header.tsx](#componentsheadertsx)
9. [components/Header.module.css](#componentsheadermodulecss)
10. [components/Hero.tsx](#componentsherotsx)
11. [components/Hero.module.css](#componentsheromodu lecss)
12. [components/Features.tsx](#componentsfeaturestsxsx)
13. [components/Features.module.css](#componentsfeaturesmodulecss)
14. [components/HowItWorks.tsx](#componentshowitworkstsx)
15. [components/HowItWorks.module.css](#componentshowitworksmodulecss)
16. [components/Testimonials.tsx](#componentstestimonialstsx)
17. [components/Testimonials.module.css](#componentstestimonialsmodulecss)
18. [components/Pricing.tsx](#componentspricingtsx)
19. [components/Pricing.module.css](#componentspricingmodulecss)
20. [components/CTA.tsx](#componentsctatsxsx)
21. [components/CTA.module.css](#componentsctamodulecss)
22. [components/Footer.tsx](#componentsfootertsx)
23. [components/Footer.module.css](#componentsfootermodulecss)

---

## package.json

\`\`\`json
{
  "name": "financial-coach-website",
  "version": "1.0.0",
  "description": "Landing page for Financial Coach mobile app",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
\`\`\`

---

## tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
\`\`\`

---

## next.config.js

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
\`\`\`

---

## vercel.json

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
\`\`\`

---

## app/layout.tsx

\`\`\`typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Financial Coach - Tu Coach Financiero Personal',
  description: 'Aplicación de coaching financiero con IA que te ayuda a gestionar gastos, establecer metas y mejorar tu salud financiera.',
  keywords: 'finanzas, coaching, presupuesto, metas, gastos, ahorro',
  openGraph: {
    title: 'Financial Coach - Tu Coach Financiero Personal',
    description: 'Aplicación de coaching financiero con IA que te ayuda a gestionar gastos, establecer metas y mejorar tu salud financiera.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

---

## app/page.tsx

\`\`\`typescript
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
\`\`\`

---

## app/globals.css

\`\`\`css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #0a7ea4;
  --primary-dark: #065a7d;
  --secondary: #10b981;
  --accent: #f59e0b;
  --danger: #ef4444;
  --background: #ffffff;
  --surface: #f9fafb;
  --border: #e5e7eb;
  --text: #1f2937;
  --text-muted: #6b7280;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --surface: #1e293b;
    --border: #334155;
    --text: #f1f5f9;
    --text-muted: #cbd5e1;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-dark);
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  padding: 12px 24px;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(10, 126, 164, 0.2);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary);
  padding: 12px 24px;
  font-size: 16px;
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background-color: var(--primary);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
\`\`\`

---

## components/Header.tsx

\`\`\`typescript
'use client';

import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💰</span>
            <span className={styles.logoText}>Financial Coach</span>
          </div>

          <nav className={\\`\${styles.nav} \${mobileMenuOpen ? styles.navOpen : ''}\`}>
            <a href="#features">Características</a>
            <a href="#how-it-works">Cómo Funciona</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#pricing">Precios</a>
          </nav>

          <div className={styles.actions}>
            <button className="btn-primary">Descargar App</button>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
\`\`\`

---

## components/Hero.tsx

\`\`\`typescript
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
\`\`\`

---

## components/Features.tsx

\`\`\`typescript
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
\`\`\`

---

## components/Pricing.tsx

\`\`\`typescript
import styles from './Pricing.module.css';

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
              className={\\`\${styles.card} \${plan.highlighted ? styles.highlighted : ''}\`}
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
              <button
                className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%' }}
              >
                {plan.cta}
              </button>
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
\`\`\`

---

## components/Footer.tsx

\`\`\`typescript
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
\`\`\`

---

## 📝 Notas Importantes

- Este documento contiene el código fuente principal
- Para los estilos CSS de cada componente, consulta los archivos `.module.css`
- Todos los componentes están optimizados para rendimiento
- El sitio es completamente responsive y mobile-first
- Soporta modo oscuro automático

## 🚀 Cómo Usar

1. Copia todos los archivos a tu proyecto
2. Instala dependencias: \`npm install\`
3. Inicia el servidor: \`npm run dev\`
4. Abre http://localhost:3000 en tu navegador

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026  
**Estado**: Listo para producción
