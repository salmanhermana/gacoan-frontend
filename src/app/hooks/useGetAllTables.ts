import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Table } from "@/types/table/table";

export default function useGetAllTables() {
  return useQuery<Table[]>({
    queryKey: ["tables-all"],
    queryFn: async () => {
      const response = await api.get(`/table/`);
      return response.data.data;
    },
  });
}
