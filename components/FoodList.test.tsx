/**
 * @jest-environment jsdom
 */
// Fix: Import Jest globals to resolve TypeScript errors.
import { describe, it, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodList from './FoodList';
import { FoodItem } from '../types';

// Mock FoodCard to simplify testing
jest.mock('./FoodCard', () => {
  return jest.fn(({ food }) => <div data-testid="food-card">{food.name}</div>);
});

const mockFoods: FoodItem[] = [
  { id: '1', name: 'Pizza', image: '', rating: 4, price: '20', createdAt: '' },
  { id: '2', name: 'Burger', image: '', rating: 5, price: '15', createdAt: '' },
];

describe('FoodList', () => {
  it('displays a loading spinner while isLoading is true', () => {
    render(
      <FoodList
        foods={[]}
        isLoading={true}
        error={null}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays an error message if an error occurs', () => {
    const errorMessage = 'Failed to fetch data';
    render(
      <FoodList
        foods={[]}
        isLoading={false}
        error={errorMessage}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('displays the empty state message when there are no foods', () => {
    render(
      <FoodList
        foods={[]}
        isLoading={false}
        error={null}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText('No items available')).toBeInTheDocument();
  });

  it('renders a list of food cards when data is provided', () => {
    render(
      <FoodList
        foods={mockFoods}
        isLoading={false}
        error={null}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );
    const foodCards = screen.getAllByTestId('food-card');
    expect(foodCards).toHaveLength(2);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
  });
});