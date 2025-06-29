export interface MenuItem {
  id: string;
  name: string;
  image: string;
  category: 'makanan' | 'minuman' | 'dessert';
  isAvailable: boolean;
  price?: number;
}