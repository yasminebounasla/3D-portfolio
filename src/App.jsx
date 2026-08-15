import { BrowserRouter } from 'react-router-dom';
import { Hero, Navbar, About, Tech, Works, Contact, StarsCanvas, Reticle } from "./components";

function App() {

  return (
    <BrowserRouter>
       <div className="relative z-0 bg-primary">
        {/* fond étoilé fixe sur toute la page, toujours derrière le contenu */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <StarsCanvas />
        </div>

        <Reticle />
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Works />
        <Contact />
       </div>
    </BrowserRouter>
  )
}

export default App