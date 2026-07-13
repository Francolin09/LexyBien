import React from 'react';

interface SpecialtyCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ name, description, icon, color }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-3xl text-center group">
      {/* Icono con fondo de color */}
      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white text-3xl">
          {icon}
        </div>
      </div>
      
      {/* Contenido de la especialidad */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{name}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default SpecialtyCard;
