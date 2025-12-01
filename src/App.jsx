import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Testimonios from "./components/Testimonios";
import SobreMi from "./components/SobreMi";
import Publicaciones from "./components/Publicaciones";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Servicios />
      <Testimonios />
      <SobreMi />
      <Publicaciones />
      <Contacto />
      <Footer />
      {/* Aquí irán los demás componentes */}
    </>
  );
}
