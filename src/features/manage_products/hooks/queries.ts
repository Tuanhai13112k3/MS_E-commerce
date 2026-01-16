import { API_STALE_TIME } from "@/assets/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
} from "../api/api";

const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
};

export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: getProducts,
    staleTime: API_STALE_TIME,
  });
};
export const useFetchProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    staleTime: API_STALE_TIME,
    enabled: !!slug,
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
