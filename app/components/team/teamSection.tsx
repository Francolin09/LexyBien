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
    role: 'Especialista en Derecho civil',
    description: 'Aporta un enfoque sereno y experiencia para una defensa legal sólida y eficaz.',
    imageUrl: '/images/miembro3.jpg',
  },
];

const TeamSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gray-110"
      style={{
        backgroundImage: 'url(/images/fondoTeam.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Algunos de nuestros especialistas</h2>
      
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-8 md:space-y-0 justify-center max-w-6xl">
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
