
export interface Restaurant {
  name: string;
  logo: string;
  status: 'Open' | 'Closed';
}

export interface FoodItem {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  rating: number;
  restaurant?: Restaurant;
  price: string;
}

export interface FoodFormState {
  food_name: string;
  food_image: string;
  food_rating: string;
  price: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
}

export type FormErrors = {
  [key in keyof FoodFormState]?: string;
};