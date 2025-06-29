import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import { LayoutProps } from "@/types/layout";

export default function Layout({
  children,
  withFooter,
  withNavbar,
}: LayoutProps) {
  return (
    <>
      {withNavbar && <Navbar />}
      <div className="pt-[3.5rem] min-h-screen">{children}</div>
      {withFooter && <Footer />}
    </>
  );
}
