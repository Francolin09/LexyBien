import { POST } from '../app/api/chat/route';
import { NextResponse } from 'next/server';

global.fetch = jest.fn();

// Mocks para simular las respuestas de la API de OpenAI
const mockSuccessfulResponse = {
  choices: [{ message: { content: 'Respuesta simulada del bot' } }],
};

const mockErrorResponse = {
  choices: [],
};

describe('POST /chatbot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería responder exitosamente con una respuesta del bot', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockSuccessfulResponse),
    });

    const request = new Request('http://localhost/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        message: '¿Cuál es la ley de propiedad intelectual en Chile?',
        previousMessages: [],
      }),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(jsonResponse.answer).toBe('Respuesta simulada del bot');
  });

  it('debería manejar el caso en el que no se reciben respuestas del modelo', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    const request = new Request('http://localhost/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Consulta sin respuesta',
        previousMessages: [],
      }),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse.error).toBe('No se recibieron respuestas del modelo.');
  });

  it('debería manejar errores en el servidor', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error en la API de OpenAI'));

    const request = new Request('http://localhost/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Pregunta para causar un error',
        previousMessages: [],
      }),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse.error).toBe('Error procesando la solicitud');
  });
});
