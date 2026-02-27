# Configuración de Webhooks de Stripe

## ¿Qué son los Webhooks?

Los webhooks son notificaciones automáticas que Stripe envía a tu servidor cuando ocurren eventos (pagos, suscripciones, etc.). Esto permite que tu aplicación reaccione en tiempo real.

## Pasos para Configurar Webhooks

### 1. Obtener tu Webhook Secret

1. Ve a https://dashboard.stripe.com/webhooks
2. Haz clic en "Add endpoint"
3. En "Endpoint URL", ingresa: `https://financial-coach-website.onrender.com/api/webhooks/stripe`
4. Selecciona los eventos que quieres recibir:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Haz clic en "Add endpoint"
6. Copia el "Signing secret" (comienza con `whsec_`)

### 2. Agregar el Secret a Variables de Entorno

En Render Dashboard:

1. Ve a tu proyecto `financial-coach-website`
2. Settings → Environment
3. Agrega: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`
4. Haz clic en "Redeploy"

### 3. Eventos Soportados

El sistema maneja automáticamente:

| Evento | Acción |
|--------|--------|
| `customer.subscription.created` | Registra nueva suscripción |
| `customer.subscription.updated` | Actualiza suscripción |
| `customer.subscription.deleted` | Marca como cancelada |
| `invoice.payment_succeeded` | Confirma pago |
| `invoice.payment_failed` | Registra fallo de pago |

### 4. Probar Webhooks Localmente

Usa Stripe CLI para probar:

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Escuchar eventos
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copiar el signing secret
# Usar en .env.local: STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# En otra terminal, disparar evento de prueba
stripe trigger customer.subscription.created
```

### 5. Verificar en Dashboard

1. Ve a https://dashboard.stripe.com/webhooks
2. Selecciona tu endpoint
3. Verifica que los eventos se están recibiendo (status 200)

## Próximos Pasos

- [ ] Agregar base de datos para guardar suscripciones
- [ ] Enviar confirmaciones por email
- [ ] Implementar portal de gestión de suscripciones
- [ ] Agregar soporte para cancelaciones

## Troubleshooting

**Problema**: Los webhooks no se reciben
- Verifica que la URL es correcta
- Asegúrate que el endpoint está activo (verde en dashboard)
- Revisa los logs en Stripe Dashboard

**Problema**: Error 401 en webhooks
- Verifica que `STRIPE_WEBHOOK_SECRET` está configurado
- Asegúrate que es el secret correcto (no el API key)

**Problema**: Eventos duplicados
- Stripe puede enviar eventos múltiples veces
- Implementa idempotencia usando el ID del evento
