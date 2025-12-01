#!/bin/bash

# Script para ejecutar auditoría Lighthouse de forma automatizada en Mac/Linux
# Uso: chmod +x run-lighthouse-audit.sh && ./run-lighthouse-audit.sh

echo "=============================================="
echo "🚀 Auditoría Lighthouse Automatizada"
echo "=============================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

# Instalar dependencias si node_modules no existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas"
    echo ""
fi

# Verificar si el servidor ya está corriendo
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Servidor ya está ejecutándose en http://localhost:5173"
    echo ""
else
    echo "⚠️  Servidor no está corriendo"
    echo "📍 Iniciando servidor en otra terminal..."
    
    # Abrir una nueva terminal (funciona en Mac y Linux)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open -a Terminal "npm run dev"
    else
        gnome-terminal -- npm run dev &
    fi
    
    echo "⏳ Esperando a que el servidor se inicie..."
    sleep 8
fi

# Ejecutar auditoría
echo ""
echo "🔍 Ejecutando auditoría Lighthouse..."
echo "   (Este proceso puede tardar 1-2 minutos)"
echo ""

node lighthouse-audit.js

echo ""
echo "✅ Auditoría completada!"
echo "📂 Los reportes están en la carpeta: ./lighthouse-reports/"
echo ""
echo "💡 Consejo: Abre el archivo .html en tu navegador para ver detalles completos"
echo ""
