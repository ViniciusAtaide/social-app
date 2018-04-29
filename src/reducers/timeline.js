const initialState = {
  posts: [],
  postDialog: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "POSTS_RECEIVED":
      return { ...state, posts: action.payload };
    case "TOGGLE_POST_DIALOG":
      return { ...state, postDialog: !state.postDialog };
    case "POST_CREATED":
      return { ...state, posts: [...state.posts, action.post] };
    default:
      return state;
  }
}
