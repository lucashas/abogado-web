import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbar = document.querySelector(".navbar");

    // Cerrar menú en móvil al hacer click en un enlace
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (
          navbarToggler &&
          window.getComputedStyle(navbarToggler).display !== "none"
        ) {
          navbarToggler.click();
        }
      });
    });

    // Cambiar transparencia al hacer scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
        navbar.classList.remove("navbar-transparent");
      } else {
        navbar.classList.add("navbar-transparent");
        navbar.classList.remove("navbar-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Ejecutar al cargar para estado inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-transparent fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#hero">
          Abogado Byron Robles
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#hero">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#servicios">
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimonios">
                Testimonios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#sobre-mi">
                Sobre mí
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#publicaciones">
                Publicaciones
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
