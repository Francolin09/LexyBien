'use client';
import Image from 'next/image';

const Servicios = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen py-12">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image 
          src={"/images/ImgServicios.jpg"}  
          alt="Fondo de justicia"
          fill
          className="object-fill"
          // priority // Prioriza la carga de esta imagen, útil para one page
        />
      </div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Nuestros Servicios Legales</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Servicio 1: Consulta Legal Rápida */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consulta Legal Rápida</h2>
            <p className="text-gray-600">
              Obtén respuestas inmediatas a tus dudas legales. Nuestro equipo está disponible para ayudarte con consultas rápidas y precisas.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Solicitar Consulta
            </button>
          </div>

          {/* Servicio 2: Seguimiento de Casos */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seguimiento de Casos</h2>
            <p className="text-gray-600">
              Mantente informado sobre el estado de tus casos en todo momento. Proporcionamos actualizaciones detalladas y oportunas.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Verificar Caso
            </button>
          </div>

          {/* Servicio 3: Asesoramiento Personalizado */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asesoramiento Personalizado</h2>
            <p className="text-gray-600">
              Recibe asesoramiento personalizado basado en tus necesidades y circunstancias específicas. Estamos aquí para guiarte en cada paso.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Solicitar Asesoría
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
