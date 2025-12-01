# Auditoría Lighthouse Automatizada

Este proyecto incluye un script automatizado para auditar el rendimiento, accesibilidad y SEO de la página web en dispositivos móviles usando **Lighthouse**.

## 📋 Requisitos previos

- Node.js v14+ instalado
- El proyecto debe estar en funcionamiento con `npm run dev`

## 🚀 Cómo usar

### 1. Instalar dependencias (solo primera vez)

```bash
npm install
```

Esto instalará:

- `lighthouse` - herramienta de auditoría de Google
- `chrome-launcher` - para ejecutar Chrome sin interfaz

### 2. Iniciar el servidor de desarrollo

En una terminal:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173` (por defecto).

### 3. Ejecutar la auditoría

En otra terminal (mientras el servidor está ejecutándose):

```bash
npm run audit:lighthouse
```

### 4. Revisar resultados

El script generará reportes en la carpeta `lighthouse-reports/`:

- **lighthouse-report-YYYY-MM-DD-TIMESTAMP.html** - Reporte visual completo
- **lighthouse-report-YYYY-MM-DD-TIMESTAMP.json** - Datos en formato JSON para análisis

Abre el archivo `.html` en tu navegador para ver:

- ✅ Puntuaciones globales (Performance, Accessibility, Best Practices, SEO)
- 📊 Métricas clave (FCP, LCP, CLS, etc.)
- ⚠️ Auditorías fallidas con recomendaciones de mejora
- 📱 Resultados emulando dispositivo Moto G4 (móvil)

## 📊 Qué mide

### Performance (Rendimiento)

- Velocidad de carga
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)

### Accessibility (Accesibilidad)

- Contraste de colores
- Etiquetas ARIA
- Navegabilidad por teclado
- Tamaño de elementos táctiles

### Best Practices (Buenas prácticas)

- Uso de HTTPS
- Seguridad
- Performance
- Compatibilidad de navegador

### SEO

- Meta etiquetas
- Viewport configurado
- Estructura de encabezados
- Mobile-friendly

## 💡 Consejos

### Optimización por resultados

Si un reporte muestra bajo puntaje en **Performance**:

- Comprimir imágenes
- Usar code splitting
- Minificar CSS/JS
- Optimizar fuentes

Si muestra bajo **Accessibility**:

- Mejorar contraste de colores
- Añadir atributos `alt` a imágenes
- Usar etiquetas semánticas HTML
- Aumentar tamaño de botones/enlaces

Si muestra bajo **SEO**:

- Mejorar meta descriptions
- Usar encabezados jerárquicos (h1, h2, h3)
- Añadir schema markup
- Optimizar URLs

### Automatizar auditorías periódicas

Puedes agregar el comando a un workflow de CI/CD (GitHub Actions, GitLab CI, etc.) para ejecutar auditorías automáticamente en cada push.

Ejemplo `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse Audit
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run dev &
      - run: sleep 5 && npm run audit:lighthouse
```

## 🔧 Personalizar el script

Edita `lighthouse-audit.js` para:

- Cambiar la URL auditada (ej. si usas otro puerto)
- Modificar el dispositivo emulado (desktop, mobile, tablet)
- Cambiar categorías auditadas
- Ajustar timeouts

## 📚 Recursos útiles

- [Documentación oficial de Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Web Vitals de Google](https://web.dev/vitals/)
- [Recomendaciones de accesibilidad WCAG](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Nota:** Los reportes se guardan en `lighthouse-reports/` por defecto. Puedes revisar históricos de auditorías para ver cómo mejora tu sitio en el tiempo.
