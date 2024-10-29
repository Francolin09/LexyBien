import { IDetalle } from "@/models/detalle";
import Image from "next/image";
import { useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Modal } from "./Modal";
import { IoMdMail } from "react-icons/io";


const Visualizador = ({detalle}:{detalle: IDetalle}) => {
    const [selectedConsultaId, setSelectedConsultaId] = useState<string | null>(null);

    const openModal = (id: string) => {
        setSelectedConsultaId(id);
      };
      
      const closeModal = () => {
        setSelectedConsultaId(null);
      };
    return (
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              <tr className="hover:bg-gray-50">
                {/* SECCIÓN CLIENTE ASOCIADO*/}
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div  className="relative h-10 w-10">
                    <Image
                      className="h-full w-full rounded-full object-cover object-center"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      width={100} height={100}                                 
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
    );
  };
  
  export default Visualizador;










