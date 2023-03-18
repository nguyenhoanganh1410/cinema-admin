import axiosApi from "./axisosApi";

const priceApi = {
    getPriceHeader: () => {
        return axiosApi.get("/priceHeader");
    },
    updatePriceHeader: (data) => {
        return axiosApi.put(`/priceHeader/${data.id}`, data);
    },
    createPriceHeader: (data) => {
        return axiosApi.post("/priceHeader", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getPriceHeaderById: (id) => {
        return axiosApi.get(`/priceHeader/${id}`);
    },
    getPriceLineByHeader: (_id) => {
        return axiosApi.get(`/priceLine/priceHeader/${_id}`);
    }
};

export default priceApi;