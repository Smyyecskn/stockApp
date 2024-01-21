import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  loading: false,
  error: false,
  token: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user.username;
      state.token = payload.token;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state.user = payload.data.username;
      state.password = payload.data.password;
      state.email = payload.data.email;
      state.firstName = payload.data.firstName;
      state.lastName = payload.data.lastName;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, loginSuccess, fetchFail, registerSuccess } =
  authSlice.actions;
export default authSlice.reducer;
