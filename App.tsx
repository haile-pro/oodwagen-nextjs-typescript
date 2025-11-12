
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FoodList from './components/FoodList';
import FoodFormModal from './components/FoodFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { FoodItem, FoodFormState } from './types';
import { AppDispatch, RootState } from './store';
import { fetchFoods, createFood, updateFood, deleteFood } from './store/foodsSlice';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: foods, isLoading, error } = useSelector((state: RootState) => state.foods);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const debouncedFetch = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (term: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(fetchFoods(term));
      }, 300);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFoods(''));
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    debouncedFetch(value);
  }, [debouncedFetch]);
  
  const handleOpenAddModal = useCallback(() => {
    setSelectedFood(null);
    setIsFormModalOpen(true);
  }, []);
  
  const handleOpenEditModal = useCallback((food: FoodItem) => {
    setSelectedFood(food);
    setIsFormModalOpen(true);
  }, []);
  
  const handleOpenDeleteModal = useCallback((food: FoodItem) => {
    setSelectedFood(food);
    setIsDeleteModalOpen(true);
  }, []);
  
  const handleCloseModals = useCallback(() => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedFood(null);
  }, []);
  
  const handleFormSubmit = useCallback(async (formData: FoodFormState) => {
    setIsSubmitting(true);
    const action = selectedFood
      ? updateFood({ id: selectedFood.id, formData })
      : createFood(formData);

    try {
      await dispatch(action).unwrap();
      handleCloseModals();
      await dispatch(fetchFoods(searchTerm));
    } catch (err) {
      console.error('Failed to save item:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, selectedFood, searchTerm, handleCloseModals]);
  
  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedFood) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteFood(selectedFood.id)).unwrap();
      handleCloseModals();
      await dispatch(fetchFoods(searchTerm));
    } catch (err) {
      console.error('Failed to delete item:', err);
    } finally {
      setIsDeleting(false);
    }
  }, [dispatch, selectedFood, searchTerm, handleCloseModals]);

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
