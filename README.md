# LexyBien - Asesorías Legales Profesionales

Sitio web informativo para servicios de asesoría legal en Chile. Desarrollado con Next.js 15 y optimizado para Vercel.

## Características

- 🏛️ **Página informativa** sobre servicios legales
- 📝 **Formulario de contacto** con validación
- 📱 **Diseño responsive** con Tailwind CSS
- ⚡ **Optimizado para Vercel** con configuraciones de seguridad
- 🔒 **Headers de seguridad** configurados

## Tecnologías

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React, React Icons
- **Despliegue**: Vercel

## Desarrollo Local

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel

### Opción 1: Despliegue automático desde GitHub

1. Conecta tu repositorio de GitHub con Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. El despliegue se realizará automáticamente

### Opción 2: Despliegue manual

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega el proyecto:
```bash
vercel
```

3. Sigue las instrucciones en la terminal

### Configuración de Dominio Personalizado

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a "Settings" > "Domains"
3. Agrega tu dominio personalizado
4. Configura los registros DNS según las instrucciones de Vercel

## Configuración de Seguridad

El proyecto incluye headers de seguridad configurados en `vercel.json`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000
- Referrer-Policy: origin-when-cross-origin

## Estructura del Proyecto

```
├── app/
│   ├── api/contact/          # API del formulario de contacto
│   ├── components/           # Componentes React
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── public/images/           # Imágenes del sitio
├── vercel.json             # Configuración de Vercel
└── package.json            # Dependencias del proyecto
```

## Formulario de Contacto

El formulario incluye validación para:
- Nombre completo (requerido)
- RUT chileno (formato: 12345678-9)
- Email válido
- Mensaje (requerido)

Los mensajes se envían automáticamente por email a `asesorias.bymlegal@gmail.com` usando Resend.

### Configuración de Email

1. **Crear cuenta en Resend:**
   - Ve a [resend.com](https://resend.com)
   - Crea una cuenta gratuita
   - Obtén tu API key

2. **Configurar variables de entorno:**
   ```bash
   # Crear archivo .env.local
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Verificar dominio (opcional):**
   - Para usar `noreply@lexybien.com` necesitas verificar tu dominio
   - O puedes usar el dominio de prueba de Resend

## Personalización

Para personalizar el sitio:

1. **Contenido**: Edita los componentes en `app/components/`
2. **Estilos**: Modifica `app/globals.css` o usa clases de Tailwind
3. **Metadatos**: Actualiza `app/layout.tsx` y `app/page.tsx`
4. **Imágenes**: Reemplaza las imágenes en `public/images/`

## Soporte

Para soporte técnico o consultas sobre el proyecto, contacta al equipo de desarrollo.
