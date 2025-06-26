# Baby Recipe App Runner Script
# Run this script to start your application

Write-Host "🍼 Baby Recipe App Starter" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Then restart PowerShell and run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found" -ForegroundColor Yellow
    Write-Host "Creating basic .env file..." -ForegroundColor Yellow
    
    @"
# Spoonacular API Key (get from https://spoonacular.com/food-api)
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here

# Firebase Configuration (get from your Firebase project)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Server Configuration
PORT=3001
NODE_ENV=development
"@ | Out-File -FilePath ".env" -Encoding UTF8
    
    Write-Host "📝 Created .env file. Please update it with your API keys!" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Start the server
Write-Host "🚀 Starting the backend server..." -ForegroundColor Blue
Write-Host "The server will run in the background." -ForegroundColor Yellow
Write-Host "You can stop it later by closing this window." -ForegroundColor Yellow

# Start server in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run server"

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Start the frontend
Write-Host "🌐 Starting the frontend..." -ForegroundColor Blue
Write-Host "This will open your browser automatically." -ForegroundColor Yellow

# Start frontend
npm run dev

Write-Host "🎉 App should now be running!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan 