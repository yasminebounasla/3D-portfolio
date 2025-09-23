import { BrowserRouter } from 'react-router-dom';
import {Hero, Navbar, About, Tech, Experience, Feedbacks, Contact, StarsCanvas} from "./components";

function App() {

  return (
    <BrowserRouter>
       <div className="relative z-0 bg-primary">
        <div className='bg-hero-pattren bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
       </div>
    </BrowserRouter>
  )
}

export default App
