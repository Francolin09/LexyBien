'use client';
import Image from 'next/image';

const Servicios = () => {
  return (
    <section id='servicios'>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-110">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src={"/images/ImgServicios.jpg"}  
          alt="Fondo de justicia"
          fill
          className="object-cover" 
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Nuestros Servicios Legales</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Servicio 1: Consulta Legal Rápida */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consulta Legal Rápida</h2>
            <p className="text-gray-600">
              Realiza una consulta legal a Lexy, nuestro chatbot altamente capacitado para resolver todo tipo de dudas, siempre estará disponible para resolver tus dudas al momento de que las tengas. <br />
              ¡No dudes en usarlo!
            </p>
            <button className="mt-6 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Consulta Lexy
            </button>
          </div>

          {/* Servicio 2: Seguimiento de Casos */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seguimiento de Casos</h2>
            <p className="text-gray-600">
              Mantente informado sobre el estado de tus casos en todo momento. Proporcionamos actualizaciones detalladas y oportunas.
            </p>
            <button className="mt-6 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Verificar Caso
            </button>
          </div>

          {/* Servicio 3: Asesoramiento Personalizado */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asesoramiento Personalizado</h2>
            <p className="text-gray-600">
              Recibe asesoramiento personalizado por uno de nuestros especialistas, no importa el problema siempre estaremos para ayudarte. <br></br>
              No dudes en ponerte en contacto con nosotros!
            </p>
            <button className="mt-6 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
