import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducer from "./reducer";

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const composeEnhancers = composeWithDevTools({});

const configureStore = () =>
  createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

export default configureStore;
