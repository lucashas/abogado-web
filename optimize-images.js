#!/usr/bin/env node

/**
 * Script para optimizar imágenes automáticamente
 * Comprime PNG/JPG y convierte a WebP
 *
 * Requisitos: npm install --save-dev sharp
 * Uso: node optimize-images.js
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "public", "images");
const OUTPUT_DIR = path.join(__dirname, "public", "images", "optimized");

// Crear carpeta de output
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  console.log("🖼️  Iniciando optimización de imágenes...\n");

  try {
    const files = fs
      .readdirSync(IMAGES_DIR)
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

    if (files.length === 0) {
      console.log("❌ No se encontraron imágenes PNG/JPG en", IMAGES_DIR);
      return;
    }

    for (const file of files) {
      const inputPath = path.join(IMAGES_DIR, file);
      const filename = path.parse(file).name;
      const pngOutput = path.join(OUTPUT_DIR, `${filename}-optimized.png`);
      const webpOutput = path.join(OUTPUT_DIR, `${filename}.webp`);
      const avifOutput = path.join(OUTPUT_DIR, `${filename}.avif`);

      console.log(`📦 Procesando: ${file}`);

      try {
        // Obtener info original
        const metadata = await sharp(inputPath).metadata();
        const originalSize = fs.statSync(inputPath).size;
        console.log(
          `   Dimensiones: ${metadata.width}x${metadata.height}, Tamaño: ${(
            originalSize / 1024
          ).toFixed(2)}KB`
        );

        // Optimizar PNG/JPG
        const pngBuffer = await sharp(inputPath)
          .png({ quality: 80, progressive: true })
          .toBuffer();
        fs.writeFileSync(pngOutput, pngBuffer);
        const pngSize = pngBuffer.length;
        console.log(
          `   ✅ PNG optimizado: ${(pngSize / 1024).toFixed(2)}KB (${(
            (1 - pngSize / originalSize) *
            100
          ).toFixed(1)}% reducción)`
        );

        // Convertir a WebP
        const webpBuffer = await sharp(inputPath)
          .webp({ quality: 80 })
          .toBuffer();
        fs.writeFileSync(webpOutput, webpBuffer);
        const webpSize = webpBuffer.length;
        console.log(
          `   ✅ WebP: ${(webpSize / 1024).toFixed(2)}KB (${(
            (1 - webpSize / originalSize) *
            100
          ).toFixed(1)}% reducción)`
        );

        // Convertir a AVIF
        const avifBuffer = await sharp(inputPath)
          .avif({ quality: 65 })
          .toBuffer();
        fs.writeFileSync(avifOutput, avifBuffer);
        const avifSize = avifBuffer.length;
        console.log(
          `   ✅ AVIF: ${(avifSize / 1024).toFixed(2)}KB (${(
            (1 - avifSize / originalSize) *
            100
          ).toFixed(1)}% reducción)\n`
        );
      } catch (err) {
        console.error(`   ❌ Error: ${err.message}\n`);
      }
    }

    console.log("✅ Optimización completada!");
    console.log(`📁 Imágenes guardadas en: ${OUTPUT_DIR}/`);
    console.log(
      "\n💡 Próximo paso: Reemplazar las imágenes originales y actualizar los paths en los componentes."
    );
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

optimizeImages();
