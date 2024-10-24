// components/SessionProviderWrapper.tsx
"use client"; // Asegúrate de que sea un componente cliente

import { SessionProvider } from 'next-auth/react';

const SessionProviderWrapper = ({ children }:{children:React.ReactNode}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
