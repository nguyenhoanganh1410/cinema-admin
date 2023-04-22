import axiosApi from "./axisosApi";

const statitisApi = {
  getRevenueByCustomer: (params) => {
    if (!params?.customer_id) {
      return axiosApi.get(
        `/statistics/revenuebycustomer?start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`
      );
    } else {
      return axiosApi.get(
        `/statistics/revenuebycustomer?staff_id=${params?.customer_id}&start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`
      );
    }
  },
  getRevenue: (params) => {
    if (!params?.staff_id) {
      return axiosApi.get(
        `/statistics/revenuebystaff?start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`
      );
    } else {
      return axiosApi.get(
        `/statistics/revenuebystaff?staff_id=${params?.staff_id}&start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`
      );
    }
  },
  getRevenueByMovie: (params) => {
    if (params?.movie_id) {
      return axiosApi.get(
        `/statistics/revenuebymovie?${params?.movie_id}&start_date=${params.start_date}&end_date=${params.end_date}&movie_id=${params.movie_id}`
      );
    } else {
      return axiosApi.get(
        `/statistics/revenuebymovie?start_date=${params.start_date}&end_date=${params.end_date}`
      );
    }
  },
};

export default statitisApi;
