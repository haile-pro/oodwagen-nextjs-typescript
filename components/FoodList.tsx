import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';
import Spinner from './Spinner';
import { FoodItem } from '../types';

interface FoodListProps {
  foods: FoodItem[];
  isLoading: boolean;
  error: string | null;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
}

const ITEMS_PER_PAGE = 8;

const FoodList: React.FC<FoodListProps> = ({ foods, isLoading, error, onEdit, onDelete }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  const visibleFoods = foods.slice(0, visibleCount);

  if (foods.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 empty-state-message">
        <h3 className="text-xl font-semibold">No items available</h3>
        <p className="mt-2">Try a different search term or add a new meal to get started.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Meals</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {visibleFoods.map((food, index) => (
          <FoodCard
            key={food.id}
            food={food}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </div>
      {visibleCount < foods.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default FoodList;