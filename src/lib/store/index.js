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
import orderProductsSlice from './slices/orderProductsSlice';
import productReviewsSlice from './slices/productReviewsSlice';
import addressesSlice from './slices/addressesSlice';
import ordersSlice from './slices/ordersSlice';
import isRedirectingSlice from './slices/isRedirectingSlice';
import lastPageVisitedSlice from './slices/lastPageVisitedSlice';

const rootReducer = combineReducers({
  user: userSlice,
  products: productsSlice,
  cartProducts: cartProductsSlice,
  orderProducts: orderProductsSlice,
  reviews: productReviewsSlice,
  addresses: addressesSlice,
  orders: ordersSlice,
  isRedirecting: isRedirectingSlice,
  lastPageVisited: lastPageVisitedSlice
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