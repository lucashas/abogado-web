#!/usr/bin/env node

/**
 * Script alternativo de Lighthouse con mejor manejo de errores
 * Diseñado para trabajar en entornos Windows con restricciones de sandbox
 */

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL = process.env.LIGHTHOUSE_URL || "http://localhost:5173";
const OUTPUT_DIR = "lighthouse-reports";

// Crear carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runLighthouse() {
  console.log("🚀 Iniciando auditoría Lighthouse...");
  console.log(`📍 URL: ${URL}`);
  console.log(`📱 Modo: Mobile`);

  let chrome;
  try {
    // Intentar lanzar Chrome con configuración de sandbox deshabilitada
    console.log("🔧 Lanzando navegador...");
    chrome = await chromeLauncher.launch({
      chromeFlags: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-software-rasterizer",
        "--disable-extensions",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });

    console.log("✅ Navegador conectado (puerto: " + chrome.port + ")");

    // Configurar opciones de Lighthouse
    const options = {
      logLevel: "error", // Reducir verbosidad
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      port: chrome.port,
      emulatedFormFactor: "mobile",
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1638.4,
        uploadThroughputKbps: 819.2,
      },
    };

    console.log("⏳ Ejecutando auditoría (esto puede tomar 1-2 minutos)...");

    // Ejecutar auditoría
    const runnerResult = await lighthouse(URL, options);

    if (!runnerResult || !runnerResult.lhr) {
      throw new Error("La auditoría no generó resultados válidos");
    }

    // Generar nombre de archivo de reporte
    const timestamp = new Date().toISOString().split("T")[0];
    const reportName = `lighthouse-report-${timestamp}-${Date.now()}`;

    // Guardar reportes
    const htmlReportPath = path.join(OUTPUT_DIR, `${reportName}.html`);
    const jsonReportPath = path.join(OUTPUT_DIR, `${reportName}.json`);

    fs.writeFileSync(htmlReportPath, runnerResult.report[0]);
    fs.writeFileSync(jsonReportPath, runnerResult.report[1]);

    // Extraer métricas
    const lhr = runnerResult.lhr;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      "best-practices": Math.round(
        lhr.categories["best-practices"].score * 100
      ),
      seo: Math.round(lhr.categories.seo.score * 100),
    };

    // Mostrar resultados
    console.log("\n✅ ¡Auditoría completada!\n");
    console.log("📊 Puntuaciones (escala 0-100):");
    console.log(`  Performance:     ${scores.performance}%`);
    console.log(`  Accessibility:   ${scores.accessibility}%`);
    console.log(`  Best Practices:  ${scores["best-practices"]}%`);
    console.log(`  SEO:             ${scores.seo}%`);

    // Mostrar métricas clave de web vitals
    if (lhr.audits["first-contentful-paint"]) {
      const fcp = lhr.audits["first-contentful-paint"];
      console.log(`\n⚡ Métricas de velocidad:`);
      console.log(`  First Contentful Paint: ${fcp.displayValue || "N/A"}`);
    }

    if (lhr.audits["largest-contentful-paint"]) {
      const lcp = lhr.audits["largest-contentful-paint"];
      console.log(`  Largest Contentful Paint: ${lcp.displayValue || "N/A"}`);
    }

    // Mostrar mejoras sugeridas de alto impacto
    console.log("\n💡 Oportunidades de mejora (ordenadas por impacto):");
    // lhr.opportunities puede no existir en algunas ejecuciones; defensivo
    const rawOpportunities = lhr.opportunities || [];
    const opportunities = Array.isArray(rawOpportunities)
      ? rawOpportunities.filter((opp) => opp && opp.score !== 1)
      : [];

    if (opportunities.length > 0) {
      opportunities
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 5)
        .forEach((opp) => {
          const savingsMs = opp.metricSavings?.estimatedSavingsMs || 0;
          const savings = savingsMs > 0 ? ` (Ahorro: ~${savingsMs}ms)` : "";
          console.log(`  • ${opp.title}${savings}`);
        });
    } else {
      console.log(
        "  ✅ No hay mejoras de alto impacto detectadas (o no disponibles)"
      );
    }

    console.log(`\n📄 Reportes guardados en: ${OUTPUT_DIR}/`);
    console.log(`   📊 HTML: ${reportName}.html`);
    console.log(`   📋 JSON: ${reportName}.json`);
    console.log(`\n🌐 Abre: file://${path.resolve(htmlReportPath)}`);

    // Retornar status code 0
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error durante la auditoría:");
    console.error(error.message);

    if (error.message.includes("CHROME_INTERSTITIAL_ERROR")) {
      console.error("\n💡 Sugerencia: El navegador está siendo bloqueado.");
      console.error("   Intenta desactivar temporalmente antivirus/firewall.");
    }

    process.exit(1);
  } finally {
    if (chrome) {
      console.log("\n🧹 Cerrando navegador...");
      await chromeLauncher.killall();
    }
  }
}

// Ejecutar
runLighthouse();
