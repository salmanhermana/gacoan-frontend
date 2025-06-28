"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Loader2,
  RotateCw,
  XCircle,
} from "lucide-react";
import Layout from "@/layouts/Layout";
import Link from "next/link";
import ButtonLink from "@/components/links/ButtonLink";
import { useCart } from "@/app/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderStatus } from "@/app/hooks/useGetOrderStatus";

type MenuItem = {
  menu_name: string;
  quantity: number;
};

export default function OrderDetailsContainer() {
  const params = useParams();
  const orderId = params.id as string;
  const { clearCart } = useCart();

  const {
    data: orderData,
    isLoading,
    isPending,
    isError,
  } = useOrderStatus(orderId);

  const queryClient = useQueryClient();
  const orderDetails = orderData?.data?.order;
  const paymentStatus = orderDetails?.payment_status || "pending";
  const orderStatus = orderDetails?.order_status || "pending";
  const orderItems = orderDetails?.items || [];

  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  // @ts-ignore
  const handleRedirectToPayment = (e) => {
    e.stopPropagation();

    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

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
          </div>
          <RotateCw
            onClick={handleRefetch}
            className={`cursor-pointer hover:text-gray-800 ${isLoading && "animate-spin"}`}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border mb-6">
          <div className="flex items-center gap-3 mb-4">
            {paymentStatus === "pending" ? (
              <AlertCircle size={24} className="text-yellow-500" />
            ) : ["success", "settlement", "capture"].includes(paymentStatus) ? (
              <CheckCircle size={24} className="text-green-500" />
            ) : ["expire", "cancel", "deny", "failure"].includes(
              paymentStatus,
            ) ? (
              <XCircle size={24} className="text-red-500" />
            ) : (
              <Loader2 size={24} className="text-blue-500 animate-spin" />
            )}
            <h2 className="text-xl font-semibold">
              Status Pembayaran:{" "}
              {paymentStatus &&
                paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
            </h2>
          </div>

          {paymentStatus === "pending" && (
            <>
              <p className="mb-6">
                Silakan selesaikan pembayaran untuk memproses pesanan Anda.
              </p>
              <button
                onClick={handleRedirectToPayment}
                className="flex items-center justify-center gap-2 bg-[#243E80] text-white px-6 py-3 rounded-lg hover:bg-[#1e3367] w-full"
              >
                <span>Lanjutkan ke Halaman Pembayaran</span>
                <ExternalLink size={18} />
              </button>
            </>
          )}

          {["success", "settlement", "capture"].includes(paymentStatus) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              <p className="font-medium mb-2">
                Terima kasih! Pembayaran Anda telah berhasil diproses.
              </p>
              <p>
                Status pesanan:{" "}
                <span className="font-semibold capitalize">{orderStatus}</span>
              </p>
              {orderDetails.estimasi && (
                <p className="mt-2">
                  Estimasi waktu selesai: {orderDetails.estimasi}
                </p>
              )}
              {orderDetails.antrian !== null && (
                <p className="mt-2">Nomor antrian: {orderDetails.antrian}</p>
              )}
            </div>
          )}

          {["expire", "cancel", "deny", "failure"].includes(paymentStatus) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-medium">
                Terjadi masalah dengan pembayaran Anda.
              </p>
              <p className="mt-2">Silakan coba lagi atau hubungi dukungan.</p>
              <Link
                href="/"
                className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Kembali ke Beranda
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border mb-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Pesanan</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Waktu Pemesanan</span>
              <span className="font-medium">
                {new Date(orderDetails.created_at).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>

            <div className="py-2 border-b border-gray-100">
              <span className="text-gray-600 block mb-2">Item Pesanan</span>
              <div className="pl-6">
                {orderItems.length > 0 ? (
                  orderItems.map((item: MenuItem, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-1"
                    >
                      <span className="font-medium">{item.menu_name}</span>
                      <span className="text-gray-800">x{item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">Tidak ada item</span>
                )}
              </div>
            </div>

            {orderDetails.notes && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Catatan</span>
                <span className="font-medium text-right">
                  {orderDetails.notes}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Status Pesanan</span>
              <span className="font-medium capitalize">{orderStatus}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Status Pembayaran</span>
              <span className="font-medium capitalize">{paymentStatus}</span>
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
