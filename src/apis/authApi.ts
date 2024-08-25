import axiosClient from '@/axios/apiConfig';
import { API_URL_AUTH } from '@/constant/apiConstant';

const url = API_URL_AUTH;
const authApi = {
  activeAccount: (token: string | undefined) => {
    return axiosClient.post(`${url}/active-user/${token}`);
  },
  register: (data: RegisterRequest) => {
    return axiosClient.post(`${url}/register`, data);
  },
  login: (data: LoginRequest) => {
    return axiosClient.post(`${url}/login`, data);
  },
};

export default authApi;
