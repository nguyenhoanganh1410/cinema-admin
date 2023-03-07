import axiosApi from "./axisosApi";

const cinemaHallApi = {
  getCinemaHalls: (id) => {
    return axiosApi.get(`/cinemaHall/cinema/${id}`);
  },

};

export default cinemaHallApi;
