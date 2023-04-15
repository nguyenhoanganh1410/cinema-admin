import movieApi from "../api/movieApi";
export const getFilmsByIdCinema = async (data) => {
  try {
    const dataResult = await movieApi.getMovieByIdCinema(data);
    return dataResult;
  } catch (error) {
    console.log("fetch failed!!", error);

    throw error;
  }
};
