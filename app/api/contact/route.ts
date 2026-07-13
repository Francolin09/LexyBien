import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, rut, correo, mensaje } = await request.json();

    // Validaciones básicas
    if (!nombre || !rut || !correo || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido' },
        { status: 400 }
      );
    }

    // Validación básica de RUT chileno (formato simple)
    const rutRegex = /^[0-9]+-[0-9kK]$/;
    if (!rutRegex.test(rut)) {
      return NextResponse.json(
        { error: 'El formato del RUT no es válido (ejemplo: 12345678-9)' },
        { status: 400 }
      );
    }

    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Configuración de email no disponible. Por favor, contacta al administrador.' },
        { status: 500 }
      );
    }

    const fecha = new Date().toLocaleString('es-CL', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const nombreSafe = escapeHtml(nombre);
    const rutSafe = escapeHtml(rut);
    const correoSafe = escapeHtml(correo);
    const mensajeSafe = escapeHtml(mensaje).replace(/\n/g, '<br>');

    // Enviar email usando Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'BYM Legal Asesorías <asesorias@bymlegal.cl>',
        to: ['asesorias.bymlegal@gmail.com'],
        replyTo: correo,
        subject: `[Formulario web] Nueva consulta de ${nombre}`,
        text: [
          'Nueva consulta legal - BYM Legal',
          '',
          'Datos del cliente:',
          `Nombre: ${nombre}`,
          `RUT: ${rut}`,
          `Correo: ${correo}`,
          `Fecha: ${fecha}`,
          '',
          'Mensaje:',
          mensaje,
          '',
          '---',
          'Enviado desde el formulario de contacto de bymlegal.cl',
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f5;">
            <div style="background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
              <h2 style="color: #1e3a5f; margin: 0 0 8px; font-size: 22px;">
                Nueva consulta legal
              </h2>
              <p style="color: #6b7280; margin: 0 0 24px; font-size: 14px;">
                Formulario de contacto · BYM Legal
              </p>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 12px; background-color: #f8fafc; border: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 120px;">Nombre</td>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; color: #111827;">${nombreSafe}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #f8fafc; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">RUT</td>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; color: #111827;">${rutSafe}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #f8fafc; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Correo</td>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; color: #111827;">
                    <a href="mailto:${correoSafe}" style="color: #1d4ed8; text-decoration: none;">${correoSafe}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #f8fafc; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Fecha</td>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; color: #111827;">${fecha}</td>
                </tr>
              </table>

              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <h3 style="color: #1e3a5f; margin: 0 0 12px; font-size: 16px;">Mensaje</h3>
                <p style="color: #374151; line-height: 1.6; margin: 0;">${mensajeSafe}</p>
              </div>

              <p style="color: #9ca3af; font-size: 12px; margin: 24px 0 0; text-align: center;">
                Puedes responder directamente a este correo para contactar al cliente.
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Error enviando email:', error);
        return NextResponse.json(
          { error: 'Error enviando el mensaje. Por favor, intenta nuevamente.' },
          { status: 500 }
        );
      }

      console.log('Email enviado exitosamente:', data);
      
      return NextResponse.json(
        { message: 'Mensaje enviado correctamente. Te contactaremos pronto.' },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Error en el envío de email:', emailError);
      return NextResponse.json(
        { error: 'Error enviando el mensaje. Por favor, intenta nuevamente.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error procesando formulario de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
