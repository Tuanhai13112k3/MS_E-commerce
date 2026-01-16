import { ProductListResponse } from "@/features/manage_products/types";
import axiosClient from "@/services/axiosClient";
import { Category, CategoryReq } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  return axiosClient.get(`/categories`);
};

export const getCategoryById = async (id: number): Promise<Category> => {
  return axiosClient.get(`/categories/${id}`);
};
export const getProductsByCategory = async (
  id: number
): Promise<ProductListResponse> => {
  return axiosClient.get(`/categories/${id}/products`);
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  return axiosClient.get(`/categories/${slug}`);
};

export const createCategory = async (req: CategoryReq): Promise<Category> => {
  return axiosClient.post(`/categories`, req);
};

export const updateCategory = async (
  id: number,
  req: CategoryReq
): Promise<Category> => {
  return axiosClient.put(`/categories/${id}`, req);
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  return axiosClient.delete(`/categories/${id}`);
};
