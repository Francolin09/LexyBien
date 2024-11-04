import { Schema, model, models } from 'mongoose';

interface IDetalle {
    _id: string;
    mensaje: string;
    estado: string;
    fecha_creacion: string;
    usuario: {
      _id: string;
      nombre: string;
      email: string;
    };
    abogado: {
      _id: string
      nombre: string;
      email: string;
    };
  }

export type { IDetalle };