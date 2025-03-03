const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, user: null };
    case "UPDATE_PROFILE":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default authReducer;
