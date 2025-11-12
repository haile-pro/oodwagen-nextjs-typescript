import { FoodItem, FoodFormState, Restaurant } from '../types';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

const transformFormDataToApiPayload = (formData: FoodFormState) => {
  return {
    name: formData.food_name,
    image: formData.food_image,
    rating: Number(formData.food_rating),
    Price: formData.price,
    restaurant: {
      name: formData.restaurant_name,
      logo: formData.restaurant_logo,
      status: formData.restaurant_status,
    },
  };
};

const sanitizeFoodItem = (item: any): FoodItem => {
    const getStatus = (): 'Open' | 'Closed' => {
        const status = item.restaurant?.status || item.status || item.restaurant_status;
        if (status === 'Open Now' || status === 'Open' || item.open === true) {
            return 'Open';
        }
        return 'Closed';
    }

    let restaurant: Restaurant | undefined = undefined;
    const restaurantName = item.restaurant?.name || item.restaurant_name;
    const restaurantLogo = item.restaurant?.logo || item.restaurant_logo || item.logo;
    
    if (restaurantLogo) {
        restaurant = {
            name: restaurantName || 'Unnamed Restaurant',
            logo: restaurantLogo,
            status: getStatus()
        }
    }
    
    const price = String(item.Price ?? item.price ?? '0').replace('$', '');

    return {
        id: item.id,
        createdAt: item.createdAt,
        name: item.name || 'Unnamed Food',
        image: item.image || item.avatar,
        rating: parseFloat(String(item.rating)) || 0,
        price: price,
        restaurant: restaurant,
    }
};

export const foodService = {
  async getFoods(searchTerm?: string): Promise<FoodItem[]> {
    const url = new URL(`${API_BASE_URL}/Food`);
    if (searchTerm) {
      url.searchParams.append('name', searchTerm);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch food items');
    }
    const data: any[] = await response.json();
    return data.map(sanitizeFoodItem);
  },

  async createFood(formData: FoodFormState): Promise<FoodItem> {
    const payload = transformFormDataToApiPayload(formData);
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Failed to create food item');
    }
    const newItem = await response.json();
    return sanitizeFoodItem(newItem);
  },

  async updateFood(id: string, formData: FoodFormState): Promise<FoodItem> {
    const payload = transformFormDataToApiPayload(formData);
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Failed to update food item');
    }
    const updatedItem = await response.json();
    return sanitizeFoodItem(updatedItem);
  },

  async deleteFood(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete food item');
    }
  },
};