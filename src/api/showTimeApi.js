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
};

export default showTimeApi;
