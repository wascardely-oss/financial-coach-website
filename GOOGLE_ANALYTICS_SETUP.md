# Configurar Google Analytics

## 🔍 ¿Por qué Google Analytics?

Google Analytics te permite:
- 📊 Ver cuántos visitantes tienes
- 🌍 Saber de dónde vienen los usuarios
- ⏱️ Medir el tiempo que pasan en el sitio
- 🎯 Rastrear conversiones (descargas de app, contactos)
- 📱 Analizar comportamiento en móvil vs desktop

## 📋 Pasos para Configurar

### 1. Crear Cuenta de Google Analytics

1. Ve a https://analytics.google.com
2. Haz clic en "Crear cuenta"
3. Completa los detalles:
   - **Nombre de cuenta**: Financial Coach
   - **Nombre de propiedad**: Financial Coach Website
   - **Zona horaria**: Tu zona horaria
   - **Moneda**: USD (o tu moneda)

### 2. Crear Propiedad Web

1. Selecciona "Web" como tipo de propiedad
2. URL: `https://tu-dominio.com`
3. Haz clic en "Crear propiedad"

### 3. Obtener Google Analytics ID

1. En el panel, ve a **Admin** (engranaje)
2. Selecciona tu propiedad
3. Ve a **Detalles de la propiedad**
4. Copia el **ID de medición** (comienza con `G-`)

### 4. Agregar ID al Sitio

**Opción A: Variable de Entorno (Recomendado)**

1. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Reemplaza `G-XXXXXXXXXX` con tu ID real

3. Redeploy en Render:
   - En Render Dashboard → Settings → Environment
   - Agrega la variable `NEXT_PUBLIC_GA_ID`
   - Haz clic en "Redeploy"

**Opción B: Editar Directamente**

En `app/analytics.tsx`, reemplaza:
```typescript
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
```

Con tu ID real:
```typescript
const GA_ID = 'G-XXXXXXXXXX';
```

### 5. Verificar que Funciona

1. Abre tu sitio en el navegador
2. Ve a Google Analytics → Tiempo real
3. Deberías ver tu sesión activa
4. Navega por el sitio y verifica que se registren las páginas

## 📊 Métricas Importantes

Una vez configurado, podrás ver:

| Métrica | Descripción |
|---------|------------|
| **Usuarios** | Número de visitantes únicos |
| **Sesiones** | Número de visitas |
| **Duración promedio de sesión** | Cuánto tiempo pasan en el sitio |
| **Tasa de rebote** | % de usuarios que se van sin interactuar |
| **Páginas por sesión** | Cuántas páginas visitan en promedio |
| **Ubicación** | De dónde vienen los usuarios |
| **Dispositivo** | Móvil, desktop, tablet |

## 🎯 Configurar Conversiones (Opcional)

Para rastrear descargas de app o contactos:

1. Ve a **Admin** → **Conversiones**
2. Haz clic en **Crear evento de conversión**
3. Selecciona eventos como:
   - `contact_form_submit` (cuando envían el formulario)
   - `app_download` (cuando hacen clic en descargar)

## 🔒 Privacidad y Cumplimiento

- ✅ Google Analytics es GDPR compatible
- ✅ Los datos se anonimizarán automáticamente
- ✅ Agrega un aviso de cookies si es necesario (especialmente en EU)

## 📚 Recursos

- **Documentación oficial**: https://support.google.com/analytics
- **Guía de configuración**: https://support.google.com/analytics/answer/1008015
- **Eventos personalizados**: https://support.google.com/analytics/answer/9322688

---

**¿Necesitas ayuda?** Contacta al soporte de Google Analytics en la plataforma.
