import { createSlice } from "@reduxjs/toolkit";

// Function to safely parse JSON
const safeJSONParse = (item, fallback) => {
  if (item === null || item === undefined) {
    return fallback;
  }
  try {
    return JSON.parse(item) || fallback;
  } catch (e) {
    console.error("JSON parse error:", e);
    return fallback;
  }
};

// Safe parsing of 'name' from localStorage
const name = safeJSONParse(localStorage.getItem("name"), "");

const initialState = {
  isLoggedIn: false,
  name: name,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user = { ...state.user, ...profile };
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;