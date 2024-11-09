'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { GiPadlock } from 'react-icons/gi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Servicios', id: 'servicios' },
    { name: 'Equipo', id: 'equipo' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const rutainicial = () => {
    router.push('/');
};

  const rutalogin = () => {
    router.push('/login');
  };

  const rutaadmin = () => {
    router.push('/admin');
  };

  const rutaadminus = () => {
    router.push('/adminus');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900' : 'bg-transparent text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            
              <button 
                onClick={rutainicial} 
                className="flex items-center cursor-pointer group"
              >
                <span className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-white'
                } group-hover:text-blue-600`}>
                  LEXY <span className="text-blue-600">||</span> Soluciones Legales
                </span>
              </button>
           
          </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {session && (
                <span className="text-white text-sm font-medium">
                  Bienvenido, {session.user?.nombre}
                </span>
              )}

              <button
                onClick={session ? () => signOut({ callbackUrl: '/' }) : rutalogin}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                {session ? 'Salir' : 'Iniciar sesión'}
              </button>

              {session && (
                <>
                  <button
                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                      session.user?.rol === 'admin' ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                    } transition-colors duration-300 ${session.user?.rol === 'admin' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    disabled={session.user?.rol !== 'admin'}
                    onClick={rutaadmin}
                  >
                    {session.user?.rol === 'admin' ? 'consultas' : <GiPadlock />}
                  </button>

                  <button
                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                      session.user?.rol === 'admin' ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                    } transition-colors duration-300 ${session.user?.rol === 'admin' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    disabled={session.user?.rol !== 'admin'}
                    onClick={rutaadminus}
                  >
                    {session.user?.rol === 'admin' ? 'usuarios' : <GiPadlock />}
                  </button>
                </>
              )}
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-left"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contacto')}
            className="block w-full px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};  
export default Navbar;