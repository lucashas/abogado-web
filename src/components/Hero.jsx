export default function Hero() {
  return (
    <section
      id="hero"
      className="section text-center d-flex flex-column justify-content-center align-items-center bg-dark text-white"
      style={{ minHeight: "100vh", paddingTop: "70px" }} // padding para que no lo tape el navbar fijo
    >
      <h1
        className="display-4 fw-bold mb-3"
        style={{ color: "var(--color-accent)" }}
      >
        Defensa legal con ética y compromiso
      </h1>

      <p className="lead mb-4 hero-parrafo">
        Protegemos tus derechos con rigor jurídico, experiencia y cercanía. Cada
        caso merece atención personalizada.
      </p>

      <a href="#contacto" className="btn btn-primary btn-lg accent-button">
        Agenda tu consulta
      </a>
    </section>
  );
}
