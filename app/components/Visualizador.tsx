import { IDetalle } from "@/models/detalle";
import Image from "next/image";
import { useState } from "react";
import { FaSave, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Modal } from "./Modal";
import { IoMdMail } from "react-icons/io";
import { IUsuario } from "@/models/usuario";


const Visualizador = ({detalle, usuarios, setUpdate}:{detalle: IDetalle, usuarios: IUsuario[], setUpdate: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [selectedConsultaId, setSelectedConsultaId] = useState<string | null>(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [abogadoSeleccionado, setAbogadoSeleccionado] = useState<{ _id: string; nombre: string; email: string } | null>(detalle.abogado);

    const abogados = usuarios.filter(usuario => usuario.rol === "abogado")

    const openModal = (id: string) => {
        setSelectedConsultaId(id);
      };
      
    const closeModal = () => {
      setSelectedConsultaId(null);
    };

    const handleAbogadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedAbogadoId = event.target.value;
      
      if (selectedAbogadoId === "null") {
          setAbogadoSeleccionado(null); 
      } else {
          const nuevoAbogado = abogados.find(abogado => abogado._id === selectedAbogadoId);
          if (nuevoAbogado) setAbogadoSeleccionado(nuevoAbogado);
      }
  };

  const handleGuardarCambios = async () => {
    if (!detalle._id) return;
  
    const consulta = {
      _id: detalle._id,
      mensaje: detalle.mensaje,
      usuarioId: detalle.usuario._id,
      abogadoId: abogadoSeleccionado ? abogadoSeleccionado._id : "",
      estado: abogadoSeleccionado ? "asignado" : "no asignado",    
      fecha_creacion: detalle.fecha_creacion,
    };
  
    try {
      const response = await fetch(`/api/consultas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consulta),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el abogado en la base de datos.");
      }
  
      const updatedConsulta = await response.json();
      console.log("Consulta actualizada:", updatedConsulta);
  
      setUpdate(prev => !prev);
      setModoEdicion(false);
  
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al guardar los cambios");
    }
  };

    return (
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              <tr className="hover:bg-gray-50">
                {/* SECCIÓN CLIENTE ASOCIADO*/}
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
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
                  <div className="text-sm flex">
                    <div>
                      {modoEdicion ? (
                        <select
                          value={abogadoSeleccionado?._id || ""}
                          onChange={handleAbogadoChange}
                          className="px-2 py-1 border rounded"
                        >
                        <option value="">Seleccione un abogado</option>
                          {abogados.map(abogado => (
                          <option key={abogado._id} value={abogado._id}>
                            {abogado.nombre}
                          </option>
                          ))}
                          <option value="null">Desvincular</option>
                        </select>
                      ) : (
                        <>
                          <div className="font-medium text-gray-700">
                            {abogadoSeleccionado?.nombre || "No asignado"}
                          </div>
                          <div className="text-gray-400">{abogadoSeleccionado?.email || "No asignado"}</div>
                        </>
                      )}
                    </div>
                    <div>
                      <button onClick={() => setModoEdicion(!modoEdicion)}>
                        <MdEdit />
                      </button>
                    </div>
                  </div>
                </td>

                {/*SECCION BOTONES BORRAR-GUARDAR-DETALLES */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                  <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200">
                    <FaRegTrashAlt />
                  </button>
                  <button onClick={handleGuardarCambios}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200">
                    <FaSave />
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










