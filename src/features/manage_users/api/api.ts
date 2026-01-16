import axiosClient from "@/services/axiosClient";
import { isUserAvailable, User, userReq } from "../types";

export const getUsers = async (): Promise<User[]> => {
  return axiosClient.get("/users");
};

export const getUserById = async (id: number): Promise<User> => {
  return axiosClient.get(`/users/${id}`);
};

export const checkEmailAvailability = async (): Promise<isUserAvailable> => {
  return axiosClient.post("/users/is-available");
};

export const createUser = async (req: userReq): Promise<User> => {
  return axiosClient.post("/users", req);
};

export const updateUser = async (id: number, req: userReq): Promise<User> => {
  return axiosClient.put(`/users/${id}`, req);
};
export const deleteUser = async (id: number): Promise<boolean> => {
  return axiosClient.delete(`/users/${id}`);
};
