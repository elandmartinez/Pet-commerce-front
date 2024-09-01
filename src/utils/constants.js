"use client"

export const DEFAULT_ORDER_STATUS = "Delivered"

export const LOGIN_FORM_INITAL_VALUES = {
  email: "",
  password: ""
}

export const SIGN_UP_FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  phoneNumber: 0,
  nationalCode: 0,
  password: "",
  repeat_password: ""
}

export const PAYMENT_FORM_INITIAL_VALUES = {
  addressStreet: "",
  addressCity: "",
  addressRegion: "",
  addressCountry: "",
  paymentCardNumber: "",
  paymentCardOwnerName: "",
  paymentCardCVV: "",
  paymentCardExpirationDate: ""
}

export const PRODUCTS_CATEGORIES = {
  FOOD: "Food",
  HYGIENE: "Hygiene",
  FURNITURE: "Furniture",
  ACCESORIES: "Accesories",
  OTHERS: "Others"
}

export const PRODUCTS_CATEGORIES_ARRAY = ["Food", "Hygiene", "Furniture", "Accesories", "Others"]

// url routes

export const ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SHOPPING_CART: "/shopping-cart",
  MY_ORDERS: "/my-orders",
  PRODUCT: "/product",
  PRODUCTS_CATEGORY: "/products/category",
  PAYMENTS: "/payment"
}

export const PRODUCT_AMOUNT_CHANGE_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE"
}

//store related constants

export const userSliceInitialValue = {
  username: "",
  password: "",
  phoneNumber: "",
  national: "",
  token: ""
}

//query related constants

export const FETCH_HEADERS = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Credentials" : true
}

export const FETCH_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE"
}

export const initialLoadingOverlayValue = {active: false}


//development base endpoint
/* export const BASE_ENDPOINT = "http://localhost:8080/api" */

//production base endpoint

export const BASE_ENDPOINT = "https://pet-commerce-back.fly.dev/api"

export const AUTH_REQUIRED_PAGES = ["/dashboard", "/profile", "/my-orders", "/shopping-cart", "/product"]
export const NO_AUTH_REQUIRED_PAGES = ["/login", "sign-up"]