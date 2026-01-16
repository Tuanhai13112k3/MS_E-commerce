import { User } from "@/features/manage_users/types";
import axiosClient from "@/services/axiosClient";
import { LoginReq, LoginRes } from "../type";

export const login = async (req: LoginReq): Promise<LoginRes> => {
  return axiosClient.post(`/auth/login`, req);
};
export const getUserProfile = async (): Promise<User> => {
  return axiosClient.get("auth/profile");
};
