import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AllergenSelectorProps {
  selectedAllergens: string[];
  onAllergensChange: (allergens: string[]) => void;
}

const COMMON_ALLERGENS = [
  { value: 'dairy', label: 'Dairy', icon: '🥛' },
  { value: 'eggs', label: 'Eggs', icon: '🥚' },
  { value: 'peanuts', label: 'Peanuts', icon: '🥜' },
  { value: 'tree-nuts', label: 'Tree Nuts', icon: '🌰' },
  { value: 'soy', label: 'Soy', icon: '🫘' },
  { value: 'wheat', label: 'Wheat', icon: '🌾' },
  { value: 'fish', label: 'Fish', icon: '🐟' },
  { value: 'shellfish', label: 'Shellfish', icon: '🦐' }
];

export const AllergenSelector: React.FC<AllergenSelectorProps> = ({
  selectedAllergens,
  onAllergensChange
}) => {
  const toggleAllergen = (allergen: string) => {
    if (selectedAllergens.includes(allergen)) {
      onAllergensChange(selectedAllergens.filter(a => a !== allergen));
    } else {
      onAllergensChange([...selectedAllergens, allergen]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="text-orange-500" size={20} />
        <label className="block text-sm font-medium text-gray-700">
          Allergens to Avoid
        </label>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {COMMON_ALLERGENS.map((allergen) => (
          <button
            key={allergen.value}
            onClick={() => toggleAllergen(allergen.value)}
            className={`p-3 border rounded-lg text-center transition-all duration-200 ${
              selectedAllergens.includes(allergen.value)
                ? 'border-orange-500 bg-orange-50 text-orange-900'
                : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
            }`}
          >
            <div className="text-lg mb-1">{allergen.icon}</div>
            <div className="text-sm font-medium">{allergen.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};