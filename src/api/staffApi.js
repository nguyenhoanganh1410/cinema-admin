import axiosApi from "./axisosApi";

const staffApi = {
  getStaffs: () => {
    return axiosApi.get("/staff");
  },
};

export default staffApi;
