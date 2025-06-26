# Baby Recipe App Setup Guide

## 🚨 Recipe Fetching Issues - Solutions

### 1. Install Node.js and npm
Your system is missing Node.js. Follow these steps:

1. **Download Node.js**: Go to [nodejs.org](https://nodejs.org/) and download the LTS version
2. **Install**: Run the installer and follow the setup wizard
3. **Verify**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

### 2. Create Environment Variables
Create a `.env` file in your project root with these variables:

```env
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
```

### 3. Get API Keys

#### Spoonacular API Key:
1. Go to [spoonacular.com/food-api](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `your_spoonacular_api_key_here` in the .env file

#### Firebase Configuration:
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project or use existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Add a web app if you haven't already
6. Copy the configuration values to your .env file

### 4. Install Dependencies
After installing Node.js, run:
```bash
npm install
```

### 5. Start the Application
```bash
# Terminal 1: Start the backend server
npm run server

# Terminal 2: Start the frontend development server
npm run dev
```

### 6. Test the API
Once both servers are running, test the health endpoint:
```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET
```

## 🔧 Troubleshooting

### If recipes still don't load:

1. **Check Server Logs**: Look for error messages in the server terminal
2. **API Key Issues**: Verify your Spoonacular API key is correct
3. **Rate Limiting**: Free Spoonacular accounts have daily limits
4. **Network Issues**: Check if your firewall is blocking the requests

### Fallback System:
The app has a built-in fallback system that provides mock recipes if the API fails, so you should still see some recipes even if the external API is down.

### Common Error Messages:
- `"Failed to fetch recipes"`: Usually API key or network issues
- `"Spoonacular API error"`: Check your API key and rate limits
- `"Unable to connect"`: Server not running or wrong port

## 📞 Need Help?
If you're still having issues after following this guide, check:
1. Server console output for specific error messages
2. Browser developer tools (F12) for network errors
3. That all environment variables are properly set 