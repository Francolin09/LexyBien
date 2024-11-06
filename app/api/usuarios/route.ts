import connectMongo from '../../../lib/mongoose';
import Usuario from '../../../models/usuario'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongo();
    const usuarios = await Usuario.find({})
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
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

    const updatedConsulta = await Usuario.findByIdAndUpdate(_id, updates, { new: true });

    if (!updatedConsulta) {
      return NextResponse.json({ error: 'Usuario not found' }, { status: 404 });
    }

    return NextResponse.json(updatedConsulta);
  } catch (error) {
    console.error('Error updating Usuario:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}