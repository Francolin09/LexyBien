// // app/register/page.tsx

// "use client"; // Asegúrate de que sea un componente cliente

// import { useState } from 'react';

// const RegisterPage = () => {
//   const [nombre, setNombre] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Aquí harías la llamada a tu API para registrar al usuario
//     const response = await fetch('/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ nombre, email, password }),
//     });

//     const data = await response.json();
//     if (data.error) {
//       setError(data.error);
//     } else {
//       // Redirigir a la página de inicio de sesión o a donde necesites
//       window.location.href = '/login';
//     }
//   };

//   return (
//     <div>
//       <h1>Registrar</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nombre:</label>
//           <input 
//             type="text" 
//             value={nombre} 
//             onChange={(e) => setNombre(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Contraseña:</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Registrar</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default RegisterPage;

"use client"; // Asegúrate de que sea un componente cliente

import { useState } from 'react';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // llamada a la api para registrar al usuario
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      // Redirigir a la página de inicio de sesión
      window.location.href = '/login';
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-white text-3xl mb-6">Registrar</h1>
      <div className="w-full max-w-md bg-gray-700 text-white rounded-lg shadow-lg overflow-hidden p-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-2">Nombre Apellido:</label>
            <input 
              className="p-2 bg-gray-800 rounded border border-gray-600" 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Email:</label>
            <input 
              className="p-2 bg-gray-800 rounded border border-gray-600" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Contraseña:</label>
            <input 
              className="p-2 bg-gray-800 rounded border border-gray-600" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="bg-gray-900 p-2 rounded hover:bg-gray-800 transition-all text-white"
          >
            Registrar
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;

