'use client'
import { IoMdMail } from "react-icons/io";
import { FaPencilAlt, FaRegTrashAlt, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUsers, getDetalles } from "./utils";
import * as React from "react"
import Usuario, { IUsuario } from '@/models/usuario';
import Consulta, { IConsulta} from '@/models/consulta';
import { IDetalle } from "@/models/detalle";
import Acordion from "../components/Acordion";
import { Modal } from "../components/Modal";


export default function page() {

  const [usuarios, setUsers] = useState<IUsuario[]>([])

  const [busqueda, setBusqueda] = useState('');

  const [detalles, setdetalles] = useState<IDetalle[]>([]);

  const [selectedConsultaId, setSelectedConsultaId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedConsultaId(id);
  };
  
  const closeModal = () => {
    setSelectedConsultaId(null);
  };

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
          <img className="size-16" src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" />
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
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              <tr className="hover:bg-gray-50">
                {/* SECCIÓN CLIENTE ASOCIADO*/}
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700"> {detalle.usuario.nombre} </div>
                    <div className="text-gray-400">{detalle.usuario.email}</div>
                  </div>
                </th>
                {/*SECCION ESTADO DEL CASO */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      detalle.estado === 'asignado'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        detalle.estado === 'asignado' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    {detalle.estado === 'asignado' ? 'Asignado' : 'No asignado'}
                  </span>
                </td>
                {/* SECCION ABOGADO ASOCIADO */}
                <td className="px-6 py-4">
                <div className="text-sm">
                    <div className="font-medium text-gray-700"> {detalle.abogado.nombre} </div>
                    <div className="text-gray-400">{detalle.abogado.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                  <div className="font-medium text-gray-700"> {detalle.fecha_creacion} </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                  <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200">
                    <FaRegTrashAlt />
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200">
                    <FaPencilAlt />
                  </button>
                  <button onClick={() => openModal(detalle._id)} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200">
                    +
                  </button>
                  <Modal isOpen={selectedConsultaId === detalle._id} onClose={closeModal}>
                  <h2 className="text-xl font-bold">Caso cliente {detalle.usuario.nombre}</h2>
                  <p>Nombre completo cliente: {detalle.usuario.nombre}</p>
                  <p>fecha consulta: {detalle.fecha_creacion}</p>
                  <p>Contacto cliente:<IoMdMail /> {detalle.usuario.email}</p>
                  <p>Pregunta asociada al caso: {detalle.mensaje}</p>
                  <p>Abogado a cargo: {detalle.abogado.nombre}</p>
                </Modal>
                  </div>
                </td>
              </tr>
            </tbody>

            ))}
            
          </table>
        </div>
      </div>
    </main>
  </>
  )
}