import { useEffect, useState } from "react";

export default function Footer() {
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si el hero está visible, ocultar el botón
          if (entry.isIntersecting) setShowWhatsApp(false);
          else setShowWhatsApp(true);
        });
      },
      { threshold: 0.05 }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <footer className="footer text-center">
      <div className="container">
        {/* Redes sociales */}
        <div className="social-links mb-3">
          <a
            href="https://www.facebook.com/jgabogado"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://wa.me/593982456462"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-whatsapp"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/jgabogado"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/jgabogado"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        {/* Derechos reservados */}
        <p className="mb-0">
          © 2025 <strong>JG Abogado</strong>. Todos los derechos reservados.{" "}
          <br />
          <span className="credit">
            Sitio desarrollado por <strong>St@lin</strong>
          </span>
        </p>
      </div>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/593982456462" // tu número en formato internacional
        className={`whatsapp-button ${showWhatsApp ? "" : "whatsapp-hidden"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </footer>
  );
}
