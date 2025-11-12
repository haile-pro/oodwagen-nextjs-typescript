/**
 * @jest-environment jsdom
 */
// Fix: Import Jest globals to resolve TypeScript errors.
import { describe, it, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { FoodItem } from '../types';

const mockFood: FoodItem = {
  id: '1',
  name: 'Spicy Noodles',
  image: '',
  rating: 5,
  price: '15',
  createdAt: new Date().toISOString(),
};

describe('DeleteConfirmationModal', () => {
  it('calls onConfirm when the "Yes" button is clicked', () => {
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();
    
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        foodItem={mockFood}
        isDeleting={false}
      />
    );

    const confirmButton = screen.getByTestId('food-confirm-delete-btn');
    fireEvent.click(confirmButton);
    
    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the "Cancel" button is clicked', () => {
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();

    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        foodItem={mockFood}
        isDeleting={false}
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it('disables buttons when isDeleting is true', () => {
    render(
      <DeleteConfirmationModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        foodItem={mockFood}
        isDeleting={true}
      />
    );

    expect(screen.getByTestId('food-confirm-delete-btn')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});