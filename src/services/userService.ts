import axios from './axiosConfig';

export const getUserById = async (userId: number, token: string) => {
  const response = await axios.get(`/api/user/${userId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

