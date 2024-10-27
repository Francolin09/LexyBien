import { Schema, model, models } from 'mongoose';

interface IDetalle {
    _id: string;
    mensaje: string;
    estado: string;
    fecha_creacion: string;
    usuario: {
      nombre: string;
      email: string;
    };
    abogado: {
      nombre: string;
      email: string;
    };
  }

export type { IDetalle };