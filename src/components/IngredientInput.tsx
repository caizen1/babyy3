import React, { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const COMMON_INGREDIENTS = [
  'apple', 'banana', 'carrot', 'sweet potato', 'pear', 'avocado', 
  'broccoli', 'peas', 'chicken', 'rice', 'oats', 'spinach'
];

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      const filtered = COMMON_INGREDIENTS.filter(ingredient =>
        ingredient.toLowerCase().includes(value.toLowerCase()) &&
        !ingredients.includes(ingredient)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      onIngredientsChange([...ingredients, trimmed]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(item => item !== ingredient));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type an ingredient (e.g., apple, carrot)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={() => addIngredient(inputValue)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addIngredient(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {ingredients.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-pink-600 hover:text-pink-800 transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};