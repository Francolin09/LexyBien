'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const rutachatbot = () => {
    router.push('/');
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
  

    // Realiza el intento de login
    const result = await signIn('credentials', { 
      email, 
      password, 
      redirect: false // Desactiva la redirección automática
    });

  
    // Verifica error
    if (result?.error) {
      setError('Credenciales inválidas. Intenta de nuevo.'); 
    } else {
      // Redirigir manualmente en caso de que funcione okeys
      rutachatbot()
    }
  };

  return (
    <div>
    <Header/>
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-white text-3xl mb-6">Iniciar sesión</h1>
      <div className="w-full max-w-md bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden p-6">
        {/* Mostrar el mensaje de error si existe */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-2">Email:</label>
            <input 
              className="p-2 bg-gray-800 rounded border border-gray-600" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Contraseña:</label>
            <input 
              className="p-2 bg-gray-800 rounded border border-gray-600" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            onClick={rutachatbot}
            type="submit" 
            className="bg-gray-900 p-2 rounded hover:bg-gray-800 transition-all text-white"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
