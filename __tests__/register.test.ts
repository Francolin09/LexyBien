import { POST } from '../app/api/register/route';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Usuario from '@/models/usuario';
import connectMongo from '@/lib/mongoose';

jest.mock('@/lib/mongoose');
jest.mock('@/models/usuario');
jest.mock('bcryptjs');

describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar un error si faltan campos requeridos', async () => {
    const request = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({ nombre: 'Test User', email: '' }), // Falta el campo password
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(400);
    expect(jsonResponse.error).toBe('Todos los campos son requeridos.');
  });

  it('debería retornar un error si el usuario ya existe', async () => {
    (connectMongo as jest.Mock).mockResolvedValueOnce(null);
    (Usuario.findOne as jest.Mock).mockResolvedValueOnce({ email: 'test@example.com' });

    const request = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({ nombre: 'Test User', email: 'test@example.com', password: '123456' }),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(400);
    expect(jsonResponse.error).toBe('El usuario ya existe.');
  });

  it('debería registrar un usuario exitosamente si todos los datos son válidos y el usuario no existe', async () => {
    (connectMongo as jest.Mock).mockResolvedValueOnce(null);
    (Usuario.findOne as jest.Mock).mockResolvedValueOnce(null);
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
    (Usuario.prototype.save as jest.Mock).mockResolvedValueOnce({});

    const request = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({ nombre: 'Test User', email: 'newuser@example.com', password: '123456' }),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse.message).toBe('Usuario registrado exitosamente.');
  });
});