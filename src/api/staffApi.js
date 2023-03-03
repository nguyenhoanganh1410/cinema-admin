import axiosApi from "./axisosApi";

const staffApi = {
  getShow: () => {
    return axiosApi.get("/staff");
  },
};

export default staffApi;
