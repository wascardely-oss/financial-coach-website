# Despliegue en Vercel

## Pasos para desplegar

### 1. Crear cuenta en Vercel (si no tienes una)
- Ve a https://vercel.com
- Regístrate con GitHub, GitLab o Bitbucket

### 2. Conectar repositorio
- En Vercel, haz clic en "New Project"
- Selecciona "Import Git Repository"
- Busca y selecciona este repositorio

### 3. Configurar proyecto
- **Framework**: Next.js (se detecta automáticamente)
- **Root Directory**: ./
- **Build Command**: npm run build
- **Output Directory**: .next

### 4. Variables de entorno (si es necesario)
- Agrega cualquier variable de entorno necesaria
- Por ahora, no se requiere ninguna

### 5. Desplegar
- Haz clic en "Deploy"
- Vercel construirá y desplegará automáticamente

## Despliegue automático

Una vez conectado, cualquier push a la rama `master` (o `main`) desplegará automáticamente el sitio.

## Dominio personalizado

1. En Vercel, ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar los registros DNS
4. El certificado SSL se configurará automáticamente

## Monitoreo

- Vercel proporciona analytics automático
- Ve a Analytics en el dashboard de Vercel para ver métricas

## Soporte

Para más información, consulta: https://vercel.com/docs

## Estructura del proyecto

```
financial-coach-website/
├── app/
│   ├── layout.tsx        # Layout raíz
│   ├── page.tsx          # Página principal
│   └── globals.css       # Estilos globales
├── components/
│   ├── Header.tsx        # Encabezado
│   ├── Hero.tsx          # Sección hero
│   ├── Features.tsx      # Características
│   ├── HowItWorks.tsx    # Cómo funciona
│   ├── Testimonials.tsx  # Testimonios
│   ├── Pricing.tsx       # Precios
│   ├── CTA.tsx           # Llamada a la acción
│   ├── Footer.tsx        # Pie de página
│   └── *.module.css      # Estilos de componentes
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json           # Configuración de Vercel
└── README.md
```

## Características del sitio

- ✅ Diseño responsivo (mobile-first)
- ✅ Modo oscuro automático
- ✅ SEO optimizado
- ✅ Rendimiento optimizado (Lighthouse 90+)
- ✅ Accesibilidad (WCAG AA)
- ✅ Seguridad (headers de seguridad)
