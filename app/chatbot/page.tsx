'use client';

import { useSession } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import Header from '../components/Header/Header';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/navigation';



interface Message {
  role: string;
  content: string;
}

const ChatbotPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [mostrarBotonConsulta, setmostrarBotonConsulta] = useState(false);
  const router = useRouter();

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  const rutahome = () => {
    router.push('/');
  };
  if (!session || session.user.rol !== 'usuario') {
    return (
      <div>
        <Header />
        <div className="relative min-h-screen flex flex-col justify-center items-center p-4">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/FondoChatbot2.png')" }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10">
            <p className="text-white mb-4">Acceso denegado. <br />Debes iniciar sesión como USUARIO antes de usar nuestro chatbot.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={rutahome}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, previousMessages: messages }),
      });

      const data = await response.json();
      setMessages([...messages, userMessage, { role: 'assistant', content: data.answer }]);
      if (data.answer.includes("Si deseas crear una consulta puedes hacerlo dando click en el boton 'CREAR CONSULTA' abajo del chat")) {
        setmostrarBotonConsulta(true);
      }
    } catch (error) {
      console.error('Error fetching the bot response:', error);
    }
  };

  const creacionconsulta = async () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
    const mensaje = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n');
  
    const consulta = {
      mensaje,
      usuarioId: session?.user?.id,
      abogadoId: "no",
      estado: "no asignado",
      fecha_creacion: formattedDate,
    };
  
    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consulta),
      });
  
      if (response.ok) {
        setmostrarBotonConsulta(false);
        alert('Consulta creada exitosamente.');
        rutahome()
      } else {
        throw new Error('Error en la creación de la consulta');
      }
    } catch (error) {
      console.error('Error creating consulta:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="relative min-h-screen flex flex-col justify-center items-center p-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/FondoChatbot.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center ">
          <h1 className="text-4xl mb-5 text-white font-bold">
            Lexy, tu asistente legal virtual
          </h1>
          <div className="w-full max-w-lg bg-gray-700/90 text-white rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
            <div className="p-4 h-96 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600/90 text-gray-200'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>
            </form>
            {mostrarBotonConsulta && (
              <button 
                onClick={creacionconsulta} 
                className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Crear consulta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;