import { apiClient } from "@/utils/api";

type RegisterData = {
  email: string;
  id: string;
  name: string;
  password: string;
};

export const registerUser = async (data: RegisterData) => {
  const response = await apiClient.post(`/api/Member/`, {
    email: data.email,
    id: data.id,
    name: data.name,
    passWord: data.password,
  });
  return response.data;
};
