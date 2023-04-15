import axiosApi from "./axisosApi";

const movieApi = {
  getMovies: () => {
    return axiosApi.get("/movie");
  },
  searchMovies: (nameMovie) => {
    return axiosApi.get(`/movie/name/search/${nameMovie}`);
  },

  createMovie: (data) => {
    return axiosApi.post("/movie", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getMovieById: (id) => {
    return axiosApi.get(`/movie/${id}`);
  },

  getMovieByIdCinema: (id) => {
    return axiosApi.get(`/movie/cinema/${id}`);
  },

  updateMovie: (id, data) => {
    return axiosApi.patch(`/movie/${id}`, data);
  },

  deleteMovie: (id) => {
    return axiosApi.delete(`/movie/${id}`);
  },
};

export default movieApi;
