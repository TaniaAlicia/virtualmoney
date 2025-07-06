import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const logout = async (token: string) => {
  await axios.post(`${API_URL}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem('token'); 
