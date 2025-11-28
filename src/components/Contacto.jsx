export default function Contacto() {
  return (
    <section id="contacto" className="section container">
      <h3 className="text-center mb-4" style={{ color: 'var(--color-accent)' }}>
        Contacto
      </h3>

      {/* Párrafo introductorio */}
      <div className="text-center mb-4">
        <p className="lead" style={{ color: 'var(--color-text)' }}>
          Escríbeme y cuéntame tu caso o problema.  
          Estoy aquí para escucharte y brindarte una solución legal clara y efectiva.
        </p>
      </div>

      {/* Formulario de contacto */}
      <div className="contacto-box mx-auto p-4 mb-5">
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" placeholder="Ej. María López" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" placeholder="Ej. maria@correo.com" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows="4" placeholder="Escribe tu consulta aquí..." required></textarea>
          </div>
          <button type="submit" className="accent-button w-100">
            Enviar consulta
          </button>
        </form>
      </div>

      {/* Ubicación del abogado */}
      <div className="ubicacion-box mx-auto text-center p-4">
        <h5 style={{ color: 'var(--color-accent)' }}>Ubicación</h5>
        <p className="mb-1">Av. 10 de Agosto y Calle Bolívar, Edificio Jurídico Central, Piso 2</p>
        <p className="mb-1">Morona Santiago, Ecuador</p>
        <p className="mb-3">Horario de atención: Lunes a Viernes, 08h00 – 17h00</p>
        <a 
          href="https://www.google.com/maps?q=Morona+Santiago+Ecuador" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="accent-button"
        >
          Ver en Google Maps
        </a>
      </div>
    </section>
  );
}