# 🚀 Quick Start Guide

## Option 1: Easy Way (Recommended)
Run the automated script:
```powershell
.\run-app.ps1
```

## Option 2: Manual Steps

### Step 1: Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version
3. **Restart PowerShell** after installation

### Step 2: Verify Installation
```powershell
node --version
npm --version
```

### Step 3: Install Dependencies
```powershell
npm install
```

### Step 4: Create Environment File
Create a file named `.env` in your project folder with:
```env
VITE_SPOONACULAR_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

### Step 5: Start the Backend Server
Open a **new PowerShell window** and run:
```powershell
npm run server
```

### Step 6: Start the Frontend
In your **original PowerShell window**, run:
```powershell
npm run dev
```

### Step 7: Open Your Browser
Go to: http://localhost:5173

## 🔧 Troubleshooting

### If you get "npm not recognized":
- Node.js isn't installed or you need to restart PowerShell

### If you get "port already in use":
- Close other applications using port 3001 or 5173
- Or restart your computer

### If recipes don't load:
- Check that the backend server is running (should show "Server running on port 3001")
- Get a Spoonacular API key from [spoonacular.com/food-api](https://spoonacular.com/food-api)

## 📱 What You'll See
- A beautiful baby food recipe app
- Input fields for ingredients, age, and allergens
- Recipe cards with nutrition info and safety indicators
- Even without API keys, you'll see mock recipes!

## 🛑 How to Stop
- Press `Ctrl+C` in both PowerShell windows
- Or just close the PowerShell windows 