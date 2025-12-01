export default function Testimonios() {
  return (
    <section id="testimonios" className="section container text-center">
      <h3 className="mb-4" style={{ color: "var(--color-accent)" }}>
        Testimonios
      </h3>
      <p className="lead mb-5" style={{ color: "var(--color-text)" }}>
        Algunos clientes comparten su experiencia legal con JG Abogado.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <p>
              “Gracias al abogado Byron Robles resolví un conflicto familiar con
              rapidez y claridad. Me sentí escuchada.”
            </p>
            <strong>- María P.</strong>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <p>
              “Me ayudó a regularizar mi propiedad y ahora tengo tranquilidad
              jurídica. Muy profesional.”
            </p>
            <strong>- Carlos R.</strong>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <p>
              “Su asesoría en contratos evitó riesgos en mi negocio. Ético,
              claro y confiable.”
            </p>
            <strong>- Andrea L.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
