const initialState = {
  user: null,
  loginError: null,
  signinError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    case "SIGNIN_ERROR":
      return { ...state, signinError: action.payload };
    case "LOGIN_ERROR":
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
}
