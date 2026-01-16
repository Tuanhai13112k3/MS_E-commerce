import axiosClient from "@/services/axiosClient";
import { Product, ProductListResponse, ProductReq } from "../types";

export const getProducts = async (): Promise<ProductListResponse> => {
  return axiosClient.get("/products");
};
export const getProductBySlug = async (slug: string): Promise<Product> => {
  return axiosClient.get(`/products/slug/${slug}`);
};

export const createProduct = async (product: ProductReq): Promise<Product> => {
  return axiosClient.post("/products", product);
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  return axiosClient.delete(`/products/${id}`);
};
