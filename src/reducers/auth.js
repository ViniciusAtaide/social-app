const initialState = {
  loggedIn: false,
  user: null,
  authError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case "AUTH_ERROR":
      return { ...state, authError: action.payload };
    default:
      return state;
  }
}
