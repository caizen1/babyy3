import React from 'react';
import { Baby } from 'lucide-react';

interface AgeSelectorProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
}

const AGE_GROUPS = [
  { value: '6-8', label: '6-8 months', description: 'First foods, purees' },
  { value: '9-12', label: '9-12 months', description: 'Finger foods, chunks' },
  { value: '12+', label: '12+ months', description: 'More variety, textures' }
];

export const AgeSelector: React.FC<AgeSelectorProps> = ({
  selectedAge,
  onAgeChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Baby className="text-blue-500" size={20} />
        <label className="block text-sm font-medium text-gray-700">
          Baby's Age
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AGE_GROUPS.map((group) => (
          <button
            key={group.value}
            onClick={() => onAgeChange(group.value)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
              selectedAge === group.value
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="font-medium">{group.label}</div>
            <div className="text-sm text-gray-600 mt-1">{group.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};