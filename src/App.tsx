import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Projects from './components/Projects.tsx'

export default function App(){
    return(
        <div>
            <Navbar />
            <Hero />
            <About />
            <Projects />
        </div>
    )
}