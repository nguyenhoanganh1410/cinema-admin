import axiosApi from "./axisosApi";

const customerApi = {
    getCustomers: () => {
        return axiosApi.get("/customer");
    },

    getCustomer: (id) => {
        return axiosApi.get(`/customer/${id}`);
    },

    createCustomer: (data) => {
        return axiosApi.post("/customer", data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    deleteCustomer: (id) => {
        return axiosApi.delete(`/customer/${id}`);
    },
    updateCustomer: (id, data) => {
        return axiosApi.put(`/customer/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getCustomerByPhone: (phone) => {
        return axiosApi.get(`/customer/phone/${phone}`);
    },
};

export default customerApi;