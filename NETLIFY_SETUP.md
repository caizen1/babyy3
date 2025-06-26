# 🚀 Netlify Setup Guide

## Prerequisites
Before setting up Netlify, you need to install Node.js:

1. **Install Node.js**: Download from [nodejs.org](https://nodejs.org/)
2. **Restart PowerShell** after installation
3. **Verify installation**: Run `node --version` and `npm --version`

## Step 1: Install Netlify CLI

After Node.js is installed, run:
```powershell
npm install -g netlify-cli
```

## Step 2: Authenticate with Netlify

```powershell
netlify login
```

This will open your browser to authenticate with your Netlify account.

## Step 3: Initialize Netlify in Your Project

```powershell
netlify init
```

Choose these options when prompted:
- **Create & configure a new site**: Yes
- **Team**: Your team/account
- **Site name**: `my-netlify-project` (or let Netlify generate one)
- **Publish directory**: `dist`
- **Functions directory**: Leave empty (not needed for this project)
- **Deploy without GitHub connection**: Yes (for now)

## Step 4: Build and Deploy

```powershell
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## Step 5: Configure Environment Variables

In your Netlify dashboard:
1. Go to **Site settings** > **Environment variables**
2. Add your API keys:
   - `VITE_SPOONACULAR_API_KEY`: Your Spoonacular API key
   - `VITE_FIREBASE_API_KEY`: Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID
   - `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

## Step 6: Set Up Backend (Optional)

Since your app has a backend server, you have two options:

### Option A: Deploy Backend Separately
Deploy your backend to a service like:
- **Railway**: `railway.app`
- **Render**: `render.com`
- **Heroku**: `heroku.com`

Then update your frontend API base URL.

### Option B: Use Netlify Functions
Convert your Express server to Netlify functions:

1. Create a `netlify/functions` directory
2. Move your API logic to serverless functions
3. Update your frontend to use the new endpoints

## Current netlify.toml Configuration

Your project already has a `netlify.toml` file configured for:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA routing**: Redirects all routes to index.html
- **Security headers**: Added protection headers
- **Asset caching**: Optimized caching for static assets

## Troubleshooting

### If npm install fails:
- Make sure Node.js is installed
- Try running PowerShell as Administrator

### If build fails:
- Check that all dependencies are installed
- Verify your environment variables are set
- Check the build logs in Netlify dashboard

### If deployment fails:
- Ensure your `dist` folder is generated after build
- Check that all files are committed to Git
- Verify your netlify.toml configuration

## Quick Deploy Commands

```powershell
# One-time setup
npm install -g netlify-cli
netlify login
netlify init

# Regular deployment
npm run build
netlify deploy --prod
```

## Environment Variables Reference

Make sure to set these in your Netlify dashboard:

```env
VITE_SPOONACULAR_API_KEY=your_spoonacular_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Your app will be available at: `https://your-site-name.netlify.app` 