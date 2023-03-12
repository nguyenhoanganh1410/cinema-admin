import axiosApi from "./axisosApi";

const showTimeApi = {
    getShowTimeByCinema: (id) => {
        return axiosApi.get(`/showTime/cinema/${id}`);
    },
    getListShowTime() {
        return axiosApi.get("/showTime");
    },
};

export default showTimeApi;
