import axiosApi from "./axisosApi";

const cinameApi = {
  getCinemas: () => {
    return axiosApi.get("/cinema");
  },

  getHallByCinema: (id) => {
    return axiosApi.get(`cinemaHall/cinema/${id}`);
  },


};

export default cinameApi;
