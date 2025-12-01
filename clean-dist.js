#!/usr/bin/env node

/**
 * Script post-build para limpiar assets innecesarios
 * Elimina imágenes PNG duplicadas en favor de AVIF/WebP optimizadas
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "dist");
const IMAGES_DIR = path.join(DIST_DIR, "images");

// Imágenes a eliminar (mantener solo AVIF/WebP)
const PNG_TO_REMOVE = [
  "servicios.png", // Grande, usar AVIF/WebP en su lugar
  "foto-ab.png", // Grande, usar picture element con formatos modernos
  "foto-ab-optimized.png", // Ya tenemos AVIF/WebP
];

// Patrón de archivos a eliminar
const PATTERNS_TO_REMOVE = [
  /servicios\.png$/i,
  /foto-ab\.png$/i,
  /foto-ab-optimized\.png$/i,
];

function cleanDistImages() {
  console.log("🧹 Limpiando imágenes innecesarias del build...\n");

  if (!fs.existsSync(IMAGES_DIR)) {
    console.log("❌ Directorio images no encontrado");
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  let removedCount = 0;
  let savedBytes = 0;

  files.forEach((file) => {
    const filePath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(filePath);

    // Verificar si el archivo coincide con los patrones a eliminar
    const shouldRemove = PATTERNS_TO_REMOVE.some((pattern) =>
      pattern.test(file)
    );

    if (shouldRemove && stat.isFile()) {
      const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
      console.log(`  ❌ ${file} (${sizeMB} MB)`);
      fs.unlinkSync(filePath);
      removedCount++;
      savedBytes += stat.size;
    }
  });

  if (removedCount === 0) {
    console.log("✅ No hay imágenes innecesarias para eliminar");
  } else {
    const savedMB = (savedBytes / (1024 * 1024)).toFixed(2);
    console.log(`\n✅ Eliminados ${removedCount} archivo(s)`);
    console.log(`📊 Espacio ahorrado: ${savedMB} MB`);
    console.log(`📁 Las versiones AVIF/WebP están disponibles\n`);
  }
}

cleanDistImages();
