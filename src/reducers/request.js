const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_SENT":
      return { ...state, loading: true };
    case "REQUEST_RECEIVED":
      return { ...state, loading: false };
    default:
      return state;
  }
}
