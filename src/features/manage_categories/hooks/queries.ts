import { API_STALE_TIME } from "@/assets/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getProductsByCategory,
  updateCategory,
} from "../api/api";
import { CategoryReq } from "../types";

const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  detailBySlug: (slug: string) =>
    [...categoryKeys.all, "detail", slug] as const,
  detailById: (id: number) => [...categoryKeys.all, "detail", id] as const,
  listsProduct: (id: number) =>
    [...categoryKeys.all, "categories", id, "products"] as const,
};

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
    staleTime: API_STALE_TIME,
  });
};

export const useFetchProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: categoryKeys.detailBySlug(slug),
    queryFn: () => getCategoryBySlug(slug),
    staleTime: API_STALE_TIME,
  });
};

export const useFetchCategoryById = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detailById(id),
    queryFn: () => getCategoryById(id),
    staleTime: API_STALE_TIME,
  });
};
export const useFetchProductsByCategoryId = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.listsProduct(id),
    queryFn: () => getProductsByCategory(id),
    staleTime: API_STALE_TIME,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, req }: { id: number; req: CategoryReq }) =>
      updateCategory(id, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};
