import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import cartReducer from "./cart/CartSlice";
import productReducer from "./product/ProductSlice";
import { persistStore, persistReducer } from "redux-persist";
import { createEpicMiddleware } from 'redux-observable';
import storage from "redux-persist/lib/storage";
import rootEpic from "./rootEpic";

const allowedReducerKeys = ["cart", "user"];

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  version: 2, //Tang version khi thay doi rootReducer
  storage,
  migrate: (persistedState) => {
    if (persistedState) {
      const migratedState = {};
      for (const key of allowedReducerKeys) {
        if (key in persistedState) {
          migratedState[key] = persistedState[key];
        }
      }
      console.log("Redux state đã migrate:", migratedState);
      return Promise.resolve(migratedState);
    }
    return Promise.resolve(persistedState);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);