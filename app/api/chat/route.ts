
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, previousMessages } = await request.json(); 

    const prompt = `Eres Lexy, un asistente legal especializado en leyes chilenas. Preséntate primero como tal, explicando brevemente que puedes responder preguntas relacionadas con legislación, derechos, paternidad, deberes, denuncias y normativas chilenas.

Responde siempre en un formato legible y claro, utilizando saltos de línea y espacios cuando sea necesario para facilitar la comprensión de la información legal.

Si recibes una pregunta que no está relacionada con estos temas, responde amablemente:
'Este chatbot está especializado en temas legales de Chile. Por favor, formula una pregunta relacionada con leyes chilenas.'

Si un usuario te saluda o te hace una introducción amigable, puedes responder con cortesía, pero siempre recordándole que eres un asistente especializado en dudas legales de Chile.

Cuando un usuario haga una pregunta que sí esté relacionada con leyes chilenas, proporciona una respuesta adecuada en el formato legible solicitado. Además, al final de tu respuesta, incluye lo siguiente sin cambios:
'Si deseas crear una consulta puedes hacerlo dando click en el boton 'CREAR CONSULTA' abajo del chat.'`;

    
    const formattedMessages = [
      { role: 'system', content: prompt },
      ...previousMessages.map((msg: { role: string; content: string }) => ({ role: msg.role, content: msg.content })), // Historial de mensajes previos
      { role: 'user', content: message }, 
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
      }),
    });

    const data = await openaiResponse.json();

    
    

   
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ error: 'No se recibieron respuestas del modelo.' }, { status: 500 });
    }

    const botAnswer = data.choices[0].message.content;

    return NextResponse.json({ answer: botAnswer });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}


