# Despliegue en Render - Guía Completa

## 🚀 Desplegar Financial Coach Website en Render

Render es una plataforma moderna que facilita el despliegue de aplicaciones Next.js con SSL automático y dominio personalizado.

### Paso 1: Crear Cuenta en Render

1. Ve a https://render.com
2. Haz clic en "Sign Up"
3. Usa tu cuenta de GitHub para registro rápido
4. Autoriza a Render para acceder a tus repositorios

### Paso 2: Conectar Repositorio

1. En el dashboard de Render, haz clic en "New +"
2. Selecciona "Web Service"
3. Busca y selecciona: `financial-coach-website`
4. Haz clic en "Connect"

### Paso 3: Configurar Despliegue

**Configuración Automática (Render detecta Next.js):**
- **Name**: `financial-coach-website`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free (o Starter si quieres mejor rendimiento)

**Variables de Entorno:**
- `NODE_ENV`: `production`

### Paso 4: Desplegar

1. Haz clic en "Create Web Service"
2. Render compilará e instalará dependencias (2-3 minutos)
3. Una vez completado, verás la URL: `https://financial-coach-website-xxxx.onrender.com`

### Paso 5: Configurar Dominio Personalizado (Opcional)

1. En Settings → Custom Domain
2. Agrega tu dominio (ej: `coach-financiero.com`)
3. Sigue las instrucciones para apuntar DNS
4. Render configura SSL automáticamente

### Paso 6: Verificar Despliegue

Abre tu URL y verifica:
- ✅ Header carga correctamente
- ✅ Todas las secciones son visibles
- ✅ Modo oscuro funciona
- ✅ Responsive en móvil

### 📊 Monitoreo

En el dashboard de Render:
- **Logs**: Ver errores en tiempo real
- **Metrics**: CPU, memoria, requests
- **Deployments**: Historial de despliegues

### 🔄 Despliegues Automáticos

Cada vez que hagas push a GitHub:
1. Render detecta el cambio automáticamente
2. Compila e instala dependencias
3. Despliega la nueva versión
4. Cero downtime

### ❌ Solucionar Problemas

**Error: "Build failed"**
- Revisa los logs en Render
- Verifica que `npm run build` funciona localmente
- Asegúrate de que todas las dependencias están en `package.json`

**Error: "Port not available"**
- Render asigna automáticamente el puerto
- No necesitas configurar nada

**Sitio lento**
- Usa plan Starter en lugar de Free
- Agrega caching en headers
- Optimiza imágenes

### 💡 Tips

- **Redeploy**: En Settings → Manual Deploy
- **Logs en vivo**: Haz clic en "Logs" para ver errores en tiempo real
- **Rollback**: Puedes volver a un despliegue anterior en "Deployments"

---

**¿Necesitas ayuda?** Contacta a soporte de Render: https://render.com/docs
