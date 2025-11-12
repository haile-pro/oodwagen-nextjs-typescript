
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero'; // New component
import FoodList from './components/FoodList';
import FoodFormModal from './components/FoodFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { foodService } from './services/foodService';
import { FoodItem, FoodFormState } from './types';

const App: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchFoods = useCallback(async (term: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // API returns results in reverse chronological order, let's reverse to show oldest first
      const data = (await foodService.getFoods(term)).reverse();
      setFoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (term: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchFoods(term);
      }, 300);
    };
  }, [fetchFoods]);

  useEffect(() => {
    fetchFoods('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedFetch(value);
  };
  
  const handleOpenAddModal = () => {
    setSelectedFood(null);
    setIsFormModalOpen(true);
  };
  
  const handleOpenEditModal = (food: FoodItem) => {
    setSelectedFood(food);
    setIsFormModalOpen(true);
  };
  
  const handleOpenDeleteModal = (food: FoodItem) => {
    setSelectedFood(food);
    setIsDeleteModalOpen(true);
  };
  
  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedFood(null);
  };
  
  const handleFormSubmit = async (formData: FoodFormState) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (selectedFood) {
        await foodService.updateFood(selectedFood.id, formData);
      } else {
        await foodService.createFood(formData);
      }
      handleCloseModals();
      await fetchFoods(searchTerm); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedFood) return;
    setIsDeleting(true);
    setError(null);
    try {
      await foodService.deleteFood(selectedFood.id);
      handleCloseModals();
      await fetchFoods(searchTerm); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onAddFood={handleOpenAddModal} />
      <Hero searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <FoodList
          foods={foods}
          isLoading={isLoading}
          error={error}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </main>
      <Footer />
      
      <FoodFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        foodItem={selectedFood}
        isSubmitting={isSubmitting}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        foodItem={selectedFood}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default App;