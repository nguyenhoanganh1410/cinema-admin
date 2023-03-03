export const setUser = (data) => {
  return {
    type: "user/setUser",
    payload: data,
  };
};

export const setPromotionHeader = (data) => {
  return {
    type: "promotion/promotionHeaderId",
    payload: data,
  };
};
