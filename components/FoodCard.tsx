
import React, { useState, useRef, useEffect } from 'react';
import { FoodItem } from '../types';

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
  index: number;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a1 1 0 011-1h5a1 1 0 01.707.293l7 7zM6 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);


const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete, index }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openStatusColor = 'bg-lime-100 text-lime-800 font-semibold';
  const closedStatusColor = 'bg-orange-100 text-orange-800 font-semibold';
  const statusClasses = food.restaurant?.status === 'Open' ? openStatusColor : closedStatusColor;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <article 
      className="food-card bg-white rounded-lg overflow-hidden flex flex-col group border border-gray-200 transition-all duration-150 ease-out group-hover:shadow-xl hover:border-orange-300 food-card-animate"
      style={{ animationDelay: `${index * 50}ms` }}
      >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={food.image || 'https://placehold.co/400x200'} alt={food.name} />
        <div className="food-price absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <TagIcon />
          <span>${food.price}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
            <div className="flex justify-between items-start gap-3">
                {food.restaurant && (
                    <img src={food.restaurant.logo || 'https://placehold.co/40x40'} alt={food.restaurant.name ? `${food.restaurant.name} logo` : 'Restaurant logo'} className="restaurant-logo w-10 h-10 rounded-md object-cover flex-shrink-0" />
                )}
                <div className="flex-grow min-w-0">
                    <h3 className="food-name text-md font-bold text-gray-800 truncate" title={food.name}>{food.name}</h3>
                    {food.restaurant && (
                        <p className="restaurant-name text-sm text-gray-500 truncate" title={food.restaurant.name}>{food.restaurant.name}</p>
                    )}
                    <div className="food-rating flex items-center mt-1">
                        <StarIcon filled={true} />
                        <span className="text-gray-500 text-sm ml-1 font-semibold">{food.rating.toFixed(1)}</span>
                    </div>
                </div>
                <div className="relative flex-shrink-0" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-label="Options"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 py-1 ring-1 ring-black ring-opacity-5">
                        <button
                            onClick={() => { onEdit(food); setMenuOpen(false); }}
                            data-test-id="food-edit-btn"
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => { onDelete(food); setMenuOpen(false); }}
                            data-test-id="food-delete-btn"
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        {food.restaurant && (
          <div className="mt-4">
             <span className={`restaurant-status text-xs px-3 py-1 rounded-md ${statusClasses}`}>{food.restaurant.status === 'Open' ? 'Open Now' : 'Closed'}</span>
          </div>
        )}
      </div>
    </article>
  );
};
export default FoodCard;