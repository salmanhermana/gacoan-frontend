"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { formatDateToLocale } from "@/app/utils/dateUtils";

type Order = {
  id: number;
  user_id: string;
  order_status: string;
  payment_status: string;
  notes: string | null;
  estimasi: string | null;
  antrian: number | null;
  payment_status_updated_at: string;
  order_status_updated_at: string;
  payment_token: string;
  redirect_url: string;
  created_at: string;
};

export default function OrderHistoryContainer() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [orderStatus, setOrderStatus] = useState<string>("");


  const handleViewOrder = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  const getStatusIcon = (status: string) => {
    if (status === "pending") {
      return <AlertCircle className="text-yellow-500" />;
    } else if (["success", "settlement", "capture"].includes(status)) {
      return <CheckCircle className="text-green-500" />;
    } else {
      return <XCircle className="text-red-500" />;
    }
  };

  return (
    <Layout withNavbar withFooter>
      <div className="mx-auto w-full max-w-3xl pb-20 pt-12 md:pt-16 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
          <p className="text-gray-600 mt-1">
            Lihat semua pesanan Anda
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex border-b border-gray-200">
          <button
            className={`pb-4 px-4 font-medium ${activeTab === "pending"
              ? "border-b-2 border-[#243E80] text-[#243E80]"
              : "text-gray-500"
              }`}
            onClick={() => {
              setActiveTab("pending");
              setPaymentStatus("pending");
              setOrderStatus("");
            }}
          >
            Menunggu Pembayaran
          </button>
          <button
            className={`pb-4 px-4 font-medium ${activeTab === "settlement"
              ? "border-b-2 border-[#243E80] text-[#243E80]"
              : "text-gray-500"
              }`}
            onClick={() => {
              setActiveTab("settlement");
              setPaymentStatus("settlement");
              setOrderStatus("pending,processing,ready");
            }}
          >
            Sedang Dikerjakan
          </button>
          <button
            className={`pb-4 px-4 font-medium ${activeTab === "history"
              ? "border-b-2 border-[#243E80] text-[#243E80]"
              : "text-gray-500"
              }`}
            onClick={() => {
              setActiveTab("history");
              setPaymentStatus("");
              setOrderStatus("");
            }}
          >
            History
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-[#243E80]" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:underline"
            >
              Coba lagi
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tidak ada pesanan</h2>
            <p className="text-gray-500 mb-6">
              {activeTab === "pending"
                ? "Anda belum memiliki pesanan yang belum dibayar"
                : activeTab === "settlement"
                  ? "Anda tidak memiliki pesanan yang sedang dikerjakan"
                  : "Anda belum pernah melakukan pemesanan apapun"}
            </p>
            <Link
              href="/"
              className="bg-[#243E80] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d5e] transition duration-300"
            >
              Mulai Pesan
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-4 hover:shadow-md transition duration-200 cursor-pointer"
                onClick={() => handleViewOrder(order.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateToLocale(order.created_at)}
                    </p>
                  </div>
                  {activeTab === "pending" ? (
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.payment_status)}
                      <span className="text-sm font-medium capitalize">
                        {order.payment_status}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium capitalize">
                        {order.order_status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4 text-[#243E80]">
                  <ShoppingBag size={16} />
                  <span className="text-sm font-medium">Lihat Detail</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
