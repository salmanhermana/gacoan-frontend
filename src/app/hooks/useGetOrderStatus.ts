import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useOrderStatus(transactionId: string | null) {
  return useQuery({
    queryKey: ["order-status", transactionId],
    queryFn: async () => {
      if (!transactionId) return null;
      const response = await api.get(`/transaction/${transactionId}`);
      return response.data;
    },
    enabled: !!transactionId,
  });
}
