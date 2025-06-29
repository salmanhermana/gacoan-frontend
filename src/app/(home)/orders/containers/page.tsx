"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Clock,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import withAuth from "@/components/hoc/withAuth";
import api from "@/lib/api";
import { TransactionData } from "@/types/checkout/order";
import formatDuration from "@/app/utils/durationUtils";
import PaginationControl from "@/components/table/PaginationControl";

export default withAuth(OrderHistoryContainer, "customer");

function OrderHistoryContainer() {
  const router = useRouter();

  const [orders, setOrders] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [orderStatus, setOrderStatus] = useState<string>("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    max_page: 1,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { page, per_page } = pagination;
        const res = await api.get(`/transaction/?page=${page}&per_page=${per_page}`);

        if (res.data.status) {
          setOrders(res.data.data);
          setPagination((prev) => ({
            ...prev,
            totalPages: res.data.meta?.max_page ?? 1,
          }));
        } else {
          setError("Gagal memuat pesanan");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination.page, paymentStatus, orderStatus]);

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  const getStatusIcon = (status: string) => {
    if (status === "pending") {
      return <AlertCircle className="text-yellow-500" />;
    } else if (["finished"].includes(status)) {
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-[#243E80]" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:underline cursor-pointer"
            >
              Coba lagi
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tidak ada pesanan</h2>
            <Link
              href="/"
              className="bg-[#243E80] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d5e] transition duration-300"
            >
              Mulai Pesan
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border rounded-xl p-4 hover:shadow-md transition duration-200 cursor-pointer"
                  onClick={() => handleViewOrder(order.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Order #{order.id}</p>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.order_status)}
                        <span className="text-sm font-medium capitalize">
                          {order.order_status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-gray-500 gap-1">
                      {order.orders.slice(0, 3).map((item: any, idx: number) => (
                        <span key={idx}>{item.menu.name}</span>
                      ))}

                      {order.orders.length > 3 && (
                        <span className="italic text-sm">+{order.orders.length - 3} item lainnya</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    <div className="flex items-center gap-2 text-[#243E80]">
                      <ShoppingBag size={16} />
                      <span className="text-sm font-medium">Lihat Detail</span>
                    </div>
                    <span className="flex gap-1 items-center text-sm font-medium capitalize">
                      <Clock />
                      {formatDuration(order.estimate_time)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {pagination.max_page > 1 && (
              <PaginationControl
                data={orders}
                table={{} as any}
                setParams={setPagination}
                apiIntegration={{
                  enabled: true,
                  currentPage: pagination.page,
                  totalPages: pagination.max_page,
                }}
                onPageChange={(newPage) =>
                  setPagination((prev) => ({ ...prev, page: newPage }))
                }
                className="mt-8 justify-center md:justify-end"
              />
            )}
          </>
        )}
      </div>
    </Layout >
  );
}
