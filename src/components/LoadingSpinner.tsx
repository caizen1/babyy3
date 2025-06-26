import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-pink-200 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
      <span className="ml-3 text-gray-600 font-medium">Finding delicious recipes...</span>
    </div>
  );
};