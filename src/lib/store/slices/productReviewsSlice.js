"use client"

const { createSlice } = require("@reduxjs/toolkit")

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: [],
  reducers: {
    updateProductReviews: (state, action) => {
      return [
        ...action.payload
      ]
    }
  }
})

export const { updateProductReviews } = productReviewsSlice.actions;

export default productReviewsSlice.reducer;