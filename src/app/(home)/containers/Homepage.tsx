"use client";

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import MenuSection from "../components/MenuSection";
import withAuth from "@/components/hoc/withAuth";
import CartFooter from "@/layouts/CartFooter";

export default withAuth(Home, "public");

function Home() {
  return (
    <>
      <Navbar />
      <MenuSection />
      <CartFooter />
      <Footer />
    </>
  );
}
