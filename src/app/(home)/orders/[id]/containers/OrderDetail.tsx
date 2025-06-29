"use client";

import { useParams } from "next/navigation";
import {
  Loader2,
  RotateCw,
  XCircle,
} from "lucide-react";
import Layout from "@/layouts/Layout";
import Link from "next/link";
import ButtonLink from "@/components/links/ButtonLink";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderStatus } from "@/app/hooks/useGetOrderStatus";
import { OrderItem } from "@/types/checkout/order";
import formatDuration from "@/app/utils/durationUtils";
import { formatIDR } from "@/app/utils/currencyUtils";

export default function OrderDetailsContainer() {
  const params = useParams();
  const orderId = params.id as string;
  const queryClient = useQueryClient();

  const {
    data: orderData,
    isLoading,
    isError,
  } = useOrderStatus(orderId);

  const orderDetails = orderData?.data?.orders;
  const orderStatus = orderData?.data?.order_status;

  // @ts-ignore
  const handleRefetch = (e) => {
    e.stopPropagation();
    queryClient.invalidateQueries({ queryKey: ["order-status", orderId] });
  };

  if (isLoading) {
    return (
      <Layout withNavbar withFooter>
        <div className="relative flex justify-center items-center min-h-screen">
          <Loader2 size={50} className="animate-spin text-[#243E80]" />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout withNavbar withFooter>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <XCircle size={60} className="text-red-500 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Order tidak ditemukan</h1>
          <p className="text-gray-600 mb-6 text-center">
            Pesanan yang Anda cari tidak dapat ditemukan atau telah dihapus.
          </p>
          <Link
            href="/orders"
            className="bg-[#243E80] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d5e] transition duration-300"
          >
            Lihat Riwayat Pesanan
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout withNavbar withFooter>
      <div className="relative mx-auto w-full max-w-3xl pb-20 pt-12 md:pt-16 px-4 sm:px-6">
        <div className="flex justify-between">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Detail Pesanan</h1>
            <p className="text-gray-600">Order ID: #{orderId}</p>
            <p className="text-gray-600">Nomor Meja: {orderData.data.table.table_number}</p>
            <p className="text-gray-600">Nomor Antrian: {orderData.data.queue_code}</p>
          </div>
          <RotateCw
            onClick={handleRefetch}
            className={`cursor-pointer hover:text-gray-800 ${isLoading && "animate-spin"}`}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border mb-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Pesanan</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Estimasi Waktu Pemesanan</span>
              <span className="font-medium">{formatDuration(orderData.data.estimate_time)}</span>
            </div>

            <div className="py-2 border-b border-gray-100">
              <span className="text-gray-600 block mb-2">Item Pesanan</span>
              <div className="">
                {orderDetails.length > 0 ? (
                  orderDetails.map((item: OrderItem, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-1"
                    >
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-800">x{item.quantity}</span>
                        <span className="font-medium">{item.menu.name}</span>
                      </div>
                      <span className="font-semibold text-md">{formatIDR(item.menu.price)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">Tidak ada item</span>
                )}
              </div>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Harga</span>
              <span className="font-medium capitalize">{formatIDR(orderData.data.total_price)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Status Pesanan</span>
              <span className="font-medium capitalize">{orderStatus}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Pesanan Terlambat</span>
              <span className="font-medium capitalize">{orderData.data.is_delayed ? "Ya" : "Tidak"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <ButtonLink
            href="/orders"
            variant="ghost"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-center font-medium transition duration-300"
          >
            Riwayat Pesanan
          </ButtonLink>
          <ButtonLink
            href="/"
            className="flex-1 bg-[#243E80] hover:bg-[#1a2d5e] text-white px-6 py-3 rounded-lg text-center font-medium transition duration-300"
          >
            Kembali ke Beranda
          </ButtonLink>
        </div>
      </div>
    </Layout>
  );
}
