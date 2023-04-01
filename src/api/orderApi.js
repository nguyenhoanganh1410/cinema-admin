import axiosApi from "./axisosApi";

const orderApi = {
    createOrder: (data) => {
        return axiosApi.post("/order", data);
    },
    
};

export default orderApi;