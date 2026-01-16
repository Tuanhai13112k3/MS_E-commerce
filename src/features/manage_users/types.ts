export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};
export interface UserDisplay
  extends Pick<User, "id" | "email" | "name" | "role" | "avatar"> {}
export type isUserAvailable = {
  isAvailable: boolean;
};
export type userReq = {
  email: string;
  password?: string;
  name: string;
  avatar: string;
};
export type UserFormProps = {
  data?: UserDisplay | null;
  handleCancel: () => void;
};
