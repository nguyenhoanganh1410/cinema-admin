const initValue = {
  user: {
    username: "",
    password: "",
  },
  count: 0,
};

const rootReducer = (state = initValue, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        count: 1,
      };
    default:
      return state;
  }
};

export default rootReducer;
