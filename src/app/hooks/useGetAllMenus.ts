import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Menu } from "@/types/menu/menu";

export default function useGetAllMenus(category_id? : string) {
  return useQuery<Menu[]>({
    queryKey: ["menus-all", category_id],
    queryFn: async () => {
      const response = await api.get("/menu/", {
        params: category_id ? { category_id } : {},
      });
      return response.data.data;
    },
  });
}
