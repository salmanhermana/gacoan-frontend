import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Category } from "@/types/menu/category";

export default function useGetAllCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories-all"],
    queryFn: async () => {
      const response = await api.get(`/category/`);
      return response.data.data;
    },
  });
}
