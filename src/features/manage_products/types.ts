import { Category } from "../manage_categories/types";

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
};
export interface ProductCardProps {
  imgSrc: string;
  productName: string;
  onProductEdit: () => void;
  onProductDelete: () => void;
}
export type ProductTableRow = Omit<Product, "category"> & {
  category: string;
};
export interface ProductReq
  extends Omit<
    Product,
    "id" | "creationAt" | "updatedAt" | "slug" | "category"
  > {
  categoryId: number;
}
export type ProductListResponse = Product[];
