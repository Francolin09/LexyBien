import React from 'react';
import TeamCard from './teamCard';

const teamMembers = [
  {
    name: 'Nombre Generico',
    role: 'Especialista en derecho corporativo',
    description: 'Conocido por su atención al detalle y su habilidad para resolver conflictos con precisión.',
    imageUrl: '/images/miembro1.jpg',
  },
  {
    name: 'Nombre Generico',
    role: 'Enfoque en derecho laboral',
    description: 'Defiende los derechos de los empleados con una destreza negociadora sobresaliente.',
    imageUrl: '/images/miembro2.jpg',
  },
  {
    name: 'Nombre Generico',
    role: 'Derecho civil',
    description: 'Aporta un enfoque sereno y experiencia para una defensa legal sólida y eficaz.',
    imageUrl: '/images/miembro3.jpg',
  },
];

const TeamSection: React.FC = () => {
  return (
    <section
      id="team" // Agregar un ID para la navegación anclada
      className="relative h-screen bg-gray-110"
      style={{
        backgroundImage: 'url(/images/fondoTeam.jpg)', // Ruta de tu imagen de fondo
        backgroundSize: 'fill', // Ajustar el tamaño de la imagen
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat', // No repetir la imagen
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Nuestro equipo</h2> {/* Cambia el color del texto si es necesario */}
      
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-8 md:space-y-0 justify-center">
        {teamMembers.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            description={member.description}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
