import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projet from '../components/Projet';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      {/* Titre et sous-titre pour Compétences & Expérience */}
      <div className="py-12 bg-dark-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">Mon Parcours Professionnel</h1>
        <p className="text-lg md:text-xl text-center mb-10 text-gray-300">Découvrez mes compétences et expériences clés</p>
      </div>
      <Skills />
      <Experience />
      <Projet />
      <Work />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}
