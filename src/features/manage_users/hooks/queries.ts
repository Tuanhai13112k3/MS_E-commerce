import { API_STALE_TIME } from "@/assets/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkEmailAvailability,
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../api/api";
import { userReq } from "../types";

const usersKey = {
  all: ["users"] as const,
  lists: () => [...usersKey.all, "lists"] as const,
  detail: (id: number) => [...usersKey.all, "detail", id] as const,
};
export const useUsers = () => {
  return useQuery({
    queryKey: usersKey.lists(),
    queryFn: getUsers,
    staleTime: API_STALE_TIME,
  });
};
export const useFetchUserById = (id: number) => {
  return useQuery({
    queryKey: usersKey.detail(id),
    queryFn: () => getUserById(id),
    staleTime: API_STALE_TIME,
    enabled: !!id,
  });
};

export const useCheckUserAvailability = () => {
  return useMutation({
    mutationFn: checkEmailAvailability,
    onError: (error) => {
      console.error(error);
      alert("Lỗi khi kiểm tra email");
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, req }: { id: number; req: userReq }) =>
      updateUser(id, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
