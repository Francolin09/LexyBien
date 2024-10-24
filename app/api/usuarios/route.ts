import connectMongo from '../../../lib/mongoose'; // Importar la conexión
import Usuario from '../../../models/usuario'; // Importar el modelo de usuario
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Conectar a la base de datos
    await connectMongo();
    // Obtener todos los usuarios de la colección 'usuario'
    const usuarios = await Usuario.find({})
    console.log(usuarios)
    // Retornar la respuesta en formato JSON
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}