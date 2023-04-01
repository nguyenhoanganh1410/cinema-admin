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

  createPromotionLine: (data) => {
    return axiosApi.post("/promotionLine", data);
  },
  createPromotionDetail: (data) => {
    return axiosApi.post("/promotionDetail", data);
  },

  checkPromotion: (data) => {
    const {date, phone, totalMoney, idProduct, qtyBuy} = data
    return axiosApi.get(`/promotionHeader/check/promotion?date=${date}&phone=${phone}&totalMoney=${totalMoney}&idProductBuy=${idProduct}&qtyBuy=${qtyBuy}`);
  },
};

export default promotionApi;
