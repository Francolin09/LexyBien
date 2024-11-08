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

export async function DELETE(request: Request) {
  try {
    await connectMongo();

    const data = await request.json();
    const { _id } = data; 

    if (!_id) {
      return NextResponse.json({ error: 'ID es requerida' }, { status: 400 });
    }

    const deletedUsuario = await Usuario.findByIdAndDelete(_id);

    if (!deletedUsuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}