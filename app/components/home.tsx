// app/page.tsx (para la nueva estructura de Next.js 13+)
// o
// pages/index.tsx (para la estructura tradicional de Next.js)
'use client'
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="relative h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src={"/images/fondoIndex.jpg"}
          alt="Fondo de justicia" // Texto alternativo descriptivo
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        {/* Logo */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full mb-4"></div>

        {/* Texto principal */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Confía en la justicia: soluciones legales con innovación.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Nuestro equipo de expertos y un avanzado chatbot están aquí para ayudarte en cada paso.
        </p>

        {/* Botón del Chatbot */}
        <button className="bg-black text-white py-3 px-6 rounded-full shadow-lg hover:bg-gray-800 transition">
          ➤ ChatBot
        </button>
      </div>

      {/* Barra de navegación */}
      <nav className="absolute top-0 left-0 right-0 z-20 bg-transparent p-6 flex justify-between items-center text-white">
        <ul className="flex space-x-8">
          <li><a href="#" className="hover:text-gray-300">Inicio</a></li>
          <li><a href="#" className="hover:text-gray-300">Servicios</a></li>
          <li><a href="#" className="hover:text-gray-300">Equipo</a></li>
          <li><a href="#" className="hover:text-gray-300">Algo</a></li>
        </ul>
        <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
      </nav>
    </div>
  );
};

export default HomePage;
