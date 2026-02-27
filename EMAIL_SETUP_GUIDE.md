# Guía de Configuración de Emails

## Opciones Disponibles

Tu sitio web actualmente soporta múltiples servicios de email. Elige el que mejor se adapte a tus necesidades.

### 1. Formspree (Ya Configurado ✅)

**Ventajas:**
- Sin configuración adicional
- Formulario de contacto funcional
- Emails recibidos en tu bandeja de entrada
- Gratis hasta 50 emails/mes

**Desventajas:**
- No soporta emails transaccionales automáticos
- Limitado a formularios de contacto

**Estado:** ✅ Activo

---

### 2. Resend (Recomendado para Transaccionales)

**Ventajas:**
- Excelente para emails transaccionales
- API simple y rápida
- Plantillas profesionales
- Gratis hasta 100 emails/día

**Pasos:**

1. Ve a https://resend.com
2. Crea una cuenta
3. Obtén tu API Key
4. En Render, agrega: `RESEND_API_KEY=re_xxxxx`
5. Actualiza `/app/api/send-email/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email, subject, htmlContent } = await request.json();
  
  const result = await resend.emails.send({
    from: 'noreply@financialcoach.app',
    to: email,
    subject: subject,
    html: htmlContent,
  });

  return NextResponse.json(result);
}
```

---

### 3. SendGrid

**Ventajas:**
- Muy confiable
- Excelente para volumen alto
- Análisis detallados
- Gratis hasta 100 emails/día

**Pasos:**

1. Ve a https://sendgrid.com
2. Crea una cuenta
3. Obtén tu API Key
4. En Render, agrega: `SENDGRID_API_KEY=SG.xxxxx`
5. Instala: `npm install @sendgrid/mail`

---

### 4. AWS SES

**Ventajas:**
- Muy barato
- Escalable
- Integración con AWS

**Desventajas:**
- Requiere verificación de dominio
- Más complejo de configurar

---

## Emails Automáticos Soportados

El sistema está preparado para enviar:

| Evento | Tipo | Estado |
|--------|------|--------|
| Suscripción confirmada | Transaccional | Listo |
| Renovación de suscripción | Transaccional | Listo |
| Suscripción cancelada | Transaccional | Listo |
| Mensaje de contacto | Notificación | Activo (Formspree) |
| Recuperación de contraseña | Transaccional | Pendiente |
| Confirmación de email | Transaccional | Pendiente |

## Plantillas de Email

Las plantillas están en `/app/api/send-email/route.ts` y pueden personalizarse.

### Ejemplo de Plantilla:

```html
<h2>¡Bienvenido a Financial Coach Pro!</h2>
<p>Tu suscripción ha sido confirmada exitosamente.</p>
<p>Ahora tienes acceso a:</p>
<ul>
  <li>Coach IA sin límites</li>
  <li>Integración bancaria</li>
  <li>Análisis avanzado</li>
</ul>
```

## Próximos Pasos

1. **Elige un servicio de email** (Resend recomendado)
2. **Obtén las credenciales**
3. **Agrega a variables de entorno en Render**
4. **Actualiza el código** en `/app/api/send-email/route.ts`
5. **Prueba** enviando un email de prueba

## Testing

Para probar emails localmente:

```bash
# Instalar Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# En otra terminal, disparar evento
stripe trigger customer.subscription.created

# Verificar que el email se envió
```

## Troubleshooting

**Problema**: Emails no se envían
- Verifica que la API Key está correcta
- Asegúrate que el dominio está verificado
- Revisa los logs en el panel del servicio

**Problema**: Emails van a spam
- Configura SPF, DKIM, DMARC
- Usa un dominio verificado
- Evita palabras de spam

**Problema**: Límite de rate exceeded
- Implementa cola de emails
- Usa un servicio con límites más altos
- Distribuye los envíos en el tiempo
