export default function Hero() {
  return (
    <section id="inicio" className="section text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-accent)' }}>
        Defensa legal con ética y compromiso
      </h2>
      <p 
  className="lead mb-4 hero-parrafo" 
  
>
  Protegemos tus derechos con rigor jurídico, experiencia y cercanía. 
  Cada caso merece atención personalizada.
    </p>
      <a href="#contacto" className="accent-button">
        Agenda tu consulta
      </a>
    </section>
  );
}