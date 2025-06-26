# 🚀 Netlify Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Deploy from GitHub (No Node.js Required)

1. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Deploy via Netlify Dashboard:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

### Option 2: Local Deployment (Requires Node.js)

1. **Install Node.js** from [nodejs.org](https://nodejs.org/)
2. **Run the deployment script:**
   ```powershell
   .\deploy-to-netlify.ps1
   ```

## Environment Variables Setup

After deployment, set these in your Netlify dashboard:

1. Go to **Site settings** > **Environment variables**
2. Add these variables:

```env
VITE_SPOONACULAR_API_KEY=1db73f9fba164957972490c58b627695
VITE_FIREBASE_API_KEY=AIzaSyBAEfhv52tIX_hG-0W8qF5KE_lykaRjqwc
VITE_FIREBASE_AUTH_DOMAIN=food-540d4.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=food-540d4
VITE_FIREBASE_STORAGE_BUCKET=food-540d4.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=334465185552
VITE_FIREBASE_APP_ID=1:334465185552:web:4ff807b05733eacca11795
VITE_FIREBASE_MEASUREMENT_ID=G-01C1NM2DYH
```

## Backend Deployment

Your app has a backend server that needs separate deployment:

### Option A: Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy the `server` folder
4. Update your frontend API URL

### Option B: Deploy Backend to Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server/index.js`

### Option C: Use Netlify Functions (Advanced)
Convert your Express server to serverless functions.

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify environment variables are set
- Check build logs in Netlify dashboard

### API Calls Fail
- Ensure backend is deployed and accessible
- Check CORS settings
- Verify API keys are correct

### Site Not Loading
- Check that dist folder is generated
- Verify netlify.toml configuration
- Check deployment logs

## Manual Commands

If you prefer manual deployment:

```powershell
# Install dependencies
npm install

# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Post-Deployment

1. **Set up custom domain** (optional)
2. **Configure form handling** (if needed)
3. **Set up analytics** (optional)
4. **Test all features** thoroughly

Your app will be available at: `https://your-site-name.netlify.app` 