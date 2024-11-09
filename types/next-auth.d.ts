import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      nombre: string;
      rol: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    nombre: string;
    rol: string; 
  }
}