"use client";
import Form from "@/app/(auth)/register/components/Form";

const Register = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-screen">
      <div className="relative hidden md:flex flex-col w-full h-screen bg-[#243E80] items-center justify-center gap-8">
        <p className="text-white text-2xl font-bold">Selamat Datang di Gacoan!</p>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-screen p-4 lg:p-8 bg-cover bg-center lg:bg-none bg-white">
        <div className="bg-typo-white w-full px-12 max-md:px-0 max-lg:px-6">
          <div className="mb-4 space-y-2">
            <h1 className="text-2xl font-semibold">Daftar</h1>
            <p className="text-md text-typo-secondary">
              Silahkan buat akun anda
            </p>
          </div>

          <Form />

          <div className="text-center my-4">
            <p className="text-md">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-[#243E80] hover:underline font-bold"
              >
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
