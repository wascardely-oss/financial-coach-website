# Integrar Servicio de Email para Formulario de Contacto

El formulario de contacto está listo, pero necesita un servicio de email para enviar mensajes. Aquí te muestro 3 opciones fáciles:

## Opción 1: Formspree (Más Fácil) ⭐

Formspree es el más simple - no requiere backend.

### Pasos:

1. Ve a https://formspree.io
2. Haz clic en "Sign Up"
3. Completa el registro
4. Crea un nuevo formulario
5. Copia tu **Formspree ID** (ej: `f/xxxxx`)

### Integración en el Código

En `components/Contact.tsx`, reemplaza la función `handleSubmit`:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } else {
      throw new Error('Error en la respuesta');
    }
  } catch (error) {
    console.error('Error:', error);
    setSubmitStatus('error');
    setTimeout(() => setSubmitStatus('idle'), 3000);
  } finally {
    setIsSubmitting(false);
  }
};
```

Reemplaza `YOUR_FORMSPREE_ID` con tu ID real.

---

## Opción 2: EmailJS (Más Control)

EmailJS permite enviar emails directamente desde el navegador.

### Pasos:

1. Ve a https://www.emailjs.com
2. Crea una cuenta
3. Conecta tu email (Gmail, Outlook, etc.)
4. Copia:
   - **Service ID**
   - **Template ID**
   - **Public Key**

### Instalación

```bash
npm install @emailjs/browser
```

### Integración en el Código

En `components/Contact.tsx`:

```typescript
'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

// Inicializar EmailJS (hazlo una sola vez)
emailjs.init('YOUR_PUBLIC_KEY');

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
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tu@email.com', // Tu email
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... resto del componente igual
}
```

Reemplaza:
- `YOUR_PUBLIC_KEY` con tu Public Key
- `YOUR_SERVICE_ID` con tu Service ID
- `YOUR_TEMPLATE_ID` con tu Template ID
- `tu@email.com` con tu email real

---

## Opción 3: Backend Personalizado (Más Robusto)

Si tienes un backend, puedes crear un endpoint:

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Configurar transporter (Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Enviar email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }
}
```

---

## Comparación de Opciones

| Opción | Facilidad | Costo | Límite de Emails | Mejor Para |
|--------|-----------|-------|------------------|-----------|
| **Formspree** | ⭐⭐⭐⭐⭐ | Gratis | 50/mes | Sitios pequeños |
| **EmailJS** | ⭐⭐⭐⭐ | Gratis | 200/mes | Sitios medianos |
| **Backend** | ⭐⭐⭐ | Varía | Ilimitado | Sitios grandes |

---

## 🎯 Recomendación

Para empezar, usa **Formspree** - es la opción más rápida y no requiere configuración adicional.

---

## Verificar que Funciona

1. Abre tu sitio
2. Desplázate a la sección "Contacto"
3. Completa el formulario
4. Haz clic en "Enviar Mensaje"
5. Deberías recibir un email

---

**¿Necesitas ayuda?** Contacta al soporte de tu servicio de email elegido.
