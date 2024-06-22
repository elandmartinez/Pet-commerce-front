"use client"

import { userSliceInitialValue } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: userSliceInitialValue,
  reducers: {
    updateUser: (userState, action) => {
      console.log({userState})
      /* userState.username = action.payload.username;
      userState.password = action.payload.password;
      userState.token = action.payload.token; */
      console.log("updating user", {state: userState, action})

      return {
        ...action.payload
      }
    },
  }
});

export const { updateUser } = userSlice.actions

export default userSlice.reducer