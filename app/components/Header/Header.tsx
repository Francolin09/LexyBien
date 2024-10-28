import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-400">
            Nombre de la Firma
          </a>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#servicios" className="hover:text-blue-400">
            Servicios
          </a>
          <a href="#Equipo" className="hover:text-blue-400">
            Equipo
          </a>
          <a href="#Contacto" className="hover:text-blue-400">
            Contacto
          </a>  
          <Link href="/login">
            Iniciar Sesion
          </Link>
        </nav>

       </div>

      {/* Menú para móviles */}
      
    </header>
  );
};

export default Header;
