# Script para ejecutar auditoría Lighthouse de forma automatizada en Windows
# Uso: .\run-lighthouse-audit.ps1

Write-Host "==============================================`n" -ForegroundColor Green
Write-Host "🚀 Auditoría Lighthouse Automatizada`n" -ForegroundColor Green
Write-Host "==============================================`n" -ForegroundColor Green

# Verificar si Node.js está instalado
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado o no está en PATH" -ForegroundColor Red
    Write-Host "   Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js detectado: $(node --version)`n" -ForegroundColor Green

# Instalar dependencias si node_modules no existe
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
    npm install
    Write-Host "✅ Dependencias instaladas`n" -ForegroundColor Green
}

# Verificar si el servidor ya está corriendo
$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 2 -ErrorAction SilentlyContinue
    $serverRunning = $true
} catch {
    $serverRunning = $false
}

if ($serverRunning) {
    Write-Host "✅ Servidor ya está ejecutándose en http://localhost:5173`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Servidor no está corriendo" -ForegroundColor Yellow
    Write-Host "📍 Iniciando servidor en otra ventana..." -ForegroundColor Cyan
    
    # Abrir PowerShell en otra ventana y ejecutar npm run dev
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "npm run dev"
    
    Write-Host "⏳ Esperando a que el servidor se inicie..." -ForegroundColor Yellow
    Start-Sleep -Seconds 8
}

# Ejecutar auditoría
Write-Host "`n🔍 Ejecutando auditoría Lighthouse..." -ForegroundColor Cyan
Write-Host "   (Este proceso puede tardar 1-2 minutos)`n" -ForegroundColor Gray

node lighthouse-audit.js

Write-Host "`n✅ Auditoría completada!" -ForegroundColor Green
Write-Host "📂 Los reportes están en la carpeta: ./lighthouse-reports/`n" -ForegroundColor Green
Write-Host "💡 Consejo: Abre el archivo .html en tu navegador para ver detalles completos`n" -ForegroundColor Cyan
