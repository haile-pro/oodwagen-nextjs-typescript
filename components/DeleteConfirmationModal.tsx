
import React, { memo } from 'react';
import Modal from './Modal';
import Spinner from './Spinner';
import { FoodItem } from '../types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  foodItem: FoodItem | null;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  foodItem,
  isDeleting,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900">Delete Meal</h3>
            <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete <span className="font-bold text-gray-800">{foodItem?.name}</span>? This action cannot be reversed.
            </p>
        </div>
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-center space-x-4">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          data-test-id="food-confirm-delete-btn"
          className="w-32 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? <Spinner className="w-4 h-4" /> : 'Yes'}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default memo(DeleteConfirmationModal);
