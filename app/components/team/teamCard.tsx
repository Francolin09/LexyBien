import React from 'react';

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, description, imageUrl }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white shadow-md p-4 rounded-lg max-w-xs">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-lg mb-4"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm font-semibold text-gray-600">{role}</p>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  );
};

export default TeamCard;
