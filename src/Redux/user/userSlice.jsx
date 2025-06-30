import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;
