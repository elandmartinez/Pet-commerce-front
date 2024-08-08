"use client"

const { createSlice } = require("@reduxjs/toolkit")

const orderSlice = createSlice({
  initialState: [],
  name: "orders",
  reducers: {
    updateOrders: (state, action) => {
      console.log({state, action})
      return [
        ...state,
        ...action.payload
      ]
    },
    cleanOrders: () => {
        return []
    }
  }
})

export const { updateOrders, cleanOrders } = orderSlice.actions
export default orderSlice.reducer