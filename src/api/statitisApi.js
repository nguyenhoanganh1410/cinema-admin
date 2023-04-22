import axiosApi from "./axisosApi";

const statitisApi = {
  getRevenue: (params) => {
    if(!params?.staff_id){
      return axiosApi.get(`/statistics/revenuebystaff?start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`);
    }else{
      return axiosApi.get(`/statistics/revenuebystaff?staff_id=${params?.staff_id}&start_date=${params.start_date}&end_date=${params.end_date}&cinema_id=${params.cinema_id}`);
    }
  },
};


export default statitisApi;
