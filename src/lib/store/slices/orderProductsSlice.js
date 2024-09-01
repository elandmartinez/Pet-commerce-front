"use client"

const { createSlice } = require("@reduxjs/toolkit")

// makes this slice have also the product amount that is being bought

const orderProductsSlice = createSlice({
  name: "orderProducts",
  initialState: [],
  reducers: {
    udpdateOrderProducts: (products, action) => {
      return [...action.payload]  
    },
    cleanOrderProducts: (state, action) => {
      return []
    }
  }
})

export const { udpdateOrderProducts, cleanOrderProducts } = orderProductsSlice.actions;

export default orderProductsSlice.reducer;