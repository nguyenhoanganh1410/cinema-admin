const initValue = {
  user: {},
  promotionHeaderId: null,
  reload: false,
};

const rootReducer = (state = initValue, action) => {
  switch (action.type) {
    case "user/setUser":
      return {
        ...state,
        user: action.payload,
      };
    case "promotion/promotionHeaderId":
      return {
        ...state,
        promotionHeaderId: action.payload,
      };
    case "reload/reloadWhenAdd":
      return {
        ...state,
        reload: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
