export type Menu = {
  id: string;
  nama: string;
  harga: number;
  image_url: string | null;
};

export type UpdateMenuRequest = {
  nama?: string;
  harga?: number;
  image: File;
};
