import { Schema, model, models } from 'mongoose';

interface UsuariosOcupados {
    abogadoIds: string[];
    usuarioIds: string[];
  }

export type { UsuariosOcupados }