export default function Publicaciones() {
  return (
    <section id="publicaciones" className="section container text-center">
      <h3 className="mb-4" style={{ color: "var(--color-accent)" }}>
        Publicaciones
      </h3>
      <p className="lead mb-5" style={{ color: "var(--color-text)" }}>
        Artículos y análisis sobre temas legales de interés.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div className="testimonial-box">
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Incumplimiento de contrato
            </h5>
            <p>
              El Código Civil ecuatoriano (Art. 1572) permite exigir
              cumplimiento o indemnización por daños y perjuicios cuando una de
              las partes incumple lo pactado. Es clave documentar el acuerdo y
              las pruebas del incumplimiento.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="testimonial-box">
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Medidas cautelares en juicios civiles
            </h5>
            <p>
              El COGEP (Art. 130) permite solicitar medidas cautelares para
              proteger derechos antes de la sentencia. Por ejemplo, la retención
              de ingresos en juicios de alimentos o la prohibición de enajenar
              bienes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
