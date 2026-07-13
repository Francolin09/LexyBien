import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

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
    default: "ByM - Asesorías Legales Profesionales",
    template: "%s | bymlegal"
  },
  description: "Asesorías legales profesionales en Chile. Consultas jurídicas, asesoramiento legal y soluciones legales personalizadas con nuestro equipo de expertos.",
  keywords: ["asesoría legal", "abogado", "consulta jurídica", "derecho", "legal", "ByM", "Chile", "demanda", "juicios"],
  authors: [{ name: "ByM Team" }],
  creator: "bymlegal",
  publisher: "bymlegal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.bymlegal.cl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.bymlegal.cl',
    title: 'bymlegal - Asesorías Legales Profesionales',
    description: 'Asesorías legales profesionales en Chile. Consultas jurídicas y soluciones legales personalizadas con nuestro equipo de expertos.',
    siteName: 'bymlegal',
    images: [
      {
        url: '/images/og-image.jpg', // Crea esta imagen
        width: 1200,
        height: 630,
        alt: 'bymlegal - Asesorías Legales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bymlegal - Asesorías Legales Profesionales',
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
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
