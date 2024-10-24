

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongoose';
import Usuario from '@/models/usuario';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'tu-email@example.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        await connectMongo();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        const user = await Usuario.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Credenciales incorrectas');
        }

        return { id: user._id.toString(), nombre: user.nombre, email: user.email }; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.nombre = token.nombre as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});


export { handler as GET, handler as POST };
