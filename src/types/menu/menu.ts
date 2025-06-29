export type Menu = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  is_available: boolean;
  price: string;
  category: {
    id: string;
    name: string;
  };
};
