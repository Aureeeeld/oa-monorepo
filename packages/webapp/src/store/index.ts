import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import * as ducks from "./ducks";

const logger = createLogger();
const reducers = combineReducers(ducks); // ! Supposed to combine ducks

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
