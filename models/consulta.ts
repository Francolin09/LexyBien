import { Schema, model, models } from 'mongoose';

interface IConsulta {
    _id: string;
    mensaje: string;
    usuarioId: string;
    abogadoId: string;
    estado: string;
    fecha_creacion: string; 
  }

const consultaSchema = new Schema({                           
  mensaje: { type: String, required: true },
  usuarioId: { type: String, required: true },
  abogadoId: { type: String, required: true },
  estado: { type: String },
  fecha_creacion: { type: String, required: true}
});


const Consulta = models.Consulta || model<IConsulta>('Consulta', consultaSchema, 'consultas');

export default Consulta;
export type { IConsulta };