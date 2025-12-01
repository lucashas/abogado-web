#!/usr/bin/env node

/**
 * Script automatizado para auditar la página con Lighthouse
 * Genera un reporte HTML con métricas de Performance, Accessibility, SEO y Best Practices
 * Configurado para emular dispositivo móvil
 *
 * Uso: node lighthouse-audit.js
 * Requisitos: npm install --save-dev lighthouse chrome-launcher
 */

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL = process.env.LIGHTHOUSE_URL || "http://localhost:5173"; // usar puerto 5173 por defecto
const OUTPUT_DIR = "lighthouse-reports";
const REPORT_FILENAME = `lighthouse-report-${
  new Date().toISOString().split("T")[0]
}-${Date.now()}.html`;

// Crear carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runLighthouse() {
  console.log("🚀 Iniciando auditoría Lighthouse...");
  console.log(`📍 URL: ${URL}`);
  console.log(`📱 Modo: Mobile (emulación Moto G4)`);

  let chrome;
  try {
    // Lanzar Chrome con flags para evitar problemas interstitiales
    chrome = await chromeLauncher.launch({
      chromeFlags: [
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-software-rasterizer",
        "--disable-extensions",
      ],
    });

    // Configuración de Lighthouse (móvil)
    const options = {
      logLevel: "info",
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      port: chrome.port,
      emulatedFormFactor: "mobile", // 👈 Emulación móvil
    };

    // Ejecutar auditoría
    const runnerResult = await lighthouse(URL, options);

    // Guardar reporte HTML
    const htmlReportPath = path.join(OUTPUT_DIR, REPORT_FILENAME);
    fs.writeFileSync(htmlReportPath, runnerResult.report[0]);

    // Guardar reporte JSON
    const jsonReportPath = path.join(
      OUTPUT_DIR,
      REPORT_FILENAME.replace(".html", ".json")
    );
    fs.writeFileSync(jsonReportPath, runnerResult.report[1]);

    // Extraer y mostrar puntuaciones clave
    const lhr = runnerResult.lhr;
    console.log("\n✅ Auditoría completada\n");
    console.log("📊 Puntuaciones (escala 0-100):");
    console.log(
      `  Performance:     ${lhr.categories.performance.score * 100 || 0}%`
    );
    console.log(
      `  Accessibility:   ${lhr.categories.accessibility.score * 100 || 0}%`
    );
    console.log(
      `  Best Practices:  ${lhr.categories["best-practices"].score * 100 || 0}%`
    );
    console.log(`  SEO:             ${lhr.categories.seo.score * 100 || 0}%`);

    // Mostrar audits críticos con bajo puntaje
    console.log("\n⚠️  Auditorías críticas (si hay alertas):");
    Object.keys(lhr.audits).forEach((auditKey) => {
      const audit = lhr.audits[auditKey];
      if (
        audit.score !== null &&
        audit.score < 0.5 &&
        audit.scoreDisplayMode !== "informative"
      ) {
        console.log(
          `  ❌ ${audit.title}: ${(audit.score * 100).toFixed(0)}% - ${
            audit.description
          }`
        );
      }
    });

    console.log(`\n📄 Reportes guardados en: ${OUTPUT_DIR}/`);
    console.log(`   📊 HTML: ${REPORT_FILENAME}`);
    console.log(`   📋 JSON: ${REPORT_FILENAME.replace(".html", ".json")}`);
    console.log(
      `\n🌐 Abre el reporte HTML en tu navegador para ver detalles completos.`
    );
  } catch (error) {
    console.error("❌ Error en la auditoría:", error);
    process.exit(1);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Ejecutar
runLighthouse();
