import axiosApi from "./axisosApi";

const showTimeApi = {
    getShowTimeByCinema: (id) => {
        return axiosApi.get(`/showTime/cinema/${id}`);
    },
    getListShowTime() {
        return axiosApi.get("/showTime");
    },
    getShowTimeByShowId(id) {
        return axiosApi.get(`/showTimesMovie/${id}`);
    },
    getTime(id) {
        return axiosApi.get(`/showTime/${id}`);
    },
    deleteShowTime(id,date) {
        return axiosApi.delete(`showTimesMovie/${id}/date/${date}`);
    },
    getTimeByShowIdAndDate(id,date) {
        return axiosApi.get(`showTimesMovie/show/${id}/date/${date}`);
    },
    getListTime(idCinema,showDate,idMovie) {
        return axiosApi.get(`/showTimesMovie/showTime/movie?idCinema=${idCinema}&showDate=${showDate}&idMovie=${idMovie}`);
    }
};

export default showTimeApi;
