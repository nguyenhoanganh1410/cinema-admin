import axiosApi from "./axisosApi";

const productApi = {
    getProducts: () => {
        return axiosApi.get("/product");
    },
    getProductById: (id) => {
        return axiosApi.get(`/product/${id}`);
    },
    createProduct: (data) => {
        return axiosApi.post("/product", data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateProduct: (id, data) => {
        return axiosApi.put(`/product/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
    },
    deleteProduct: (id) => {
        return axiosApi.delete(`/product/${id}`);
    },
};

export default productApi;