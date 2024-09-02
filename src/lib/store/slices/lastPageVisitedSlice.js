"use client"

const { createSlice } = require("@reduxjs/toolkit")

const lastPageVisitedSlice = createSlice({
  initialState: "/",
  name: "lastPageVisited",
  reducers: {
    updateLastPageVisited: (state, action) => {
      return action.payload
    }
  }
})

export const { updateLastPageVisited } = lastPageVisitedSlice.actions

export default lastPageVisitedSlice.reducer