import React from 'react';
import TeamCard from '@/app/components/team/teamCard'; // Asegúrate de que la ruta sea correcta para importar TeamCard

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Claudio',
      role: 'Especialista en derecho corporativo',
      description: 'Conocido por su atención al detalle y su habilidad para resolver conflictos con precisión.',
      imageUrl: '/images/miembro1.jpg',
    },
    {
      name: 'Margarita',
      role: 'Enfoque en derecho laboral',
      description: 'Defiende los derechos de los empleados con una destreza negociadora sobresaliente.',
      imageUrl: '/images/miembro2.jpg',
    },
    {
      name: 'José',
      role: 'Especialista en Derecho civil',
      description: 'Aporta un enfoque sereno y experiencia para una defensa legal sólida y eficaz.',
      imageUrl: '/images/miembro3.jpg',
    },
  ];

  return (
    <section
      id="equipo"
      className="relative min-h-screen py-24 flex items-center bg-gradient-to-b from-gray-900/90 to-gray-900/90"
    >
      {/* Imagen de fondo con opacidad */}
      <div className="absolute inset-0">
        <img
          src="/images/fondoTeam.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30" // Ajusta la opacidad aquí
        />
        <div className="absolute inset-0 bg-gray-900/50" /> {/* Capa adicional de opacidad */}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Algunos de nuestros especialistas
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Expertos comprometidos con la excelencia legal
        </p>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {teamMembers.map((member, index) => (
          <div key={index}>
            <TeamCard {...member} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
