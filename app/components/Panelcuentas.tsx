import Usuario, { IUsuario } from "@/models/usuario";
import Image from "next/image";
import { useState } from "react";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const Panelcuentas = ({usuario, usuarios, setUpdate}:{usuario: IUsuario, usuarios: IUsuario[], setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [modoEdicion, setModoEdicion] = useState(false);
    const [rolSeleccionado, setRolSeleccionado] = useState(usuario.rol || null);

    const handleRolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRol = event.target.value;
        
        if (selectedRol === "null") {
            setRolSeleccionado(null); 
        } else {
            setRolSeleccionado(selectedRol)
        }
    };

    const handleGuardarCambios = async () => {
        if (!usuario._id) {
            return;}
      
        const usuario1 = {
          _id: usuario._id,
          rol: rolSeleccionado
        };
        console.log(usuario1)
      
        try {
          const response = await fetch(`/api/usuarios`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario1),
          });
      
          if (!response.ok) {
            throw new Error("Error al actualizar el rol de usuario.");
          }
      
          const updatedUsuario = await response.json();
          console.log("Usuario actualizado:", updatedUsuario);
      
          setUpdate(prev => !prev);
          setModoEdicion(false);
      
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
          alert("Hubo un error al guardar los cambios");
        }
      };


    return (
      <tbody>
      <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                      <Image className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                          width={100} height={100} />
                  </div>
                  <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                          {usuario.nombre}
                      </p>
                  </div>
              </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{usuario.email}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="text-sm flex">
                <div className="flex">
                    {modoEdicion ? (
                        <select
                            value={rolSeleccionado || ""}
                            onChange={handleRolChange}
                            className="px-2 py-1 border rounded"
                        >
                            <option key={usuario._id} value="">Seleccione un rol</option>
                            <option key={usuario._id} value="usuario">Usuario</option>
                            <option key={usuario._id} value="abogado">Abogado</option>
                        </select>
                    ) : (
                        <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            usuario.rol === "admin"
                            ? "text-red-900"
                            : usuario.rol === "abogado"
                            ? "text-blue-900"
                            : "text-green-900"
                            }`}
                        >
                        <span
                            aria-hidden
                            className={`absolute inset-0 opacity-50 rounded-full ${
                            usuario.rol === "admin"
                            ? "bg-red-200"
                            : usuario.rol === "abogado"
                            ? "bg-blue-200"
                            : "bg-green-200"
                            }`}
                        >

                        </span>
                        

                        <span className="relative">{usuario.rol}</span>
                        </span>
                    )}

                    <div>
                      <button onClick={() => setModoEdicion(!modoEdicion)}>
                        <MdEdit />
                      </button>
                    </div>
                </div>
            </div>

           </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex justify-end gap-4">
                  <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200">
                    <FaRegTrashAlt />
                  </button>
                  <button
                    onClick={handleGuardarCambios}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200">
                    <FaSave />
                  </button>                 
                  </div>
                </td>
      </tr>
  </tbody>
    );
  };
  
  export default Panelcuentas;