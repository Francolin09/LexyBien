# 📧 Configuración de Email - LexyBien

## 🚨 Error del Formulario de Contacto

Si estás viendo errores al enviar el formulario, es porque falta configurar la API key de Resend.

## 🔧 Pasos para Solucionarlo:

### 1. Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Haz clic en "Sign Up"
3. Regístrate con tu email (es gratis)
4. Verifica tu email

### 2. Obtener API Key
1. Una vez logueado, ve a "API Keys"
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "LexyBien Production")
4. Copia la API key (empieza con `re_`)

### 3. Configurar Variables de Entorno

**Para desarrollo local:**
1. Crea un archivo llamado `.env.local` en la raíz del proyecto
2. Agrega esta línea:
```bash
RESEND_API_KEY=re_tu_api_key_aqui
```

**Para producción en Vercel:**
1. Ve a tu proyecto en Vercel Dashboard
2. Ve a "Settings" > "Environment Variables"
3. Agrega:
   - Name: `RESEND_API_KEY`
   - Value: `re_tu_api_key_aqui`

### 4. Reiniciar el Servidor
Después de crear el archivo `.env.local`:
```bash
# Detener el servidor (Ctrl+C)
# Luego ejecutar:
npm run dev
```

## ✅ Verificar que Funciona

1. Abre el formulario de contacto
2. Completa todos los campos
3. Envía el formulario
4. Deberías ver: "¡Mensaje enviado correctamente! Te contactaremos pronto."
5. Revisa el email `asesorias.bymlegal@gmail.com`

## 🆘 Si Sigue Fallando

### Verificar en la Consola del Navegador:
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Envía el formulario
4. Revisa si hay errores en rojo

### Verificar en la Consola del Servidor:
1. En la terminal donde ejecutas `npm run dev`
2. Busca mensajes de error relacionados con Resend

### Errores Comunes:

**"RESEND_API_KEY no está configurada"**
- El archivo `.env.local` no existe o no tiene la variable correcta

**"Invalid API key"**
- La API key está mal copiada o es inválida

**"Domain not verified"**
- Para usar `asesorias@bymlegal.cl` debes verificar el dominio `bymlegal.cl` en [resend.com/domains](https://resend.com/domains)
- Agrega los registros DNS que Resend te indique (SPF, DKIM, etc.)
- Hasta verificar el dominio, Resend rechazará el envío con error 403

## 📞 Soporte

Si necesitas ayuda adicional, revisa:
- [Documentación de Resend](https://resend.com/docs)
- [Guía de Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
