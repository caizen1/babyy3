# Baby Recipe Generator

A React web application for generating safe and nutritious baby food recipes using the Spoonacular API. The app allows parents to input ingredients, select their baby's age, and specify allergens to avoid, then generates age-appropriate recipes with detailed instructions.

## Features

- **Ingredient Input**: Add multiple ingredients with a user-friendly interface
- **Age Selection**: Choose from 6-8 months (purees), 9-12 months (mashed), or 12+ months (solids)
- **Allergen Filtering**: Check allergens to avoid (dairy, peanuts, eggs, soy, wheat, fish, shellfish)
- **Baby Safety**: Automatically filters out unsafe ingredients like honey for babies under 1 year
- **Recipe Display**: Responsive cards showing recipe details, ingredients, and instructions
- **User Preferences**: Saves and loads previous searches using Firebase Firestore
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: User-friendly error messages for network issues and API limits

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **API**: Spoonacular Food API
- **Styling**: Tailwind CSS with custom design system

## Prerequisites

- Node.js 16+ and npm
- Spoonacular API key (free tier available)
- Firebase project with Firestore enabled

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd baby-recipe-generator
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env
```

Fill in your API keys and configuration:

```env
# Spoonacular API Configuration
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Get API Keys

#### Spoonacular API
1. Visit [Spoonacular Food API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes 150 requests per day

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General
5. Add a web app and copy the configuration
6. Update your `.env` file with the Firebase config

### 4. Development

#### Start the Backend Server
```bash
npm start
```
The server will run on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
npm run dev
```
The React app will run on `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

This creates a `dist` folder with the production build.

## Project Structure

```
baby-recipe-generator/
├── src/
│   ├── components/          # React components
│   │   ├── AgeSelector.tsx
│   │   ├── AllergenSelector.tsx
│   │   ├── IngredientInput.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── RecipeCard.tsx
│   ├── config/              # Configuration files
│   │   └── firebase.ts
│   ├── services/            # API and Firebase services
│   │   ├── api.ts
│   │   └── firebase.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── server/
│   └── index.js             # Express backend server
├── public/                  # Static assets
├── dist/                    # Production build (generated)
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## API Endpoints

### POST /api/recipes
Fetches recipes from Spoonacular API with baby safety filtering.

**Request Body:**
```json
{
  "ingredients": ["carrots", "apples"],
  "age": "6-8",
  "allergens": ["dairy", "peanuts"]
}
```

**Response:**
```json
[
  {
    "id": 12345,
    "title": "Carrot Apple Puree",
    "image": "https://...",
    "instructions": "Puree: Cook carrots and apples...",
    "readyInMinutes": 20,
    "servings": 4,
    "usedIngredients": [...],
    "missedIngredients": [...]
  }
]
```

## Baby Safety Features

- **Age-appropriate filtering**: Different textures and ingredients for different age groups
- **Honey restriction**: Automatically filters out honey for babies under 1 year
- **Allergen filtering**: Removes recipes containing specified allergens
- **Diet restrictions**: Uses vegan diet for younger babies to avoid dairy and eggs

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Set environment variables in Netlify dashboard

### Other Platforms

The app can be deployed to any platform that supports Node.js applications. Make sure to:

1. Set all environment variables
2. Build the frontend (`npm run build`)
3. Configure the platform to serve the `dist` folder
4. Ensure the backend API is accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the [Spoonacular API documentation](https://spoonacular.com/food-api/docs)
- Review Firebase setup guides
- Open an issue in the repository

## Acknowledgments

- [Spoonacular Food API](https://spoonacular.com/food-api) for recipe data
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework 