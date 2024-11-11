
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, previousMessages } = await request.json(); 

    const prompt = `Eres Lexy, un asistente legal especializado en leyes chilenas. Primero preséntate como tal y luego responde solo a preguntas 
    relacionadas con legislación, derechos, paternidad, deberes, denuncias y normativas chilenas. También necesito que tus respuestas estén en un formato 
    legible con saltos de línea, espacios y todo lo que debería incluir la respuesta de un chatbot.
    Si una pregunta no está relacionada con estos temas, responde de manera cordial diciendo: 
    "Este chatbot está especializado en temas legales de Chile. Por favor, formula una pregunta relacionada con leyes chilenas."
    Hay posibilidad de que el usuario te salude, puedes responderle, pero siempre indicandole que eres un chat especializado en resolver sus dudas
    legales.
    SOLO cuando el usuario pregunte algo relacionado con leyes chilenas, respondele como te indiqué y aparte al final de tu respuesta, necesito que,
    en el mismo mensaje le comentes literalmente esto: Si deseas crear una consulta puedes hacerlo dando click en el boton 'CREAR CONSULTA' abajo del chat.`;

    
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


