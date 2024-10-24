// app/api/register/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongoose';
import Usuario from '@/models/usuario';

export async function POST(request: Request) {
  const { nombre, email, password } = await request.json();

  if (!nombre || !email || !password) {
    return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
  }

  await connectMongo(); // Conectar a MongoDB

  // Verificar si el usuario ya existe
  const existingUser = await Usuario.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'El usuario ya existe.' }, { status: 400 });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Usuario({ nombre, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: 'Usuario registrado exitosamente.' });
}
