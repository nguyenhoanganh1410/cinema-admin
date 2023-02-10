import axiosApi from "./axisosApi";

const userApi = {
  login: (phone, password) => {
    return axiosApi.post("/auth/login", {
      phone,
      password,
    });
  },
};

export default userApi;
