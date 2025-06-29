import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type CreateUserRequest = {
  nama: string;
  nomor_telepon: string;
  email: string;
  password: string;
};

export default function useCreateUserMutation() {
  const router = useRouter();

  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const response = await api.post("/user/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pendaftaran berhasil!");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Pendaftaran Gagal!");
    },
  });

  return { mutate, mutateAsync, isPending, data, isError };
}
