import { useMutation } from "@tanstack/react-query";
import { CheckoutRequest, OrderResponse } from "@/types/checkout/order";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export function useCheckoutMutation() {
  const { clearCart } = useCart();

  return useMutation({
    mutationFn: async (data: CheckoutRequest) => {
      const response = await api.post("/order/checkout", data);
      return response.data as OrderResponse;
    },
    onSuccess: () => {
      toast.success("Pesanan berhasil dibuat!");
      clearCart();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Gagal membuat pesanan!");
    },
  });
}
