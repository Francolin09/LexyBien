'use client'
import { useEffect, useState } from "react";
import { getOcupados, getUsers } from "@/app/admin/utils";
import * as React from "react"
import { IUsuario } from '@/models/usuario';
import Acordion from "../components/Acordion";
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';
import { HiLogin } from "react-icons/hi";
import Panelcuentas from "../components/Panelcuentas";
import { UsuariosOcupados } from "@/models/ocupado";
import { useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";


export default function Page() {

  const { data: session, status } = useSession();
  const [usuarios, setUsers] = useState<IUsuario[]>([])
  const [busqueda, setBusqueda] = useState('');
  const [busqueda2, setBusqueda2] = useState('');
  const [update, setUpdate] = useState(false);
  const [rolFiltro, setRolFiltro] = useState('');
  const [usuariosOcupados, setUsuariosOcupados] = useState<UsuariosOcupados>({
    abogadoIds: [],
    usuarioIds: []
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
    const users = await getUsers();
    const ocupadosData = await getOcupados();
    setUsers(users);
    setUsuariosOcupados(ocupadosData);
    };
    fetchData();
  }, [update]);

  if (status === 'loading') {
    return <p>Cargando...</p>; 
  }

  const rutahome = () => {
    router.push('/');
  };

  // Si el usuario no está autenticado
  if (!session || session.user.rol !== 'admin') {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex flex-col justify-center items-center p-4">
        <p className="text-white mb-4">Acceso denegado. Debes iniciar sesión como ADMINISTRADOR.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => (session ? rutahome() : signIn())} // Acción según el estado de sesión
          >
            {session ? <FaHome /> : 'Iniciar sesión'}
          </button>
      </div>
    );
  }

  const cambiobuscador = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setBusqueda(event.target.value); // esta funcion irá actualizando constantemente al tipear sobre el input
  };

  const cambiobuscador2 = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setBusqueda2(event.target.value); // esta funcion irá actualizando constantemente al tipear sobre el input
  };

  const usuariofiltrado1: IUsuario[] = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
    );

  const usuariofiltrado2: IUsuario[] = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda2.toLowerCase()) 
    );

  const cambioFiltro = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRolFiltro(event.target.value);
  };


  const cambioadmin = () => {
    router.push('/admin');
  };


  const usuariosFiltradosPorRol = rolFiltro
    ? usuariofiltrado2.filter(usuario => usuario.rol === rolFiltro)
    : usuariofiltrado2;


  return (
    <>
      <header className="bg-slate-900 flex justify-end lg:py-8 py-4 px-8">
        <div className="flex items-start gap-4">
          <div className="relative h-10 w-10">
            <Image className="h-full w-full rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={100} height={100}                                 
            />
          </div>
          <div className="flex flex-col">
            <div>
              <span className="text-white">
                Bienvenido, {session?.user.nombre}
              </span>
            </div>
            <div className="flex justify-start">
              <button 
                onClick={() => signOut({callbackUrl:'/'})}
                className=" bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200">
                <HiLogin />
              </button>
              <button onClick={cambioadmin}
                className=" bg-red-700 mx-3 px-2 text-white font-semibold rounded-lg shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200">
                Ir a Consultas
              </button>
              <button  onClick={rutahome}
                className=" bg-green-700 mx-3 px-2 text-white font-semibold rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-200">
                <FaHome />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-slate-950 flex gap-12">                                              {/*className="min-h-screen bg-slate-300 flex gap-12"*/}
      <aside className="flex-[2] bg-slate-950 lg:ml-8 p-8">
        <h2 className="text-2xl font-semibold text-white py-2 text-center">Listado de cuenta de clientes</h2>
        <div className="py-6">
          <input value={busqueda} onChange={cambiobuscador} type="text" placeholder="Buscar..." className="text-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="max-w-screen-xl mx-auto px-5 bg-slate-950 min-h-sceen">
	        <div className="flex flex-col items-center"></div>
          {usuariofiltrado1.filter(usuario => usuario.rol === 'usuario').map(usuario => (
            <Acordion key= {usuario._id} nombre={usuario.nombre} informacion={usuario.email} rol={usuario.rol}></Acordion>
          ))}
        </div>
      </aside>
        <div className="flex-[8] bg-slate-50 p-8">
            {/*------------------------------------------------------------------------------------------------------------- */}
            <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Panel de cuentas registradas</h2>
                        </div>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">
                                <div className="relative">
                                    <select
                                        value={rolFiltro}
                                        onChange={cambioFiltro}
                                        className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option value="">Todos</option>
                                        <option value="usuario">Usuarios</option>
                                        <option value="abogado">Abogados</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="block relative">
                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                        <path
                                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                        </path>
                                    </svg>
                                </span>
                                <input value={busqueda2} onChange={cambiobuscador2} placeholder="Busqueda"
                                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                            </div>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Usuario
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Correo contacto
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Rol
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    {usuariosFiltradosPorRol.map(usuario => (
                                        <Panelcuentas key={usuario._id} usuario={usuario} ocupados={usuariosOcupados} setUpdate={setUpdate}></Panelcuentas>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            {/*------------------------------------------------------------------------------------------------------------- */}
        </div>
    </main>
  </>
  )
}