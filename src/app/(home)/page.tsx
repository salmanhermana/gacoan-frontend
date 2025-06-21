import { Metadata } from "next";
import Home from "@/app/(home)/containers/Homepage";

export const metadata: Metadata = {
    title: "Home",
    description: "Halaman Beranda",
};

export default function Homepage() {
    return <Home />;
}
