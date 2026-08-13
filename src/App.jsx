import { BrowserRouter } from 'react-router-dom';
import { Hero, Navbar, About, Tech, Works, Contact, StarsCanvas, Reticle } from "./components";

function App() {

  return (
    <BrowserRouter>
       <div className="relative z-0 bg-primary">
        <Reticle />
        <div>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
       </div>
    </BrowserRouter>
  )
}

export default App