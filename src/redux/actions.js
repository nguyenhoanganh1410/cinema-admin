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

export const setReload = (data) => {
  return {
    type: "reload/reloadWhenAdd",
    payload: data,
  };
};

export const setCinemaHall = (data) => {
  return {
    type: "update/cinemaHall",
    payload: data,
  };
};


export const setBooking = (data) => {
  return {
    type: "booking/setData",
    payload: data,
  };
};