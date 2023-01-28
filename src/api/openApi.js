import axiosClient from "./axiosClient";
// https://provinces.open-api.vn/api/p/
const openAddressApi = {
  getList: (url) => {
    return axiosClient.get(url);
  },
};

export default openAddressApi;
