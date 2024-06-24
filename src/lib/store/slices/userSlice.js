"use client"

import { userSliceInitialValue } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: userSliceInitialValue,
  reducers: {
    updateUser: (userState, action) => {
      return {
        ...action.payload
      }
    },
  }
});

export const { updateUser } = userSlice.actions

export default userSlice.reducer