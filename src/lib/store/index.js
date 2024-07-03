"use client"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import productsSlice from "./slices/productsSlice.js"
import cartProductsSlice from "./slices/cartProductsSlice.js"
import ordersSlice from './slices/ordersSlice';
import productReviewsSlice from './slices/productReviewsSlice';
import addressesSlice from './slices/addressesSlice';

const rootReducer = combineReducers({
  user: userSlice,
  products: productsSlice,
  cartProducts: cartProductsSlice,
  orders: ordersSlice,
  reviews: productReviewsSlice,
  addresses: addressesSlice
})

const persistConfig = {
  key: "pet-commerce",
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)