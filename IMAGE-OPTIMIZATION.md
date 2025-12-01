# Guía de Optimización de Imágenes

Este documento explica cómo optimizar las imágenes de la página para mejorar rendimiento.

## 🖼️ Imágenes Actuales

### `/public/images/foto-ab.png`

- **Ubicación**: Foto del abogado en sección "Sobre mí"
- **Tamaño recomendado**: 400x500px (max)
- **Formato recomendado**: WebP con fallback PNG

## 📊 Formatos Recomendados

### WebP (mejor compresión)

```bash
# Convertir PNG a WebP
npx cwebp -q 80 foto-ab.png -o foto-ab.webp

# Convertir JPG a WebP
npx cwebp -q 80 foto-ab.jpg -o foto-ab.webp
```

### AVIF (mejor compresión aún, pero menos soporte)

```bash
# Convertir a AVIF
npm install -g avif
avifenc --min 0 --max 63 -a end -j all -d 8 foto-ab.png foto-ab.avif
```

## 🎯 Implementar Picture Element

Actualizar `SobreMi.jsx`:

```jsx
<picture>
  <source srcSet="/images/foto-ab.webp" type="image/webp" />
  <source srcSet="/images/foto-ab.avif" type="image/avif" />
  <img
    src="/images/foto-ab.png"
    alt="Foto del abogado Juan González"
    className="img-fluid rounded shadow-sm"
    style={{ maxHeight: "320px", objectFit: "cover" }}
    loading="lazy"
    decoding="async"
  />
</picture>
```

## 📱 Responsive Images

Para imágenes responsive, agregar srcSet:

```jsx
<img
  srcSet="/images/foto-ab-small.webp 480w,
          /images/foto-ab-medium.webp 768w,
          /images/foto-ab.webp 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="/images/foto-ab.png"
  alt="Foto del abogado"
  loading="lazy"
  decoding="async"
/>
```

## 🔧 Herramientas Recomendadas

### Online (gratuito, sin instalar)

- [Compressor.io](https://compressor.io/) - Comprime PNG, JPG, WebP
- [TinyPNG](https://tinypng.com/) - Muy efectivo para PNG
- [CloudConvert](https://cloudconvert.com/) - Convierte entre formatos
- [Squoosh](https://squoosh.app/) - Herramienta Google oficial

### CLI (línea de comandos)

```bash
# Instalar herramientas
npm install -g cwebp-bin          # WebP
npm install -g imagemin-cli       # Compresión general

# Comprimir
imagemin *.png --out-dir=compressed --plugin=pngquant
cwebp -q 80 imagen.png -o imagen.webp
```

## 📈 Impacto Esperado

| Formato        | Tamaño | Compresión |
| -------------- | ------ | ---------- |
| PNG original   | 200 KB | 0%         |
| PNG optimizado | 80 KB  | 60%        |
| WebP           | 40 KB  | 80%        |
| AVIF           | 30 KB  | 85%        |

## ⚡ Paso a Paso Rápido

1. **Descargar imagen**: Obtener `foto-ab.png`
2. **Comprimir PNG**: Usar TinyPNG o Squoosh
3. **Convertir a WebP**: Usar `npx cwebp -q 80 foto-ab.png -o foto-ab.webp`
4. **Guardar en** `/public/images/`
5. **Actualizar HTML**: Usar `<picture>` con fallback

## 🎬 Resultado Después

Con estas optimizaciones:

- Performance aumentará de 45% a ~70-80%
- LCP (Largest Contentful Paint) se reducirá significativamente
- Las imágenes cargarán casi instantáneamente en móvil

---

**Nota**: Las imágenes ya tienen `loading="lazy"` y `decoding="async"` después de las optimizaciones implementadas. Solo falta convertir los formatos.
