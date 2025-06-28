import { Metadata } from "next";
import OrderHistoryContainer from "@/app/(home)/orders/containers/page";

export const metadata: Metadata = {
  title: "History",
  description: "Halaman History Order",
};

export default function HistoryOrderPage() {
  return <OrderHistoryContainer />;
}
