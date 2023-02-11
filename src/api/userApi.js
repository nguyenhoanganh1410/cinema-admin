import axiosApi from "./axisosApi";

const userApi = {
  login: (phone, password) => {
    return axiosApi.post("/auth/login", {
      phone,
      password,
      staff: 1,
    });
  },
};

export default userApi;
