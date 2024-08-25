import axiosClient from "@/axios/apiConfig";
import { API_URL_TRANSACTION } from "@/constant/apiConstant";
import { TransactionRequest } from "@/type/transactions";

const url = API_URL_TRANSACTION;
const transactionApi = {
  createTransaction: (data: TransactionRequest) => {
    return axiosClient.post(`${url}`, data);
  },
  getAllTransaction: () => {
    return axiosClient.get(`${url}`);
  },
};

export default transactionApi;
