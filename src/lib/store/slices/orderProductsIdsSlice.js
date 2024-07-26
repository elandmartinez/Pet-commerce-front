"use client"

const { createSlice } = require("@reduxjs/toolkit")

const orderProductsIdsSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    udpdateOrderProductIds: (state, action) => {
      return [...action.payload]
    },
    cleanOrderProductsIds: (state, action) => {
      return []
    }
  }
})

export const { udpdateOrderProductIds, cleanOrderProductsIds } = orderProductsIdsSlice.actions;

export default orderProductsIdsSlice.reducer;