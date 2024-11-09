import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import Consulta from '@/models/consulta';

export const revalidate = 0;

export async function GET() {
  await connectMongo();

  const resultado = await Consulta.aggregate([
    {
      $addFields: {
        usuarioObjectId: { $toObjectId: '$usuarioId' },
        abogadoObjectId: {
          $cond: {
            if: { $eq: ['$abogadoId', ''] },
            then: null,
            else: { $toObjectId: '$abogadoId' }
          }
        }
      }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'usuarioObjectId',
        foreignField: '_id',
        as: 'usuario'
      }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'abogadoObjectId',
        foreignField: '_id',
        as: 'abogado'
      }
    },
    { $unwind: '$usuario' },
    {
      $unwind: {
        path: '$abogado',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        'abogado.nombre': { $ifNull: ['$abogado.nombre', 'No asignado'] },
        'abogado.email': { $ifNull: ['$abogado.email', 'No asignado'] },
        'abogado._id': { $ifNull: ['$abogado._id', null] }
      }
    },
    {
      $project: {
        mensaje: 1,
        estado: 1,
        fecha_creacion: 1,
        'usuario._id': 1,            
        'usuario.nombre': 1,
        'usuario.email': 1,
        'abogado._id': 1,            
        'abogado.nombre': 1,
        'abogado.email': 1
      }
    }
  ]);

  return NextResponse.json(resultado);
}