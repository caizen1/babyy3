import React, { useState, useEffect } from 'react';
import { Baby, Search, Heart, Utensils } from 'lucide-react';
import { IngredientInput } from './components/IngredientInput';
import { AgeSelector } from './components/AgeSelector';
import { AllergenSelector } from './components/AllergenSelector';
import { RecipeCard } from './components/RecipeCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchRecipes, Recipe } from './services/api';
import { savePreferences, getRecentPreferences } from './services/firebase';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string>('6-8');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipeData = await fetchRecipes({
        ingredients,
        age: selectedAge,
        allergens: selectedAllergens
      });
      setRecipes(recipeData);

      // Save preferences to Firebase
      await savePreferences({
        ingredients,
        age: selectedAge,
        allergens: selectedAllergens
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load recent preferences on component mount
    const loadRecentPreferences = async () => {
      try {
        const recentPrefs = await getRecentPreferences();
        if (recentPrefs.length > 0) {
          const latest = recentPrefs[0];
          setIngredients(latest.ingredients);
          setSelectedAge(latest.age);
          setSelectedAllergens(latest.allergens);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadRecentPreferences();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
              <Baby className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Baby Food Recipe Generator</h1>
              <p className="text-gray-600">Healthy, safe, and delicious recipes for your little one</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="space-y-8">
            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />
            
            <AgeSelector
              selectedAge={selectedAge}
              onAgeChange={setSelectedAge}
            />
            
            <AllergenSelector
              selectedAllergens={selectedAllergens}
              onAllergensChange={setSelectedAllergens}
            />

            <div className="flex justify-center pt-4">
              <button
                onClick={handleSearch}
                disabled={loading || ingredients.length === 0}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
                <span>{loading ? 'Searching...' : 'Find Recipes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Results */}
        {!loading && recipes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Utensils className="text-pink-500" size={24} />
                <span>Recipe Suggestions</span>
              </h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <Heart size={16} />
                <span className="text-sm">{recipes.length} recipes found</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && ingredients.length > 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">Try different ingredients or adjust your filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Always consult with your pediatrician before introducing new foods to your baby.
            </p>
            <p className="text-xs mt-2">
              Recipe data powered by Spoonacular API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;