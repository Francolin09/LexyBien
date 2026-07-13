'use client'
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="relative h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src={"/images/fondoIndex.jpg"}
          alt="Fondo de justicia" // Texto alternativo descriptivo
          fill
          className="object-fill"
        />
      </div>

      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal con max-width */}
        <div className="max-w-4xl mx-auto">
          {/* Texto principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            Confía en la justicia:<br />
            <span className="text-blue-300">soluciones legales</span> con innovación
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Nuestro equipo de expertos legales está aquí para brindarte asesoría profesional y confiable.
          </p>

          {/* Botón de Contacto */}
          <a href="#Contacto" className="inline-block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Contáctanos
            </button>
          </a>
        </div>
      </div>

      {/* Barra de navegación */}
      {/* <nav className="fixed top-0 left-0 right-0 z-20 bg-transparent p-6 flex justify-between items-center text-white">
        <ul className="flex space-x-8 ">
          <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
          <li><a href="#Servicios" className="hover:text-gray-300 ">Servicios</a></li>
          <li><a href="#TeamSection" className="hover:text-gray-300">Equipo</a></li>
          <li><a href="#Contact" className="hover:text-gray-300">Contactanos</a></li>
        </ul>
        <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
      </nav> */}
    </div>
  );
};

export default HomePage;
