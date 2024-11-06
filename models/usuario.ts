import { Schema, model, models } from 'mongoose';


interface IUsuario {
    _id: string;
    nombre: string;
    email: string;
    password: string;
    rol: string;
  }

const usuarioSchema = new Schema({                           
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, default:"usuario" },
});

const Usuario = models.Usuario || model<IUsuario>('Usuario', usuarioSchema, 'usuarios');

export type { IUsuario };
export default Usuario; 