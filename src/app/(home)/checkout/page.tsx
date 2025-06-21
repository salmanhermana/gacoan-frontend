import { Metadata } from "next";
import CheckoutContainer from "@/app/(home)/checkout/containers/CheckoutContainer";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Halaman Checkout",
};

export default function CheckoutPage() {
  return <CheckoutContainer />;
}
