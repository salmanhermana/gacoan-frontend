import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface useGetCategoryByIDProps {
  id: string;
}

export function useGetCategoryByID({ id }: useGetCategoryByIDProps) {
  return useQuery({
    queryKey: ["category-detail", id],
    queryFn: async () => {
      const response = await api.get(`/category/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}
