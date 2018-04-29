import { api } from "../index";

export const requestPosts = token => dispatch => {
  api
    .get("posts", { headers: { authorization: token } })
    .then(response =>
      dispatch({ type: "POSTS_RECEIVED", payload: response.data })
    )
    .catch(error => console.log(error));
};

export const togglePostDialog = () => ({ type: "TOGGLE_POST_DIALOG" });
export const createPost = (post, token) => dispatch => {
  api
    .post("posts", post, { headers: { authorization: token } })
    .then(response => {
      dispatch(togglePostDialog());
      dispatch({ type: "POST_CREATED", post: response.data });
    })
    .catch(err => {
      console.log(err);
      dispatch(togglePostDialog());
    });
};
