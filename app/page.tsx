'use client'

import Contact from './components/Contact';
import HomePage from './components/Hero';
import Servicios from './components/Servicios';
import TeamSection from './components/team/teamSection';
import Footer from './components/Footer/footer';
import Header from './components/Header/Header';



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

      <section id='Contacto'>
        <Contact /> 
      </section>
      <Footer/>
    </div>
  )
}

export default Page;


// 'use client'

// const page = () => {
//   return (
//     <div>
//       <h1>Hola que tal</h1>
//     </div>
//   )
// }

// export default page
