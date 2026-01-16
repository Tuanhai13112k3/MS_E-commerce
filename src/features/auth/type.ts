import { User } from "../manage_users/types";

export type LoginReq = {
  email: string;
  password: string;
};
export type LoginRes = {
  access_token: string;
  refresh_token: string;
};
export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
};
