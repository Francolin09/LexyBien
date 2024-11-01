'use client';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';



  
const ChatbotPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
   
  
  // Manejar el estado de carga de la sesión
  if (status === 'loading') {
    return <p>Cargando...</p>; 
  }

  // Si el usuario no está autenticado
  if (!session || !session.user) {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
        <Header/>
        <p className="text-white mb-4">Acceso denegado. Debes iniciar sesión.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn()} // Inicia sesión al hacer clic
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  // Función para manejar el envío del mensaje
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = { role: 'user', content: input };
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

  // Si el usuario está autenticado, renderiza el chatbot
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
      <Header/>
      <h1 className='text-4xl mb-5 text-white'>Lexy, tu asistente legal virtual</h1>
      <div className="w-full max-w-lg bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 h-96 overflow-y-scroll">
          {messages.map((msg, idx) => (
            <div key={idx} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200'
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 text-black rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
            Enviar
          </button>
        </form>
      </div>
     </div>
      
  );
};

export default ChatbotPage;

