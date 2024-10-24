"use client"; 

import { useSession, signIn, signOut } from 'next-auth/react';

const ProtectedPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  // Si no está iniciada la sesión
  if (!session || !session.user) {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
        <p>Acceso denegado. Debes iniciar sesión.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn()}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  // Si está iniciada la sesión
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
      <p>Bienvenido, {session.user.email}</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut({callbackUrl:'/'})}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ProtectedPage;

