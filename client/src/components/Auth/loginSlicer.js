import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  isAuth: false,
  isLoading: true,
  user: null,
  token: localStorage.getItem("token"),
};

const loginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.token = localStorage.setItem("token", action.payload.token);
      state.user = null;
    },
    loginFail: (state, action) => {
      state.isAuth = false;
      state.isLoading = true;
      state.user = null;
      state.token = localStorage.removeItem("token");
    },
    userLoaded: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.token = localStorage.getItem("token");
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

export const addAvatar = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/user/avatar", formData);
    dispatch(userLoaded(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
export const logout = () => async (dispatch) => {
  dispatch(loginFail());
};
