"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { AlertCircle, ExternalLink, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useOrderStatus } from "@/app/hooks/useGetOrderStatus";

const CartFooter = () => {
  const { totalItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("pendingOrderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }

    const storedPaymentUrl = localStorage.getItem("pendingPaymentUrl");
    if (storedPaymentUrl) {
      setPaymentUrl(storedPaymentUrl);
    }
  }, []);

  const { data: orderData } = useOrderStatus(orderId);
  const paymentStatus = orderData?.data?.payment_status || "pending";

  useEffect(() => {
    if (["success", "settlement", "capture"].includes(paymentStatus)) {
      localStorage.removeItem("pendingOrderId");
      localStorage.removeItem("pendingPaymentUrl");
      setOrderId(null);
      setPaymentUrl(null);
    }
  }, [paymentStatus]);

  if (
    totalItems === 0 &&
    (!orderId || ["success", "settlement", "capture"].includes(paymentStatus))
  ) {
    return null;
  }
  const handleRedirectToPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  if (orderId && paymentStatus === "pending") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-yellow-500" size={20} />
              <div>
                <p className="font-medium">Pembayaran Pending</p>
                <p className="text-sm text-gray-500">
                  Selesaikan pembayaran Anda
                </p>
              </div>
            </div>

            <button
              onClick={handleRedirectToPayment}
              className="flex items-center gap-1 bg-[#243E80] hover:bg-[#1a2d5e] text-white px-4 py-2 rounded-lg transition duration-300"
            >
              <span>Bayar Sekarang</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 px-4 sm:px-6 md:px-8 lg:px-[5%]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#243E80] text-white p-2 rounded-full">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </p>
            <p className="font-bold">Rp{totalPrice.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <Link
          href="/checkout"
          className="bg-[#243E80] hover:bg-[#1a2d5e] text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
