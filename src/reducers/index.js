import { combineReducers } from "redux";
import auth from "./auth";
import request from "./request";

const rootReducer = combineReducers({
  auth,
  request
});

export default rootReducer;
