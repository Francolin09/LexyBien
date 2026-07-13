import React from 'react';
import SpecialtyCard from '@/app/components/team/specialtyCard';
import Image from "next/image";
import { Scale, Home, Users, Shield } from 'lucide-react';

const TeamSection: React.FC = () => {
  const specialties = [
    {
      name: 'Derecho Penal',
      description: 'Defensa especializada en delitos y faltas, garantizando el debido proceso y la protección de tus derechos fundamentales.',
      icon: <Shield size={40} />,
      color: 'bg-red-500',
    },
    {
      name: 'Derecho Civil',
      description: 'Asesoría en contratos, responsabilidad civil, sucesiones y todo lo relacionado con las relaciones entre particulares.',
      icon: <Scale size={40} />,
      color: 'bg-blue-500',
    },
    {
      name: 'Derecho Inmobiliario',
      description: 'Especialistas en compraventa, arriendos, regularización de títulos y toda la normativa relacionada con bienes raíces.',
      icon: <Home size={40} />,
      color: 'bg-green-500',
    },
    {
      name: 'Derecho de Familia',
      description: 'Protección de los derechos familiares, divorcios, pensión alimenticia, cuidado personal y adopciones.',
      icon: <Users size={40} />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section
      id="equipo"
      className="relative min-h-screen py-24 flex items-center bg-gradient-to-b "
    >
      {/* Imagen de fondo con opacidad */}
      <div className="absolute inset-0">
        <Image
          src="/images/fondoTeam.jpg"
          alt="Background"
          className="w-full h-full object-cover " // Ajusta la opacidad aquí
          width={100} height={100} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" /> {/* Capa adicional de opacidad */}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white leading-tight">
          Nuestras Especialidades Legales
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
          Áreas de expertise donde brindamos asesoría especializada y profesional
        </p>
        <div className="w-32 h-1 bg-blue-400 mx-auto rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {specialties.map((specialty, index) => (
          <div key={index}>
            <SpecialtyCard {...specialty} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;