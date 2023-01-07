import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import MainReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const middlewares = [thunk];
// if (__DEV__) {
middlewares.push(logger);

export const store = createStore(
  MainReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);
