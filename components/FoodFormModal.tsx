import React, { useState, useEffect, useCallback } from 'react';
import Modal from './Modal';
import Spinner from './Spinner';
import { FoodItem, FoodFormState, FormErrors } from '../types';

interface FoodFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FoodFormState) => Promise<void>;
  foodItem: FoodItem | null;
  isSubmitting: boolean;
}

const initialFormState: FoodFormState = {
  food_name: '',
  food_image: '',
  food_rating: '',
  price: '',
  restaurant_name: '',
  restaurant_logo: '',
  restaurant_status: 'Open Now',
};

const FoodFormModal: React.FC<FoodFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  foodItem,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<FoodFormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (foodItem) {
      setFormData({
        food_name: foodItem.name,
        food_image: foodItem.image,
        food_rating: String(foodItem.rating),
        price: String(foodItem.price),
        restaurant_name: foodItem.restaurant?.name || '',
        restaurant_logo: foodItem.restaurant?.logo || '',
        restaurant_status: foodItem.restaurant?.status === 'Open' ? 'Open Now' : 'Closed',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [foodItem, isOpen]);
  
  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    if (!formData.food_name.trim()) newErrors.food_name = "Food Name is required";
    if (!formData.food_image.trim()) newErrors.food_image = "Food Image URL is required";
    else {
        try {
            new URL(formData.food_image);
        } catch (_) {
            newErrors.food_image = "Image URL is invalid";
        }
    }

    const ratingNum = Number(formData.food_rating);
    if (!formData.food_rating.trim()) newErrors.food_rating = "Food Rating must be a number";
    else if (isNaN(ratingNum)) newErrors.food_rating = "Food Rating must be a number";
    else if (ratingNum < 1 || ratingNum > 5) newErrors.food_rating = "Rating is outside 1-5 range";

    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price))) newErrors.price = "Price must be a number";
    
    if (!formData.restaurant_name.trim()) newErrors.restaurant_name = "Restaurant Name is required";
    if (!formData.restaurant_logo.trim()) newErrors.restaurant_logo = "Restaurant Logo URL is required";
     else {
        try {
            new URL(formData.restaurant_logo);
        } catch (_) {
            newErrors.restaurant_logo = "Image URL is invalid";
        }
    }
    if (!['Open Now', 'Closed'].includes(formData.restaurant_status)) {
        newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  const formTitle = foodItem ? 'Edit a meal' : 'Add a meal';
  const submitButtonText = foodItem ? 'Save Changes' : 'Add Food';
  const loadingText = foodItem ? 'Updating Food...' : 'Adding Food...';

  const renderError = (field: keyof FormErrors) => {
    if (errors[field]) {
        const errorId = `${field.replace(/_/g, '-')}-error`;
        return <p id={errorId} className="mt-1 text-sm text-red-600">{errors[field]}</p>
    }
    return null;
  }

  const inputClass = "food-input block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:text-sm";
  const srOnlyClass = "sr-only";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-lg">
        <div className="p-6 sm:p-8">
            <h3 className="text-3xl font-bold text-center mb-8 text-orange-500">{formTitle}</h3>
            <div className="space-y-5">
                <div>
                    <label htmlFor="food_name" className={srOnlyClass}>Food Name</label>
                    <input id="food_name" type="text" name="food_name" value={formData.food_name} onChange={handleChange} placeholder="Enter food name" required className={inputClass} aria-describedby="food-name-error"/>
                    {renderError('food_name')}
                </div>
                <div>
                    <label htmlFor="food_rating" className={srOnlyClass}>Food Rating</label>
                    <input id="food_rating" type="number" name="food_rating" value={formData.food_rating} onChange={handleChange} placeholder="Enter food rating" required min="1" max="5" step="0.1" className={inputClass} aria-describedby="food-rating-error"/>
                    {renderError('food_rating')}
                </div>
                 <div>
                    <label htmlFor="price" className={srOnlyClass}>Food Price</label>
                    <input id="price" type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Food price ($)" required className={inputClass} aria-describedby="price-error"/>
                    {renderError('price')}
                </div>
                <div>
                    <label htmlFor="food_image" className={srOnlyClass}>Food Image URL</label>
                    <input id="food_image" type="url" name="food_image" value={formData.food_image} onChange={handleChange} placeholder="Enter food image URL" required className={inputClass} aria-describedby="food-image-error" />
                    {renderError('food_image')}
                </div>
                <div>
                    <label htmlFor="restaurant_name" className={srOnlyClass}>Restaurant Name</label>
                    <input id="restaurant_name" type="text" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} placeholder="Enter restaurant name" required className={inputClass} aria-describedby="restaurant-name-error" />
                    {renderError('restaurant_name')}
                </div>
                <div>
                    <label htmlFor="restaurant_logo" className={srOnlyClass}>Restaurant Logo URL</label>
                    <input id="restaurant_logo" type="url" name="restaurant_logo" value={formData.restaurant_logo} onChange={handleChange} placeholder="Enter restaurant logo URL" required className={inputClass} aria-describedby="restaurant-logo-error"/>
                    {renderError('restaurant_logo')}
                </div>
                <div className="relative">
                    <label htmlFor="restaurant_status" className={srOnlyClass}>Restaurant Status</label>
                    <select id="restaurant_status" name="restaurant_status" value={formData.restaurant_status} onChange={handleChange} required className={`${inputClass} appearance-none pr-10`} aria-describedby="restaurant-status-error">
                        <option value="Open Now">Open Now</option>
                        <option value="Closed">Closed</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    {renderError('restaurant_status')}
                </div>
            </div>
        </div>
        <div className="px-6 sm:px-8 py-6 mt-4 flex justify-center items-center space-x-4">
          <button type="submit" data-test-id="food-submit-btn" disabled={isSubmitting} className="w-40 inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-b from-yellow-400 to-orange-500 px-10 py-3 text-base font-medium text-white shadow-lg shadow-orange-500/40 transition-all hover:shadow-xl hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? <><Spinner className="w-5 h-5 mr-2" /> {loadingText}</> : submitButtonText}
          </button>
          <button type="button" onClick={onClose} disabled={isSubmitting} className="w-40 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-10 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FoodFormModal;