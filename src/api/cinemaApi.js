import axiosApi from "./axisosApi";

const cinameApi = {
  getCinemas: () => {
    return axiosApi.get("/cinema");
  },

};

export default cinameApi;
