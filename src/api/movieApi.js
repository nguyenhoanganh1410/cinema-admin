import axiosApi from "./axisosApi";

const movieApi = {
  getMovies: () => {
    return axiosApi.get("/movie");
  },
};

export default movieApi;
