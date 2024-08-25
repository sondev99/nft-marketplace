import axiosClient from '@/axios/apiConfig';
import { API_URL_USER } from '@/constant/apiConstant';

const url = API_URL_USER;
const userApi = {
  getCurrentUser: () => {
    return axiosClient.get(`${url}/current`);
  },
  getUserById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`);
  },
  updateUser: (id: string | undefined, data: any) => {
    return axiosClient.put(`${url}/${id}`, data);
  },
  getAllUser: () => {
    return axiosClient.get(`${url}/all`);
  },
  deleteUser: (id: string) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  blockUser: (id: string) => {
    return axiosClient.put(`${url}/block/${id}`);
  },
};

export default userApi;
