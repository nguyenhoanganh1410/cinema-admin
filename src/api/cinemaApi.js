import axiosApi from "./axisosApi";

const cinameApi = {
  getCinemas: () => {
    return axiosApi.get("/cinema");
  },
  getCinemaById: (id) => {
    return axiosApi.get(`/cinema/${id}`);
  },
  getHallByCinema: (id) => {
    return axiosApi.get(`cinemaHall/cinema/${id}`);
  },
  getCinemaActive: () => {
    return axiosApi.get("/cinema/status/active");
  }


};

export default cinameApi;
