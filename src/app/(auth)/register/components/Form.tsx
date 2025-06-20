"use client";

import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import * as React from "react";

type RegisterFormValues = {
  name: string;
  telephone: string;
  email: string;
  password: string;
};

const Form = () => {
  const methods = useForm<RegisterFormValues>();
  const { handleSubmit } = methods;

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (formData: RegisterFormValues) => {
    try {
      setIsSubmitting(true);

    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          label="Password"
          placeholder="Masukkan kata sandi"
          className="w-full"
          validation={{ required: "Kata sandi wajib diisi" }}
        />

        <Input
          id="name"
          label="Nama"
          type="text"
          placeholder="Masukkan nama"
          className="w-full"
          validation={{ required: "Nama wajib diisi" }}
        />

        <Input
          id="telephone"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          className="w-full"
          validation={{ required: "Nomor wajib diisi" }}
        />

        <Button
          type="submit"
          className="w-full bg-[#243E80] hover:bg-[#1a2e5c] border-none cursor-pointer"
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
