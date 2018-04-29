import { combineReducers } from "redux";
import auth from "./auth";
import request from "./request";
import timeline from "./timeline";
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
  auth,
  request,
  timeline,
  routing: routerReducer
});

export default rootReducer;
