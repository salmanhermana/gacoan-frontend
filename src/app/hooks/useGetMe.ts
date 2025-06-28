import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { User } from "@/types/user";

export function useGetMe() {
  return useQuery<User>({
    queryKey: ["user-me"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.data;
    },
  });
}
