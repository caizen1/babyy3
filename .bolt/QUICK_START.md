# Quick Start Guide

Get your Baby Recipe Generator up and running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- Spoonacular API key (free at https://spoonacular.com/food-api)
- Firebase project (free at https://console.firebase.google.com/)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Run the setup script to configure your API keys:

```bash
npm run setup
```

Or manually create a `.env` file with your API keys (see `env.example`).

## Step 3: Start the Application

### Option A: Development Mode (Recommended)

Terminal 1 - Start the backend:
```bash
npm start
```

Terminal 2 - Start the frontend:
```bash
npm run dev
```

### Option B: Production Mode

```bash
npm run build
npm start
```

## Step 4: Access the App

Open your browser and go to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Run `npm install` again
   - Delete `node_modules` and run `npm install`

2. **API key errors**
   - Check your `.env` file exists and has correct values
   - Verify your Spoonacular API key is valid
   - Ensure Firebase project is set up correctly

3. **Port already in use**
   - Change the PORT in `.env` file
   - Kill processes using ports 3000 or 5000

4. **CORS errors**
   - Ensure both frontend and backend are running
   - Check that the backend is on port 5000

### Getting API Keys

#### Spoonacular API
1. Go to https://spoonacular.com/food-api
2. Sign up for free account
3. Copy your API key from dashboard

#### Firebase
1. Go to https://console.firebase.google.com/
2. Create new project
3. Enable Firestore Database
4. Add web app and copy config
5. Update `.env` with Firebase values

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out the [deployment guide](README.md#deployment) to deploy online
- Customize the app by modifying components in `src/components/`

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the full README.md
3. Open an issue in the repository

Happy cooking! 🍼👶 