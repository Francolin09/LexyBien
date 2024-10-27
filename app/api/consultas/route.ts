import connectMongo from '../../../lib/mongoose'; 
import Consulta from '../../../models/consulta'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongo();
    const consultas = await Consulta.find({})
    console.log(consultas)
    return NextResponse.json(consultas);
  } catch (error) {
    console.error('Error fetching consultas:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}