const initValue = {
  user: {},
};

const rootReducer = (state = initValue, action) => {
  switch (action.type) {
    case "user/setUser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
