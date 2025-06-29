"use client";

import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import * as React from "react";
import useCreateUserMutation, { CreateUserRequest } from "@/app/hooks/useCreateUserMutation";
import { validationRules } from "@/app/utils/validation";

const Form = () => {
  const methods = useForm<CreateUserRequest>();
  const { handleSubmit } = methods;

  const { mutate: createUser, isPending } = useCreateUserMutation();

  const onSubmit = async (data: CreateUserRequest) => {
    createUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          validation={validationRules.phone}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Masukkan email"
          className="w-full"
          validation={validationRules.email}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Masukkan kata sandi"
          className="w-full"
          validation={validationRules.password}
        />

        <Button
          type="submit"
          className="w-full bg-[#243E80] hover:bg-[#1a2e5c] border-none cursor-pointer"
        >
          {isPending ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
