import InfoCard from "./InfoCard";

export default function Servicios() {
  return (
    <section id="servicios" className="section container">
      <h3 className="text-center mb-5" style={{ color: "var(--color-accent)" }}>
        Áreas de práctica
      </h3>
      <div className="row">
        <div className="col-md-4 mb-4">
          <InfoCard
            icon="bi-file-earmark-check"
            title="Derecho Civil"
            content="Asesoría en conflictos familiares, patrimoniales y sucesiones. Soluciones claras y efectivas para proteger tus derechos."
          />
        </div>
        <div className="col-md-4 mb-4">
          <InfoCard
            icon="bi-house-door"
            title="Derecho Predial"
            content="Regularización de propiedades, escrituras y resolución de conflictos con los linderos. Protege tu patrimonio con respaldo legal."
          />
        </div>
        <div className="col-md-4 mb-4">
          <InfoCard
            icon="bi-file-earmark-text"
            title="Contratos"
            content="Redacción, revisión y negociación de contratos con respaldo jurídico. Evita riesgos con documentos claros y seguros."
          />
        </div>
      </div>
    </section>
  );
}
