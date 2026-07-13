import type { Metadata } from 'next';
import Contact from './components/Contact';
import HomePage from './components/Hero';
import Servicios from './components/Servicios';
import TeamSection from './components/team/teamSection';
import Footer from './components/Footer/footer';
import Header from './components/Header/Header';
import ContactForm from './components/ContactForm';

export const metadata: Metadata = {
  title: 'LexyBien - Asesorías Legales Profesionales',
  description: 'Asesorías legales profesionales en Chile. Consultas jurídicas, asesoramiento legal y soluciones legales personalizadas con nuestro equipo de expertos.',
  keywords: ['asesoría legal', 'abogado', 'consulta jurídica', 'derecho', 'legal', 'LexyBien', 'Chile'],
  openGraph: {
    title: 'LexyBien - Asesorías Legales Profesionales',
    description: 'Asesorías legales profesionales en Chile. Consultas jurídicas y soluciones legales personalizadas con nuestro equipo de expertos.',
    url: 'https://lexybien.com',
    siteName: 'LexyBien',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LexyBien - Asesorías Legales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexyBien - Asesorías Legales Profesionales',
    description: 'Asesorías legales profesionales en Chile con nuestro equipo de expertos.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://lexybien.com',
  },
};

const Page = () => {
  return (
    <div>
      <Header/>

      <section>
        <HomePage/>
      </section>

      <section id='servicios'>
        <Servicios/>
      </section>

      <section id='Equipo'>
        <TeamSection/>
      </section>

      <section id='Contacto' className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Page;


