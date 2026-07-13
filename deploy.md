# Guía de Despliegue en Vercel

## Pasos para Desplegar bymlegal

### 1. Preparación del Proyecto

Asegúrate de que el proyecto esté listo:

```bash
# Instalar dependencias
npm install

# Verificar que no hay errores
npm run build

# Ejecutar tests (opcional)
npm test
```

### 2. Despliegue en Vercel

#### Opción A: Desde GitHub (Recomendado)

1. **Sube el código a GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Vercel"
   git push origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configuración del proyecto:**
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `./` (por defecto)
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)

#### Opción B: Desde Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Despliega:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones:**
   - ¿En qué directorio está tu código? `./`
   - ¿Quieres modificar la configuración? `N`
   - ¿Quieres conectar con un proyecto existente? `N`

### 3. Configuración del Dominio Personalizado

1. **En el Dashboard de Vercel:**
   - Ve a tu proyecto
   - Click en "Settings"
   - Click en "Domains"

2. **Agregar dominio:**
   - Ingresa tu dominio: `bymlegal.com`
   - Click en "Add"

3. **Configurar DNS:**
   - Vercel te dará registros DNS específicos
   - Configúralos en tu proveedor de dominio:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### 4. Variables de Entorno

**Configuración requerida para el formulario de contacto:**

1. **Crear cuenta en Resend:**
   - Ve a [resend.com](https://resend.com)
   - Crea una cuenta gratuita (3,000 emails/mes gratis)
   - Obtén tu API key

2. **En Vercel Dashboard:**
   - Ve a "Settings" > "Environment Variables"
   - Agrega las variables necesarias:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     NEXT_PUBLIC_APP_URL=https://bymlegal.com
     ```

3. **Para desarrollo local:**
   - Crea archivo `.env.local` en la raíz del proyecto
   - Agrega tu API key de Resend

### 5. Verificación Post-Despliegue

1. **Verifica que el sitio funcione:**
   - Visita tu dominio
   - Prueba el formulario de contacto
   - Verifica que todas las secciones carguen correctamente

2. **Verifica la seguridad:**
   - Usa [securityheaders.com](https://securityheaders.com) para verificar headers
   - Verifica que HTTPS esté funcionando

3. **Verifica SEO:**
   - Usa [Google Search Console](https://search.google.com/search-console)
   - Verifica que el sitemap esté accesible: `https://bymlegal.com/sitemap.xml`

### 6. Configuración Adicional

#### SSL/HTTPS
- Vercel maneja automáticamente los certificados SSL
- HTTPS se activa automáticamente

#### CDN
- Vercel incluye CDN global automáticamente
- Las imágenes se optimizan automáticamente

#### Monitoreo
- Vercel incluye analytics básicos
- Para más detalles, considera integrar Google Analytics

### 7. Mantenimiento

#### Actualizaciones
- Cada push a la rama principal desplegará automáticamente
- Para cambios manuales, usa `vercel --prod`

#### Backup
- El código está en GitHub (backup automático)
- Vercel mantiene backups de despliegues anteriores

### 8. Troubleshooting

#### Problemas Comunes

1. **Error de build:**
   ```bash
   # Verifica localmente
   npm run build
   ```

2. **Error 404 en rutas:**
   - Verifica que `vercel.json` esté configurado correctamente

3. **Formulario no funciona:**
   - Verifica que la API `/api/contact` esté desplegada
   - Revisa los logs en Vercel Dashboard

#### Logs y Debugging
- Ve a Vercel Dashboard > Functions > View Function Logs
- Usa `vercel logs` en la terminal

### 9. Optimizaciones Adicionales

#### Performance
- Las imágenes se optimizan automáticamente
- El CSS se minifica automáticamente
- JavaScript se code-splits automáticamente

#### SEO
- Metadatos configurados en `layout.tsx`
- Sitemap incluido
- Robots.txt configurado

¡Tu sitio estará listo y optimizado para producción!
