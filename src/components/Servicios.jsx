export default function Servicios() {
  return (
    <section id="servicios" className="section container text-center">
      <h3 className="mb-4" style={{ color: "var(--color-accent)" }}>
        Áreas de práctica
      </h3>
      <p className="lead mb-5" style={{ color: "var(--color-text)" }}>
        Servicios legales profesionales adaptados a tus necesidades.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <i
              className="bi bi-file-earmark-check display-4 mb-3"
              style={{ color: "var(--color-accent)" }}
              display="block"
            ></i>
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Derecho Civil
            </h5>
            <p>
              Asesoría en conflictos familiares, patrimoniales y sucesiones.
              Soluciones claras y efectivas para proteger tus derechos.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <i
              className="bi bi-house-door display-4 mb-3"
              style={{ color: "var(--color-accent)" }}
              display="block"
            ></i>
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Derecho Predial
            </h5>
            <p>
              Regularización de propiedades, escrituras y resolución de
              conflictos con los linderos. Protege tu patrimonio con respaldo
              legal.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="testimonial-box">
            <i
              className="bi bi-file-earmark-text display-4 mb-3"
              style={{ color: "var(--color-accent)" }}
              display="block"
            ></i>
            <h5
              className="fw-bold mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Contratos
            </h5>
            <p>
              Redacción, revisión y negociación de contratos con respaldo
              jurídico. Evita riesgos con documentos claros y seguros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
