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

export async function PUT(request: Request) {
  try {
    await connectMongo();

    const data = await request.json();
    const { _id, ...updates } = data; 

    if (!_id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedConsulta = await Consulta.findByIdAndUpdate(_id, updates, { new: true });

    if (!updatedConsulta) {
      return NextResponse.json({ error: 'Consulta not found' }, { status: 404 });
    }

    return NextResponse.json(updatedConsulta);
  } catch (error) {
    console.error('Error updating consulta:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}