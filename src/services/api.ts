import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export interface RecipeRequest {
  ingredients: string[];
  age: string;
  allergens: string[];
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  isBabySafe: boolean;
  unsafeIngredients: string[];
}

export const fetchRecipes = async (request: RecipeRequest): Promise<Recipe[]> => {
  try {
    console.log('Fetching recipes with request:', request);
    console.log('API Base URL:', API_BASE_URL);
    
    const response = await api.post('/api/recipes', request);
    console.log('Recipes received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Server is not running. Please start the backend server with "npm run server"');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Check the server console for details.');
      }
      if (error.response?.status === 400) {
        throw new Error('Invalid request. Please check your input.');
      }
      throw new Error(`Network error: ${error.message}`);
    }
    
    throw new Error('Failed to fetch recipes. Please try again.');
  }
};