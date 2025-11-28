export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 text-center">
      {/* Redes sociales */}
      <div className="social-links mb-3">
        <a 
          href="https://www.facebook.com/jgabogado" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="me-3"
        >
          <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
        </a>
        <a 
          href="https://wa.me/593999999999" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp" style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
        </a>
      </div>

      {/* Derechos reservados */}
      <p className="mb-0" style={{ color: 'var(--color-accent)' }}>
  © 2025 JG Abogado. Todos los derechos reservados. Sitio desarrollado por St@lin.
</p>
    </footer>
  );
}