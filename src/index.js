import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./Roboto.css";
import "./index.css";
import "./material-icons.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 1000,
  headers: { "Access-Control-Allow-Origin": "*" }
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
