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
