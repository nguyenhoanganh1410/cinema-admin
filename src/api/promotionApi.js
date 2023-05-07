import axiosApi from "./axisosApi";

const promotionApi = {
  getPromotionHeader: () => {
    return axiosApi.get("/promotionHeader");
  },
  updatePromotionHeader: (data,id) => {
    return axiosApi.put(`/promotionHeader/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  createPromotionHeader: (data) => {
    return axiosApi.post("/promotionHeader", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPromotionHeaderById: (id) => {
    return axiosApi.get(`/promotionHeader/${id}`);
  },
  getPromotionLineByHeader: (_id) => {
    return axiosApi.get(`/promotionLine/promotionHeader/${_id}`);
  },
  getPromotionLineById: (_id) => {
    return axiosApi.get(`/promotionLine/${_id}`);
  },

  createPromotionLine: (data) => {
    return axiosApi.post("/promotionLine", data);
  },
  createPromotionDetail: (data) => {
    return axiosApi.post("/promotionDetail", data);
  },

  checkPromotion: (data) => {
    return axiosApi.post(`/promotionHeader/check/promotion`, data);
  },

  getPromotionDetailsByLineId: (_id) => {
    return axiosApi.get(`/promotionDetail/promotionLine/${_id}`);
  },
  getAllPromotionLine: () => {
    return axiosApi.get("/promotionLine");
  },
};

export default promotionApi;
