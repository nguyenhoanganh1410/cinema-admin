import axiosApi from "./axisosApi";

const staffApi = {
  getStaffs: () => {
    return axiosApi.get("/staff");
  },
  getStaff: (id) => {
    return axiosApi.get(`/staff/${id}`);
  },
  createStaff: (data) => {
    return axiosApi.post("/staff", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateStaff: (id, data) => {
    return axiosApi.put(`/staff/${id}`, data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteStaff: (id) => {
    return axiosApi.delete(`/staff/${id}`);
  },


};


export default staffApi;
