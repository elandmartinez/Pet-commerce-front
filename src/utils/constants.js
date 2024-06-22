"use client"

import SignUp from "@/app/sign-up/page"

export const LOGIN_FORM_INITAL_VALUES = {
  email: "",
  password: ""
}

export const SIGN_UP_FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  repeat_password: ""
}

// url routes

export const ROUTES = {
  LOGIN: "/loging",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SHOPPING_CART: "/shopping-cart",
  MY_SHOPPINGS: "/my-shoppings"
}


//store related constants

export const userSliceInitialValue = {
  username: "",
  password: "",
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

export const NO_AUTH_REQUIRED_PAGES = ['/login', '/sign-up']