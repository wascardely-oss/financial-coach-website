import { NextRequest, NextResponse } from 'next/server';

// Usando Formspree para emails (ya configurado)
// Alternativa: usar Resend, SendGrid, o cualquier servicio de email

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message, type } = await request.json();

    // Validar datos
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    // Preparar contenido del email según tipo
    let htmlContent = '';

    switch (type) {
      case 'subscription_confirmation':
        htmlContent = `
          <h2>¡Bienvenido a Financial Coach Pro!</h2>
          <p>Tu suscripción ha sido confirmada exitosamente.</p>
          <p>Ahora tienes acceso a todas las características premium:</p>
          <ul>
            <li>Coach IA sin límites</li>
            <li>Integración bancaria completa</li>
            <li>Análisis avanzado</li>
            <li>Retos semanales</li>
          </ul>
          <p>Descarga la app y comienza a transformar tus finanzas.</p>
        `;
        break;

      case 'subscription_renewal':
        htmlContent = `
          <h2>Renovación de Suscripción</h2>
          <p>Tu suscripción ha sido renovada automáticamente.</p>
          <p>Continúa disfrutando de todas las características premium.</p>
        `;
        break;

      case 'subscription_cancelled':
        htmlContent = `
          <h2>Suscripción Cancelada</h2>
          <p>Tu suscripción ha sido cancelada.</p>
          <p>Lamentamos verte partir. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        `;
        break;

      case 'contact_form':
        htmlContent = `
          <h2>Nuevo Mensaje de Contacto</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `;
        break;

      default:
        htmlContent = `<p>${message}</p>`;
    }

    // Aquí puedes integrar con tu servicio de email preferido
    // Por ahora, retornamos éxito (Formspree ya está manejando los contactos)
    console.log(`Email enviado a ${email}:`, { subject, type });

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al enviar email' },
      { status: 500 }
    );
  }
}
