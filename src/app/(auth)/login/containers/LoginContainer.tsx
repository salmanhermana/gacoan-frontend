"use client";

import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import { LoginRequest } from "@/types/auth/login";
import withAuth from "@/components/hoc/withAuth";
import useLoginMutation from "@/app/hooks/useLoginMutation";

export default withAuth(LoginContainer, "public");

function LoginContainer() {
  const methods = useForm<LoginRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const { mutate: mutateLogin, isPending } = useLoginMutation();

  const onSubmit = (data: LoginRequest) => {
    mutateLogin(data);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-screen">
      <div className="relative hidden md:flex flex-col w-full h-screen bg-[#243E80] items-center justify-center gap-8">
        <p className="text-white text-2xl font-bold">Selamat Datang di Gacoan!</p>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-screen p-4 lg:p-8 bg-cover bg-center lg:bg-none bg-white">
        <div className="bg-typo-white w-full px-12 max-md:px-0 max-lg:px-6">
          <div className="mb-4 space-y-2">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-md text-typo-secondary">
              Silahkan masuk dengan akun anda
            </p>
          </div>

          <FormProvider {...methods}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="Masukkan email"
                className="w-full"
                validation={{ required: "Email wajib diisi" }}
              />
              <Input
                id="password"
                type="password"
                label="Kata Sandi"
                placeholder="Masukkan kata sandi"
                className="w-full"
                validation={{ required: "Kata sandi wajib diisi" }}
              />

              <div className="space-y-2">
                <Button
                  type="button"
                  className="w-full bg-[#243E80] hover:bg-[#1a2e5c] border-none cursor-pointer"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                >
                  Login
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-md">
                  Belum punya akun?{" "}
                  <a
                    href="/register"
                    className="text-[#243E80] hover:underline font-bold"
                  >
                    Daftar
                  </a>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
