import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  isAuth: false,
  isLoading: true,
  // token: null,
  user: null,
  // isAuth: localStorage.getItem("isAuth"),
  // isLoading: localStorage.getItem("isLoading"),
  token: localStorage.getItem("token"),
  // user: localStorage.getItem("user"),
};

const loginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // localStorage.setItem("token", action.payload.token);
      state.isAuth = true;
      // state.isAuth = localStorage.setItem("isAuth", true);
      state.isLoading = false;
      //state.isLoading = localStorage.setItem("isLoading", false);

      state.token = localStorage.setItem("token", action.payload.token);
      // state.user = null;
      state.user = null;
    },
    loginFail: (state, action) => {
      // localStorage.removeItem("token");
      state.isAuth = false;
      state.isLoading = false;
      // state.token = null;
      state.user = null;

      // state.isAuth = localStorage.setItem("isAuth", false);
      // state.isLoading = localStorage.setItem("isLoading", false);
      state.token = localStorage.removeItem("token");
      // state.user = localStorage.removeItem("user");
    },
    userLoaded: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      // state.isAuth = localStorage.getItem("isAuth");
      // state.isLoading = localStorage.getItem("isLoading");
      state.token = localStorage.getItem("token");
      // state.user = localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const loginSelector = (state) => state.authLogin;

//Actions

const { loginSuccess, loginFail, userLoaded } = loginSlice.actions;

export const login = ({ email, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post("/user/login", body);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch(loginFail());
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/user/auth");
    dispatch(userLoaded(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch(loginFail());
  }
};
