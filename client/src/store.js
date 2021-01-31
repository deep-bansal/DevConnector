import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Reducers from "./reducers";

const middleWare = [thunk, logger];

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
