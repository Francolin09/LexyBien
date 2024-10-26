'use client'
import Contact from './components/Contact';
import HomePage from './components/home';
// import HomePage from './components/home';
import Servicios from './components/Servicios';
import SobreNosotros from './components/SobreNosotros';


const Page = () => {
  return (
    <div>
      <h1>Hola que tal</h1>
      
      {/* Sección del formulario de contacto */}
      <HomePage />
      <Servicios/>
      <Contact />
      

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
