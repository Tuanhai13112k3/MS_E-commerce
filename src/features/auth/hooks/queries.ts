import { API_STALE_TIME } from "@/assets/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, login } from "../api/api";

const authsKey = {
  all: ["auth"] as const,
  profile: () => [...authsKey.all, "profile"] as const,
};
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("access-token", data.access_token);
      localStorage.setItem("refresh-token", data.refresh_token);
      queryClient.invalidateQueries({ queryKey: authsKey.profile() });
    },
    onError: (error) => {
      console.error(error);
      alert("Đăng nhập thất bại!");
    },
  });
};
export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: authsKey.profile(),
    queryFn: getUserProfile,
    staleTime: API_STALE_TIME,
  });
};
