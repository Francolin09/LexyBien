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