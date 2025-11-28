export default function SobreMi() {
  return (
    <section id="sobre-mi" className="section container">
      <h3 className="text-center mb-5" style={{ color: 'var(--color-accent)' }}>
        Sobre mí
      </h3>
      <div className="row align-items-center">
        
        {/* Foto del abogado */}
        <div className="col-md-4 mb-4 text-center">
          <img 
            src="/images/foto-ab.png" 
            alt="Foto del abogado Juan González" 
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '320px', objectFit: 'cover' }}
          />
        </div>

        {/* Texto de presentación */}
        <div className="col-md-8">
          <p className="lead mb-3" style={{ color: 'var(--color-text)' }}>
            Soy Juan González, abogado ecuatoriano con más de 10 años de experiencia en derecho civil y predial.
          </p>
          <p className="sobre-mi-parrafo" style={{ color: 'var(--color-text)' }}>
            Egresado de la Universidad Central del Ecuador, he representado a personas naturales y empresas en procesos de contratos, 
            litigios civiles y asesoría preventiva. Mi compromiso es brindar soluciones legales claras, efectivas y con ética profesional.
          </p>
          <p className="sobre-mi-parrafo" style={{ color: 'var(--color-text)' }}>
            Creo firmemente que cada caso merece atención personalizada, transparencia y acompañamiento constante. 
            Mi objetivo es defender tus derechos y ayudarte a tomar decisiones informadas.
          </p>
        </div>
      </div>
    </section>
  );
}