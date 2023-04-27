import axiosApi from "./axisosApi";

const authApi = {
  sendEmailFogotPassword: (data) => {
    return axiosApi.post("/auth/forgot-password", {email: data});
  },
  resetPassword: (email, token, password) => {
    return axiosApi.post("/auth/reset-password", {email, token, password});
  },
};

export default authApi;
