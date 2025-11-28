export default function Servicios() {
  return (
    <section id="servicios" className="section container">
      <h3 className="text-center mb-5" style={{ color: 'var(--color-accent)' }}>
        Áreas de práctica
      </h3>
      <div className="row">
        {/* Tarjeta 1 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'var(--color-accent)' }}>
                Derecho Civil
              </h5>
              <p className="card-text">
                Asesoría en conflictos familiares, patrimoniales y sucesiones. 
                Soluciones claras y efectivas para proteger tus derechos.
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'var(--color-accent)' }}>
                Derecho Predial
              </h5>
              <p className="card-text">
                Regularización de propiedades, escrituras y resolución de conflictos de linderos. 
                Protege tu patrimonio con respaldo legal.
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'var(--color-accent)' }}>
                Contratos
              </h5>
              <p className="card-text">
                Redacción, revisión y negociación de contratos con respaldo jurídico sólido. 
                Evita riesgos con documentos claros y seguros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}