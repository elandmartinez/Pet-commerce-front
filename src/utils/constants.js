"use client"

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
  PRODUCTS_CATEGORY: "/products/category"
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

export const BASE_ENDPOINT = "http://localhost:8080/api"

export const AUTH_REQUIRED_PAGES = ["/dashboard", "/profile", "/my-orders", "/shopping-cart", "/product"]
export const NO_AUTH_REQUIRED_PAGES = ["/login", "sign-up"]