import LoginContainer from "@/app/(auth)/login/containers/LoginContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Halaman Login",
};

export default function LoginPage() {
    return <LoginContainer />;
}
