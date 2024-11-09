import connectMongo from '../../../lib/mongoose';
import Consulta from '../../../models/consulta';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    await connectMongo();
    
    const abogadoIds = await Consulta.distinct('abogadoId', { abogadoId: { $ne: null } });
    
    const usuarioIds = await Consulta.distinct('usuarioId', { usuarioId: { $ne: null } });
    
    const result = {
      abogadoIds,
      usuarioIds
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching unique abogadoid and usuarioid:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}