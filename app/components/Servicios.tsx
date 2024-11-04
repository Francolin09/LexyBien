'use client';
import Image from 'next/image';
import { MessageSquare, FileSearch, Users } from 'lucide-react';

const Servicios = () => {
  return (
    <section id='servicios' className="relative min-h-screen flex items-center justify-center py-20">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src={"/images/ImgServicios.jpg"}  
          alt="Fondo de justicia"
          fill
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Nuestros Servicios Legales
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Servicio 1: Consulta Legal Rápida */}
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <MessageSquare size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Consulta Legal Rápida
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Realiza una consulta legal a Lexy, nuestro chatbot altamente capacitado para resolver todo tipo de dudas, siempre estará disponible para resolver tus dudas al momento de que las tengas.
              <br />
              <span className="text-blue-600 font-medium">¡No dudes en usarlo!</span>
            </p>
            <div className="flex justify-center">
              <button className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                Consulta Lexy
              </button>
            </div>
          </div>

          {/* Servicio 2: Seguimiento de Casos */}
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <FileSearch size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Seguimiento de Casos
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Mantente informado sobre el estado de tus casos en todo momento. Proporcionamos actualizaciones detalladas y oportunas para que siempre estés al tanto de tu situación legal.
            </p>
            <div className="flex justify-center">
              <button className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                Verificar Caso
              </button>
            </div>
          </div>

          {/* Servicio 3: Asesoramiento Personalizado */}
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <Users size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Asesoramiento Personalizado
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Recibe asesoramiento personalizado por uno de nuestros especialistas, no importa el problema siempre estaremos para ayudarte.
              <br />
              <span className="text-blue-600 font-medium">¡No dudes en ponerte en contacto con nosotros!</span>
            </p>
            <div className="flex justify-center">
              <button className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                <a href="#Contacto">Solicitar Asesoría</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default Servicios;