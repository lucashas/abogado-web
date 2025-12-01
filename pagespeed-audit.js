#!/usr/bin/env node

/**
 * Script para medir performance usando PageSpeed Insights API
 * Alternativa a Lighthouse CLI que no requiere Chrome local
 *
 * Requisito: PAGESPEED_API_KEY en variables de entorno o archivo .env
 * Uso: node pagespeed-audit.js [URL]
 */

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = "lighthouse-reports";

// Crear carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runPageSpeedAudit() {
  // Obtener URL del argumento o variable de entorno
  const url =
    process.argv[2] || process.env.PAGESPEED_URL || "http://localhost:4173";
  const apiKey = process.env.PAGESPEED_API_KEY;

  console.log("🚀 Iniciando auditoría PageSpeed Insights...");
  console.log(`📍 URL: ${url}`);
  console.log(`📱 Estrategia: Mobile`);

  // Si no hay API key, usar URL pública
  if (!apiKey) {
    console.log("\n⚠️  PAGESPEED_API_KEY no encontrada");
    console.log("   Usando endpoint público (limitado a 25 req/día)\n");
  }

  try {
    // Construir URL de API
    const apiUrl = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );
    apiUrl.searchParams.append("url", url);
    apiUrl.searchParams.append("strategy", "mobile");
    apiUrl.searchParams.append("category", "performance");
    apiUrl.searchParams.append("category", "accessibility");
    apiUrl.searchParams.append("category", "best-practices");
    apiUrl.searchParams.append("category", "seo");

    if (apiKey) {
      apiUrl.searchParams.append("key", apiKey);
    }

    console.log(
      "⏳ Consultando PageSpeed API (esto puede tomar 30 segundos)...\n"
    );

    // Hacer request a PageSpeed API
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `API Error: ${error.error?.message || response.statusText}`
      );
    }

    const data = await response.json();

    // Extraer puntuaciones
    const lighthouseResult = data.lighthouseResult;
    if (!lighthouseResult) {
      throw new Error("No se recibieron resultados de Lighthouse");
    }

    const scores = {
      performance: Math.round(
        lighthouseResult.categories.performance.score * 100
      ),
      accessibility: Math.round(
        lighthouseResult.categories.accessibility.score * 100
      ),
      "best-practices": Math.round(
        lighthouseResult.categories["best-practices"].score * 100
      ),
      seo: Math.round(lighthouseResult.categories.seo.score * 100),
    };

    // Mostrar resultados
    console.log("✅ ¡Auditoría completada!\n");
    console.log("📊 Puntuaciones (escala 0-100):");
    console.log(
      `  Performance:     ${scores.performance}% ${getGrade(
        scores.performance
      )}`
    );
    console.log(
      `  Accessibility:   ${scores.accessibility}% ${getGrade(
        scores.accessibility
      )}`
    );
    console.log(
      `  Best Practices:  ${scores["best-practices"]}% ${getGrade(
        scores["best-practices"]
      )}`
    );
    console.log(`  SEO:             ${scores.seo}% ${getGrade(scores.seo)}`);

    // Web Vitals
    if (lighthouseResult.audits["metrics"]) {
      const metrics = lighthouseResult.audits["metrics"].details.items[0];
      console.log(`\n⚡ Core Web Vitals:`);
      console.log(`  FCP:  ${metrics.first_contentful_paint.toFixed(0)}ms`);
      console.log(`  LCP:  ${metrics.largest_contentful_paint.toFixed(0)}ms`);
      console.log(`  CLS:  ${metrics.cumulative_layout_shift.toFixed(3)}`);
      console.log(
        `  FID:  ${metrics.first_input_delay?.toFixed(0) || "N/A"}ms`
      );
    }

    // Oportunidades
    console.log("\n💡 Oportunidades de Mejora:");
    const opportunities = (lighthouseResult.opportunities || [])
      .filter((opp) => opp.score < 1)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5);

    if (opportunities.length > 0) {
      opportunities.forEach((opp, i) => {
        const savings = opp.metricSavings?.estimatedSavingsMs || 0;
        const savingsText = savings > 0 ? ` (~${savings}ms)` : "";
        console.log(`  ${i + 1}. ${opp.title}${savingsText}`);
      });
    } else {
      console.log("  ✅ No hay oportunidades críticas detectadas");
    }

    // Guardar reporte JSON
    const timestamp = new Date().toISOString().split("T")[0];
    const reportName = `pagespeed-report-${timestamp}-${Date.now()}`;
    const jsonPath = path.join(OUTPUT_DIR, `${reportName}.json`);

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`\n📄 Reporte guardado: ${reportName}.json`);

    // Mostrar URL de reporte interactivo
    console.log(
      `\n🌐 Ver reporte interactivo en: https://pagespeed.web.dev/analysis/${encodeURIComponent(
        url
      )}?form_factor=mobile`
    );

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error durante la auditoría:");
    console.error(error.message);

    if (error.message.includes("429") || error.message.includes("quota")) {
      console.error("\n💡 Límite de cuota alcanzado.");
      console.error(
        "   Obtén un API Key gratuito en: https://console.cloud.google.com/"
      );
      console.error("   Exporta como: export PAGESPEED_API_KEY=tu_clave");
    }

    if (error.message.includes("localhost")) {
      console.error(
        "\n💡 PageSpeed API no puede acceder URLs locales (localhost)."
      );
      console.error("   Intenta deploying a producción primero.");
    }

    process.exit(1);
  }
}

function getGrade(score) {
  if (score >= 90) return "🟢 Excelente";
  if (score >= 50) return "🟡 Necesita Mejora";
  return "🔴 Bajo";
}

// Ejecutar
runPageSpeedAudit();
