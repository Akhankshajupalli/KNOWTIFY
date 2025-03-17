const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
