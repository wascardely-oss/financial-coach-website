'use client';

import { useState } from 'react';
import styles from './source-code.module.css';

interface FileItem {
  name: string;
  path: string;
  content: string;
  language: string;
}

const files: FileItem[] = [
  {
    name: 'package.json',
    path: 'package.json',
    language: 'json',
    content: `{
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
}`,
  },
  {
    name: 'app/layout.tsx',
    path: 'app/layout.tsx',
    language: 'typescript',
    content: `import type { Metadata } from 'next';
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
}`,
  },
  {
    name: 'app/page.tsx',
    path: 'app/page.tsx',
    language: 'typescript',
    content: `import Header from '@/components/Header';
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
}`,
  },
  {
    name: 'components/Header.tsx',
    path: 'components/Header.tsx',
    language: 'typescript',
    content: `'use client';

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
}`,
  },
  {
    name: 'components/Hero.tsx',
    path: 'components/Hero.tsx',
    language: 'typescript',
    content: `import styles from './Hero.module.css';

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
}`,
  },
  {
    name: 'app/globals.css',
    path: 'app/globals.css',
    language: 'css',
    content: `* {
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
}`,
  },
  {
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    language: 'json',
    content: `{
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
}`,
  },
  {
    name: 'next.config.js',
    path: 'next.config.js',
    language: 'javascript',
    content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;`,
  },
  {
    name: 'vercel.json',
    path: 'vercel.json',
    language: 'json',
    content: `{
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
}`,
  },
];

export default function SourceCodePage() {
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(selectedFile.content)
    );
    element.setAttribute('download', selectedFile.path);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Código Fuente Completo</h1>
        <p className={styles.subtitle}>
          Financial Coach Website - Código fuente de la landing page
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.fileList}>
            {files.map((file) => (
              <button
                key={file.path}
                className={`${styles.fileItem} ${
                  selectedFile.path === file.path ? styles.active : ''
                }`}
                onClick={() => setSelectedFile(file)}
              >
                <span className={styles.fileIcon}>📄</span>
                <span className={styles.fileName}>{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.editor}>
          <div className={styles.editorHeader}>
            <span className={styles.editorTitle}>{selectedFile.path}</span>
            <div className={styles.editorActions}>
              <button
                className={styles.actionBtn}
                onClick={copyToClipboard}
                title="Copiar al portapapeles"
              >
                {copied ? '✓ Copiado' : '📋 Copiar'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={downloadFile}
                title="Descargar archivo"
              >
                ⬇️ Descargar
              </button>
            </div>
          </div>
          <pre className={styles.code}>
            <code>{selectedFile.content}</code>
          </pre>
        </div>
      </div>

      <div className={styles.info}>
        <h2>📚 Cómo usar este código</h2>
        <ol>
          <li>Selecciona un archivo de la lista a la izquierda</li>
          <li>Haz clic en "Copiar" para copiar el contenido</li>
          <li>O haz clic en "Descargar" para descargar el archivo</li>
          <li>Copia todos los archivos a tu proyecto local</li>
          <li>Ejecuta <code>npm install</code> para instalar dependencias</li>
          <li>Ejecuta <code>npm run dev</code> para iniciar el servidor de desarrollo</li>
        </ol>
      </div>

      <div className={styles.footer}>
        <p>
          💡 <strong>Nota:</strong> Este es el código fuente completo de la landing page. Para obtener
          todos los componentes, descarga el repositorio completo desde GitHub.
        </p>
      </div>
    </div>
  );
}
