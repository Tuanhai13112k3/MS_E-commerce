export interface CategoryCardProps {
  imgSrc: string;
  categoryName: string;
  productsCount: number | string;
  onCardClickListener: () => void;
}
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
export type CategoryReq = {
  name: string;
  image: string;
};
export interface CategoryFormProps {
  visible: boolean;
  handleCancel: () => void;
}
