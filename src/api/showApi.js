import axiosApi from "./axisosApi";

const showApi = {
  getShow: () => {
    return axiosApi.get("/show");
  },
};

export default showApi;
