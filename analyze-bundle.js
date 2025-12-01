#!/usr/bin/env node

/**
 * Script para analizar el tamaño del bundle de build
 * Proporciona desglose detallado de assets generados
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = "dist";

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function gzipSize(str) {
  // Estimación simple (real requerería gzip compresión)
  // Típicamente gzip comprime a ~20-30% del tamaño original
  return Math.ceil(str.length * 0.25);
}

function analyzeBundle() {
  console.log("\n🔍 Análisis de Bundle\n");
  console.log("=".repeat(60));

  if (!fs.existsSync(DIST_DIR)) {
    console.error("❌ Carpeta 'dist' no encontrada. Ejecuta: npm run build");
    process.exit(1);
  }

  let totalSize = 0;
  let totalGzip = 0;
  const files = [];

  function walkDir(dir, prefix = "") {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const filePath = path.join(dir, item);
      const stat = fs.statSync(filePath);
      const relativePath = path.relative(DIST_DIR, filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, prefix);
      } else {
        const size = stat.size;
        const gzipSizeEst = gzipSize(fs.readFileSync(filePath, "utf8"));
        totalSize += size;
        totalGzip += gzipSizeEst;

        files.push({
          path: relativePath,
          size,
          gzipSize: gzipSizeEst,
          ratio: ((gzipSizeEst / size) * 100).toFixed(1),
        });
      }
    }
  }

  walkDir(DIST_DIR);

  // Ordenar por tamaño descendente
  files.sort((a, b) => b.size - a.size);

  // Mostrar tabla
  console.log("\n📦 Assets Principales:\n");
  console.log("File".padEnd(40) + "Size".padStart(12) + "Gzipped".padStart(12));
  console.log("-".repeat(60));

  for (const file of files) {
    const name =
      file.path.length > 38 ? "..." + file.path.slice(-35) : file.path;
    const sizeStr = formatBytes(file.size);
    const gzipStr = formatBytes(file.gzipSize);
    console.log(name.padEnd(40) + sizeStr.padStart(12) + gzipStr.padStart(12));
  }

  console.log("-".repeat(60));
  console.log(
    "Total".padEnd(40) +
      formatBytes(totalSize).padStart(12) +
      formatBytes(totalGzip).padStart(12)
  );

  // Análisis por tipo
  console.log("\n\n📊 Desglose por Tipo:\n");

  const byType = {};
  files.forEach((file) => {
    const ext = path.extname(file.path).substring(1) || "sin-extensión";
    if (!byType[ext]) {
      byType[ext] = { size: 0, gzip: 0, count: 0 };
    }
    byType[ext].size += file.size;
    byType[ext].gzip += file.gzipSize;
    byType[ext].count += 1;
  });

  Object.keys(byType)
    .sort((a, b) => byType[b].size - byType[a].size)
    .forEach((ext) => {
      const data = byType[ext];
      console.log(
        `  .${ext.padEnd(8)} ${data.count
          .toString()
          .padStart(3)} files  ${formatBytes(data.size).padStart(
          10
        )} (gzipped: ${formatBytes(data.gzip).padStart(10)})`
      );
    });

  // Recomendaciones
  console.log("\n\n💡 Recomendaciones:\n");

  const largeFiles = files.filter((f) => f.size > 1024 * 500); // Archivos > 500KB
  if (largeFiles.length > 0) {
    console.log("⚠️  Archivos grandes (>500KB) encontrados:");
    largeFiles.forEach((f) => {
      console.log(`   • ${f.path}: ${formatBytes(f.size)}`);
    });
    console.log(
      "   Considera: Lazy loading, code splitting, o compresión de imágenes\n"
    );
  }

  const jsFiles = files.filter((f) => f.path.endsWith(".js"));
  const totalJs = jsFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalJs > 300 * 1024) {
    // > 300KB
    console.log(
      `ℹ️  JavaScript total: ${formatBytes(totalJs)} (Objetivo: <200KB)`
    );
    console.log(
      "   Considera: Code splitting, tree-shaking, o minificación adicional\n"
    );
  }

  // Summary
  console.log("✅ Análisis completado\n");
  console.log("=".repeat(60));
  console.log("\n");
}

analyzeBundle();
