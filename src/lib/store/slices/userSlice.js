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
    cleanUser: () => {
      return {}
    }
  }
});

export const { updateUser, cleanUser } = userSlice.actions

export default userSlice.reducer