import axios from 'axios';
import { RegisterDataUser } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (data: RegisterDataUser) => {
  const response = await axios.post(`${API_URL}/users`, data);
  return response.data;
};

export const getUserById = async (userId: number, token: string) => {
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization:`${token}`,
    },
  });
  return response.data;
};

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
