import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducers from "./reducers";

const middleWare = [thunk];

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
