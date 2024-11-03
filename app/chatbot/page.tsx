'use client';
import { useSession, signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import Header from '../components/Header/Header';

interface Message {
  role: string;
  content: string;
}

const ChatbotPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  if (status === 'loading') {
    return <p>Cargando...</p>; 
  }

  if (!session || !session.user) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center p-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/FondoChatbot2.png')"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10">
          <Header />
          <p className="text-white mb-4">Acceso denegado. <br/>Debes iniciar sesión antes de usar nuestro chatbot.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => signIn()}
          >
            Iniciar sesión
          </button>
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
    } catch (error) {
      console.error('Error fetching the bot response:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4">
      {/* Capa de fondo con imagen */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/FondoChatbot.jpg')"
        }}
      >
        {/* Overlay usando la sintaxis moderna de Tailwind para opacity */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header />
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
                  {msg.content}
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
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;