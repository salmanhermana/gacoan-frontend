import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import useAuthStore from "@/app/stores/useAuthStore";
import { LoginError, LoginRequest, LoginResponse } from "@/types/auth/login";
import { setToken } from "@/lib/cookies";
import { User } from "@/types/user";

export default function useLoginMutation() {
  const { login } = useAuthStore();
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<LoginError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<LoginResponse>("/user/login", data);
      const token = res.data.data.access_token;
      setToken(token);

      const user = await api.get<{ data: User }>("/user/me");

      if (user) login({ ...user.data.data, token: token });

      return res;
    },
    onSuccess: () => {
      const role = useAuthStore.getState().user?.role;
      if (!role) return;

      const redirect = role === "customer" ? "/" : "/dashboard";
      toast.success("Anda berhasil login");
      router.push(redirect);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data.error ||
          error?.response?.data.message ||
          error.message,
      );
    },
  });
  return { mutate, isPending };
}
