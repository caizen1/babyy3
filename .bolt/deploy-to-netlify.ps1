# Netlify Deployment Script
# Run this after installing Node.js

Write-Host "🚀 Deploying Baby Recipe App to Netlify" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

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

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Check if Netlify CLI is installed
try {
    $netlifyVersion = netlify --version
    Write-Host "✅ Netlify CLI found: $netlifyVersion" -ForegroundColor Green
} catch {
    Write-Host "📥 Installing Netlify CLI..." -ForegroundColor Blue
    npm install -g netlify-cli
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Netlify CLI" -ForegroundColor Red
        Write-Host "You can still deploy manually via the Netlify dashboard." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Login to Netlify
Write-Host "🔐 Logging into Netlify..." -ForegroundColor Blue
Write-Host "This will open your browser for authentication." -ForegroundColor Yellow
netlify login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Netlify login failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Deploy to Netlify
Write-Host "🚀 Deploying to Netlify..." -ForegroundColor Blue
netlify deploy --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host "Your app is now live on Netlify!" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Check the error messages above." -ForegroundColor Yellow
}

Read-Host "Press Enter to exit" 