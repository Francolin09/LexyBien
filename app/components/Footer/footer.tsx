import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Sección de enlaces de navegación */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Nuestra Firma</h3>
            <p className="text-gray-400 mt-2">Proveemos soluciones legales confiables y personalizadas para nuestros clientes.<br></br>
                Toda la informacion que necesitas para resolver tus dudas a un solo click!
            </p>
          </div>

          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            <a href="#inicio" className="text-gray-400 hover:text-white">Inicio</a>
            <a href="#servicios" className="text-gray-400 hover:text-white">Servicios</a>
            <a href="#team" className="text-gray-400 hover:text-white">Equipo</a>
            <a href="#contacto" className="text-gray-400 hover:text-white">Contacto</a>
          </nav>
        </div>

        {/* Sección de redes sociales */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Derechos de autor */}
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} Lexy. Todos los derechos reservados.</p>
        </div>
      </div>    
    </footer>
  );
};

export default Footer;
