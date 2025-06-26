import React from 'react';
import { Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Recipe } from '../services/api';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          {recipe.isBabySafe ? (
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle size={12} />
              <span>Baby Safe</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              <AlertTriangle size={12} />
              <span>Check Ingredients</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        {recipe.nutrition && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Nutrition (per serving)</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium ml-1">{Math.round(recipe.nutrition.calories)}</span>
              </div>
              <div>
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium ml-1">{Math.round(recipe.nutrition.protein)}g</span>
              </div>
              <div>
                <span className="text-gray-600">Carbs:</span>
                <span className="font-medium ml-1">{Math.round(recipe.nutrition.carbs)}g</span>
              </div>
              <div>
                <span className="text-gray-600">Fat:</span>
                <span className="font-medium ml-1">{Math.round(recipe.nutrition.fat)}g</span>
              </div>
            </div>
          </div>
        )}
        
        {!recipe.isBabySafe && recipe.unsafeIngredients.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-red-500" size={16} />
              <span className="font-medium text-red-800">Unsafe Ingredients:</span>
            </div>
            <p className="text-red-700 text-sm">
              {recipe.unsafeIngredients.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};