import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./Roboto.css";
import "./index.css";
import "./material-icons.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import axios from "axios";
import { loadState, saveState } from "./localStorage";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import throttle from "lodash/throttle";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: { "Access-Control-Allow-Origin": "*" }
});

const history = createHistory();

const middleware = routerMiddleware(history);

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, middleware)
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
