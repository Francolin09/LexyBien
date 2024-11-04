import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com/",
      label: "Facebook"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/",
      label: "Twitter"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/",
      label: "LinkedIn"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/",
      label: "Instagram"
    }
  ];

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Equipo', href: '/equipo' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              LEXY || Soluciones Legales
            </h2>
            <p className="mb-4 text-sm">
              Proveemos soluciones legales confiables y personalizadas para nuestros clientes.
              Toda la información que necesitas para resolver tus dudas a un solo click!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Lexy. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;