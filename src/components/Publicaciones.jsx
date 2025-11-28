export default function Publicaciones() {
  return (
    <section id="publicaciones" className="section container">
      <h3 className="text-center mb-5" style={{ color: 'var(--color-accent)' }}>
        Publicaciones
      </h3>
      <div className="row">
        {/* Publicación 1 */}
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'var(--color-accent)' }}>
                Incumplimiento de contrato
              </h5>
              <p className="card-text">
                El Código Civil ecuatoriano (Art. 1572) permite exigir cumplimiento o indemnización por daños y perjuicios 
                cuando una de las partes incumple lo pactado. Es clave documentar el acuerdo y las pruebas del incumplimiento.
              </p>
            </div>
          </div>
        </div>

        {/* Publicación 2 */}
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'var(--color-accent)' }}>
                Medidas cautelares en juicios civiles
              </h5>
              <p className="card-text">
                El COGEP (Art. 130) permite solicitar medidas cautelares para proteger derechos antes de la sentencia. 
                Por ejemplo, la retención de ingresos en juicios de alimentos o la prohibición de enajenar bienes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}