import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";
import thunk from "redux-thunk";

import * as ducks from "./ducks";

const persistConfig = {
  key: "root",
  storage: localForage,
  whitelist: ["auth", "theme"]
};

const logger = createLogger();
const reducers = combineReducers(ducks);
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
export const persistor = persistStore(store);
