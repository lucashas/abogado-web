import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contacto" className="section container">
      <div className="text-center mb-5">
        <h3 style={{ color: "var(--color-accent)" }} className="mb-3">
          Ponte en contacto
        </h3>
        <p className="lead" style={{ color: "var(--color-text)" }}>
          Estoy aquí para escucharte. Cuéntame tu caso y te asesoraré con rigor
          y ética profesional.
        </p>
      </div>

      <div className="row justify-content-center align-items-start gap-4">
        {/* Formulario */}
        <div className="col-lg-5">
          <div className="contacto-box p-5 h-100">
            <h5 className="mb-4" style={{ color: "var(--color-accent)" }}>
              <i className="bi bi-chat-left-dots me-2"></i>
              Envía tu consulta
            </h5>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-500">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    className={`form-control ${
                      errors.nombre ? "is-invalid" : ""
                    }`}
                    placeholder="Ej. María López"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback d-block">
                      {errors.nombre}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-500">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Ej. maria@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-500">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    className="form-control"
                    placeholder="Ej. +593 99 999 9999"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-500">Mensaje</label>
                  <textarea
                    name="mensaje"
                    className={`form-control ${
                      errors.mensaje ? "is-invalid" : ""
                    }`}
                    rows="5"
                    placeholder="Cuéntame tu situación legal..."
                    value={formData.mensaje}
                    onChange={handleChange}
                  ></textarea>
                  {errors.mensaje && (
                    <div className="invalid-feedback d-block">
                      {errors.mensaje}
                    </div>
                  )}
                </div>

                <button type="submit" className="accent-button w-100">
                  <i className="bi bi-send me-2"></i>
                  Enviar consulta
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i
                    className="bi bi-check-circle"
                    style={{ fontSize: "3rem", color: "var(--color-accent)" }}
                  ></i>
                </div>
                <p className="confirmation">
                  ¡Gracias por tu mensaje! <br />
                  Te responderé en las próximas 24 horas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="col-lg-5">
          <div className="row g-3">
            {/* Teléfono */}
            <div className="col-12">
              <div className="contacto-info-card p-4">
                <div className="d-flex align-items-start">
                  <i
                    className="bi bi-telephone me-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-accent)",
                      marginTop: "0.25rem",
                    }}
                  ></i>
                  <div>
                    <h6
                      className="mb-2"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Teléfono
                    </h6>
                    <p className="mb-0">+593 (0) 999 999 999</p>
                    <small style={{ color: "var(--color-muted)" }}>
                      Llamadas y WhatsApp
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="col-12">
              <div className="contacto-info-card p-4">
                <div className="d-flex align-items-start">
                  <i
                    className="bi bi-envelope me-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-accent)",
                      marginTop: "0.25rem",
                    }}
                  ></i>
                  <div>
                    <h6
                      className="mb-2"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Correo
                    </h6>
                    <p className="mb-0">
                      <a
                        href="mailto:jgabogado@correo.com"
                        style={{ color: "var(--color-accent)" }}
                      >
                        jgabogado@correo.com
                      </a>
                    </p>
                    <small style={{ color: "var(--color-muted)" }}>
                      Respuesta en 24 horas
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="col-12">
              <div className="contacto-info-card p-4">
                <div className="d-flex align-items-start">
                  <i
                    className="bi bi-geo-alt me-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-accent)",
                      marginTop: "0.25rem",
                    }}
                  ></i>
                  <div style={{ width: "100%" }}>
                    <h6
                      className="mb-2"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Ubicación
                    </h6>
                    <p className="mb-2">
                      Av. 10 de Agosto y Calle Bolívar
                      <br />
                      Edificio Jurídico Central, Piso 2
                    </p>
                    <p className="mb-0">Morona Santiago, Ecuador</p>
                    <a
                      href="https://www.google.com/maps?q=Morona+Santiago+Ecuador"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--color-accent)",
                        fontSize: "0.9rem",
                      }}
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="col-12">
              <div className="contacto-info-card p-4">
                <div className="d-flex align-items-start">
                  <i
                    className="bi bi-clock me-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-accent)",
                      marginTop: "0.25rem",
                    }}
                  ></i>
                  <div>
                    <h6
                      className="mb-2"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Horario de atención
                    </h6>
                    <p className="mb-1">
                      <strong>Lunes a Viernes:</strong> 08:00 – 17:00
                    </p>
                    <p className="mb-0">
                      <strong>Sábado:</strong> 09:00 – 13:00
                    </p>
                    <small
                      style={{ color: "var(--color-muted)" }}
                      className="d-block mt-2"
                    >
                      Consultas de emergencia disponibles
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
