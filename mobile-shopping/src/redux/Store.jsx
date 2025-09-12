import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import cartReducer from "./cart/CartSlice";
import productReducer from "./product/productSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const allowedReducerKeys = ["cart", "user", "product"];

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  version: 2, 
  storage,
  migrate: (persistedState) => {
    // Tùy chọn: lọc bỏ những key không còn dùng
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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);