import Image from 'next/image';
import React from 'react';

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl text-center">
      {/* Contenedor de imagen circular con efecto hover */}
      <div className="relative w-32 h-32 mx-auto mb-6 group">
        <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
        <Image
          src={imageUrl}
          alt={`${name} - ${role}`}
          width={100} height={100}   
          className="w-full h-full rounded-full object-cover object-top border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105"
          style={{
            objectPosition: name.toLowerCase() === 'sebastian' ? 'center 15%' : 'center 20%'
            
          }}
        />
      </div>
      
      {/* Contenido de la tarjeta */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-blue-600 font-medium text-sm mb-4">{role}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default TeamCard;