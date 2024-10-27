'use client'

import Contact from './components/Contact';
import HomePage from './components/Hero';
// import HomePage from './components/Hero';
import Servicios from './components/Servicios';
// import SobreNosotros from './components/SobreNosotros';
import TeamSection from './components/team/teamSection';


const Page = () => {
  return (
    <div>
      <HomePage/>
      <Servicios/>
      <TeamSection/>
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
