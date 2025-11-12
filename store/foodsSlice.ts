
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { foodService } from '../services/foodService';
import { FoodItem, FoodFormState } from '../types';

interface FoodsState {
  items: FoodItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FoodsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchFoods = createAsyncThunk<FoodItem[], string | undefined>('foods/fetchFoods', async (searchTerm, { rejectWithValue }) => {
  try {
    const data = await foodService.getFoods(searchTerm);
    return data.reverse(); // To show oldest first
  } catch(error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
  }
});

export const createFood = createAsyncThunk<FoodItem, FoodFormState>('foods/createFood', async (formData, { rejectWithValue }) => {
    try {
        return await foodService.createFood(formData);
    } catch(error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});

export const updateFood = createAsyncThunk<FoodItem, { id: string; formData: FoodFormState }>('foods/updateFood', async ({ id, formData }, { rejectWithValue }) => {
    try {
        return await foodService.updateFood(id, formData);
    } catch(error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});

export const deleteFood = createAsyncThunk<string, string>('foods/deleteFood', async (id, { rejectWithValue }) => {
    try {
        await foodService.deleteFood(id);
        return id;
    } catch(error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action: PayloadAction<FoodItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createFood.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default foodsSlice.reducer;
