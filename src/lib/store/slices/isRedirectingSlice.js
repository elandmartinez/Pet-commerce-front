const { createSlice } = require("@reduxjs/toolkit");


const isRedirectingSlice = createSlice({
  name: "isRedirecting",
  initialState: false,
  reducers: {
    updateIsRedirecting: (state, action) => {
      return action.payload
    }
  }
})

export const { updateIsRedirecting } = isRedirectingSlice.actions

export default isRedirectingSlice.reducer