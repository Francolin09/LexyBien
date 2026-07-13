import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "LexyBien - Asesorías Legales Profesionales",
    template: "%s | LexyBien"
  },
  description: "Asesorías legales profesionales en Chile. Consultas jurídicas, asesoramiento legal y soluciones legales personalizadas con nuestro equipo de expertos.",
  keywords: ["asesoría legal", "abogado", "consulta jurídica", "derecho", "legal", "LexyBien", "Chile"],
  authors: [{ name: "LexyBien Team" }],
  creator: "LexyBien",
  publisher: "LexyBien",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lexybien.com'), // Cambia por tu dominio
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lexybien.com', // Cambia por tu dominio
    title: 'LexyBien - Asesorías Legales Profesionales',
    description: 'Asesorías legales profesionales en Chile. Consultas jurídicas y soluciones legales personalizadas con nuestro equipo de expertos.',
    siteName: 'LexyBien',
    images: [
      {
        url: '/images/og-image.jpg', // Crea esta imagen
        width: 1200,
        height: 630,
        alt: 'LexyBien - Asesorías Legales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexyBien - Asesorías Legales Profesionales',
    description: 'Asesorías legales profesionales en Chile con nuestro equipo de expertos.',
    images: ['/images/og-image.jpg'], // Misma imagen que Open Graph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-verificacion-google', // Agrega tu código de verificación
    yandex: 'tu-codigo-verificacion-yandex', // Opcional
    yahoo: 'tu-codigo-verificacion-yahoo', // Opcional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        {children}
      </body>
    </html>
  );
}
