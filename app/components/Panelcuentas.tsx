import { IUsuario } from "@/models/usuario";
import Image from "next/image";

const Panelcuentas = ({usuarios}:{usuarios: IUsuario}) => {
    return (
      <tbody>
      <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                      <Image className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt="" />
                  </div>
                  <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                          {usuarios.nombre}
                      </p>
                  </div>
              </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{usuarios.email}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
                className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                usuarios.rol === "admin"
                ? "text-red-900"
                : usuarios.rol === "abogado"
                ? "text-blue-900"
                : "text-green-900"
                }`}
            >
            <span
                aria-hidden
                className={`absolute inset-0 opacity-50 rounded-full ${
                usuarios.rol === "admin"
                ? "bg-red-200"
                : usuarios.rol === "abogado"
                ? "bg-blue-200"
                : "bg-green-200"
            }`}
            ></span>
            <span className="relative">{usuarios.rol}</span>
            </span>
            </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span aria-hidden
                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
              </span>
              <span className="relative">BOTONES DE OPCION PERRO</span>
              </span>
          </td>
      </tr>
  </tbody>
    );
  };
  
  export default Panelcuentas;