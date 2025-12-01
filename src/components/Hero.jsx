export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Capa semitransparente con gradiente */}
      <div className="hero-overlay"></div>

      {/* Contenido centrado con animación */}
      <div className="container position-relative fade-in-up text-center">
        <h1
          className="display-4 fw-bold"
          style={{ color: "var(--color-accent)" }}
        >
          Defensa legal con ética y compromiso
        </h1>

        <p className="hero-subtitle">
          Protegemos tus derechos con rigor jurídico, experiencia y cercanía
        </p>

        <p className="lead mb-5 hero-parrafo">
          Cada caso merece atención personalizada y acompañamiento constante.
          Somos tu aliado legal de confianza.
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <a href="#contacto" className="btn btn-primary btn-lg accent-button">
            <i className="bi bi-calendar3 me-2"></i>
            Agenda tu consulta
          </a>
          <a
            href="https://wa.me/593982456462"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{
              background: "rgba(76, 175, 80, 0.9)",
              color: "white",
              border: "none",
              padding: "14px 32px",
              fontWeight: "700",
              fontSize: "1.1rem",
              borderRadius: "6px",
              animation: "slideInUp 1s ease-out 0.5s both",
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
              letterSpacing: "0.5px",
            }}
          >
            <i className="bi bi-whatsapp me-2"></i>
            Contacta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
