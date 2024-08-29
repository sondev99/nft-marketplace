import axiosClient from "@/axios/apiConfig";
import { API_URL_SUMMARY } from "@/constant/apiConstant";

const url = API_URL_SUMMARY;
const summaryApi = {
  getSummary: () => {
    return axiosClient.get(`${url}`);
  },
  getTradingVolume7Day: () => {
    return axiosClient.get(`${url}/trading-volume-7day`);
  },
  getChart5Day: (nftId: number) => {
    return axiosClient.get(`${url}/chart-price-5days/${nftId}`);
  },
};

export default summaryApi;
