"use client"

const { createSlice } = require("@reduxjs/toolkit")

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    udpdateOrders: (state, action) => {
      return [...action.payload]
    }
  }
})

export const { udpdateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;