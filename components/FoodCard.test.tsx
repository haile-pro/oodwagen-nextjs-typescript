/**
 * @jest-environment jsdom
 */
// Fix: Import Jest globals to resolve TypeScript errors.
import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodCard from './FoodCard';
import { FoodItem } from '../types';

const mockFood: FoodItem = {
  id: '1',
  name: 'Test Food',
  image: 'https://placehold.co/400x200',
  rating: 4.5,
  price: '12.99',
  createdAt: new Date().toISOString(),
  restaurant: {
    name: 'Test Restaurant',
    logo: 'https://placehold.co/40x40',
    status: 'Open',
  },
};

describe('FoodCard', () => {
  it('renders the food item details correctly', () => {
    render(<FoodCard food={mockFood} onEdit={() => {}} onDelete={() => {}} index={0} />);

    // Check if food name is displayed
    expect(screen.getByText('Test Food')).toBeInTheDocument();
    
    // Check if restaurant name is displayed
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    
    // Check if rating is displayed
    expect(screen.getByText('4.5')).toBeInTheDocument();
    
    // Check if price is displayed
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    
    // Check if restaurant status is displayed
    expect(screen.getByText('Open Now')).toBeInTheDocument();

    // Check if food image is rendered with correct alt text
    const foodImage = screen.getByAltText('Test Food');
    expect(foodImage).toBeInTheDocument();
    expect(foodImage).toHaveAttribute('src', mockFood.image);
    
    // Check if restaurant logo is rendered with correct alt text
    const restaurantLogo = screen.getByAltText('Test Restaurant logo');
    expect(restaurantLogo).toBeInTheDocument();
    expect(restaurantLogo).toHaveAttribute('src', mockFood.restaurant?.logo);
  });

  it('handles items without restaurant information gracefully', () => {
    const foodWithoutRestaurant: FoodItem = { ...mockFood, restaurant: undefined };
    render(<FoodCard food={foodWithoutRestaurant} onEdit={() => {}} onDelete={() => {}} index={0}/>);

    expect(screen.getByText('Test Food')).toBeInTheDocument();
    expect(screen.queryByText('Test Restaurant')).not.toBeInTheDocument();
    expect(screen.queryByText('Open Now')).not.toBeInTheDocument();
  });
});