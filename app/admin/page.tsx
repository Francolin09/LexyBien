'use client'
import { useEffect, useState } from "react";
import { getUsers, getDetalles } from "./utils";
import * as React from "react"
import { IUsuario } from '@/models/usuario';
import { IDetalle } from "@/models/detalle";
import Acordion from "../components/Acordion";
import Image from "next/image";
import Visualizador from "../components/Visualizador";


export default function Page() {

  const [usuarios, setUsers] = useState<IUsuario[]>([])

  const [busqueda, setBusqueda] = useState('');

  const [detalles, setdetalles] = useState<IDetalle[]>([]);

  useEffect(() => {
    getUsers().then(users => setUsers(users))  
  }, [])

  useEffect(() => {
    getDetalles().then(detalles => setdetalles(detalles))
  }, [])

  const cambiobuscador = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setBusqueda(event.target.value); // esta funcion irá actualizando constantemente al tipear sobre el input
  };



  const usuariofiltrado: IUsuario[] = usuarios.filter(usuario =>
  usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
  );

  return (
    <>
      <header className="bg-slate-900 flex justify-end lg:py-8 py-4 px-8">
        <div className="flex items-start gap-4">
          <Image className="size-16 w-full h-full" width={100} height={100} src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" />
          <div className="flex flex-col">
          <span>
            Juan
          </span>
          <button>
            Cerrar sesion
          </button>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-slate-950 flex gap-12">                                              {/*className="min-h-screen bg-slate-300 flex gap-12"*/}
      <aside className="flex-[2] bg-slate-950 lg:ml-8 p-8">
        <h2 className="text-2xl font-semibold text-white py-2 text-center">Listado de Abogados</h2>
        <div className="py-6">
          <input value={busqueda} onChange={cambiobuscador} type="text" placeholder="Buscar..." className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="max-w-screen-xl mx-auto px-5 bg-slate-950 min-h-sceen">
	        <div className="flex flex-col items-center"></div>
          {usuariofiltrado.filter(usuario => usuario.rol === 'abogado').map(usuario => (
            <Acordion key= {usuario._id} nombre={usuario.nombre} informacion={usuario.email}></Acordion>
          ))}
        </div>
      </aside>
        <div className="flex-[8] bg-slate-50 p-8">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cliente Asociado</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Estado del caso</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Abogado Asociado</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Fecha Solicitud</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>
            {detalles.map(detalle => (
              <Visualizador key={detalle._id} detalle={detalle}></Visualizador>             
            ))}
            
          </table>
        </div>
      </div>
    </main>
  </>
  )
}