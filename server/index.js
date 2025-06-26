import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Baby-unsafe ingredients that should be avoided
const UNSAFE_INGREDIENTS = [
  'honey', 'salt', 'sugar', 'whole nuts', 'popcorn', 'hard candy',
  'raw fish', 'raw eggs', 'unpasteurized', 'caffeine', 'alcohol',
  'artificial sweeteners', 'high mercury fish', 'choking hazards'
];

// Filter recipes for baby safety
const checkBabySafety = (recipe, age) => {
  const title = recipe.title.toLowerCase();
  const unsafeIngredients = [];
  
  // Check for unsafe ingredients
  UNSAFE_INGREDIENTS.forEach(ingredient => {
    if (title.includes(ingredient)) {
      unsafeIngredients.push(ingredient);
    }
  });

  // Age-specific restrictions
  if (age === '6-8') {
    // More restrictive for younger babies
    const restrictedFor6to8 = ['chunks', 'whole', 'raw', 'spicy', 'seasoned'];
    restrictedFor6to8.forEach(restriction => {
      if (title.includes(restriction)) {
        unsafeIngredients.push(restriction);
      }
    });
  }

  return {
    isBabySafe: unsafeIngredients.length === 0,
    unsafeIngredients
  };
};

// Mock recipe data for fallback
const getMockRecipes = (ingredients, age) => {
  const mockRecipes = [
    {
      id: 1,
      title: "Simple Apple Puree",
      image: "https://images.pexels.com/photos/209449/pexels-photo-209449.jpeg",
      readyInMinutes: 15,
      servings: 4,
      nutrition: {
        calories: 52,
        protein: 0.3,
        fat: 0.2,
        carbs: 13.8
      }
    },
    {
      id: 2,
      title: "Carrot Sweet Potato Mash",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
      readyInMinutes: 25,
      servings: 6,
      nutrition: {
        calories: 41,
        protein: 0.9,
        fat: 0.1,
        carbs: 9.6
      }
    },
    {
      id: 3,
      title: "Banana Avocado Blend",
      image: "https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg",
      readyInMinutes: 5,
      servings: 2,
      nutrition: {
        calories: 89,
        protein: 1.1,
        fat: 6.7,
        carbs: 7.4
      }
    }
  ];

  return mockRecipes.map(recipe => {
    const safety = checkBabySafety(recipe, age);
    return {
      ...recipe,
      ...safety
    };
  });
};

// API Routes
app.post('/api/recipes', async (req, res) => {
  try {
    const { ingredients, age, allergens } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

    // Use the provided API key
    const apiKey = process.env.VITE_SPOONACULAR_API_KEY || '1db73f9fba164957972490c58b627695';
    
    console.log('Fetching recipes from Spoonacular API...');
    
    try {
      // Spoonacular API integration
      const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients`;
      const response = await fetch(`${spoonacularUrl}?apiKey=${apiKey}&ingredients=${ingredients.join(',')}&number=12&ranking=1&ignorePantry=true`);
      
      if (!response.ok) {
        console.error('Spoonacular API error:', response.status, response.statusText);
        throw new Error(`Spoonacular API error: ${response.status}`);
      }

      const recipesData = await response.json();
      console.log(`Found ${recipesData.length} recipes from Spoonacular`);
      
      // Get detailed information for each recipe
      const detailedRecipes = await Promise.all(
        recipesData.slice(0, 6).map(async (recipe) => {
          try {
            const detailResponse = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&includeNutrition=true`
            );
            
            if (!detailResponse.ok) {
              console.error(`Error fetching details for recipe ${recipe.id}`);
              return null;
            }
            
            const detail = await detailResponse.json();
            const safety = checkBabySafety(detail, age);
            
            return {
              id: detail.id,
              title: detail.title,
              image: detail.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
              readyInMinutes: detail.readyInMinutes || 30,
              servings: detail.servings || 1,
              nutrition: detail.nutrition ? {
                calories: detail.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 0,
                protein: detail.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 0,
                fat: detail.nutrition.nutrients.find(n => n.name === 'Fat')?.amount || 0,
                carbs: detail.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0,
              } : {
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0
              },
              ...safety
            };
          } catch (error) {
            console.error(`Error processing recipe ${recipe.id}:`, error);
            return null;
          }
        })
      );

      // Filter out null results and return
      const validRecipes = detailedRecipes.filter(recipe => recipe !== null);
      
      if (validRecipes.length === 0) {
        console.log('No valid recipes found, falling back to mock data');
        const mockRecipes = getMockRecipes(ingredients, age);
        return res.json(mockRecipes);
      }

      res.json(validRecipes);
      
    } catch (apiError) {
      console.error('Spoonacular API error:', apiError);
      console.log('Falling back to mock data');
      
      // Fallback to mock data if API fails
      const mockRecipes = getMockRecipes(ingredients, age);
      res.json(mockRecipes);
    }
    
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Spoonacular API integration enabled');
});