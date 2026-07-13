'use client';
import Image from 'next/image';
import { MessageSquare, FileSearch, Users } from 'lucide-react';
import Link from 'next/link';

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
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            Nuestros Servicios Legales
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Ofrecemos una amplia gama de servicios legales profesionales para satisfacer todas tus necesidades jurídicas
          </p>
          <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Servicio 1: Consulta Legal Rápida */}
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-10 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl flex flex-col">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <MessageSquare size={56} className="text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Consulta Legal Rápida
            </h2>
            <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
            Obtén respuestas inmediatas a tus dudas legales más urgentes. Nuestro equipo entrega orientación clara y precisa para que avances con seguridad sin perder tiempo.
            </p>
            <div className="flex justify-center mt-auto">
              <a href="#Contacto">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Consulta Rápida
                </button>
              </a>
            </div>
          </div>

          {/* Servicio 2: Atención 24hrs */}
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-10 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl flex flex-col">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-green-100 rounded-2xl">
                <FileSearch size={56} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Atención 24hrs
            </h2>
            <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
            Estamos disponibles día y noche para ti. Con nuestra atención 24/7, siempre contarás con apoyo legal oportuno, sin importar la hora ni el lugar.
            </p>
            <div className="flex justify-center mt-auto">
              <a href="#Contacto">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contactar Ahora
                </button>
              </a>
            </div>
          </div>

          {/* Servicio 3: Asesoramiento Personalizado */}
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-10 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl flex flex-col">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-purple-100 rounded-2xl">
                <Users size={56} className="text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Asesoramiento Personalizado
            </h2>
            <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
            Recibe un servicio cercano y adaptado a tu caso. Nuestros profesionales analizan tu situación en detalle para brindarte soluciones legales hechas a tu medida.
              <br />
              <span className="text-purple-600 font-semibold">¡No dudes en ponerte en contacto con nosotros!</span>
            </p>
            <div className="flex justify-center mt-auto">
              <a href="#Contacto">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Solicitar Asesoría
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default Servicios;