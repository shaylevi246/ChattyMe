import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  token: null,
  isAuth: false,
  isLoading: true,
  //errors: "",
};

const registerSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      //state.user =action.payload;
      state.isAuth = true;
      state.isLoading = false;
      //state.errors = "";
      state.token = action.payload.token;
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.isLoading = false;
      state.token = null;
      //state.errors = action.payload;
    },
  },
});

export default registerSlice.reducer;

//Actions
const { registerSuccess, registerFail } = registerSlice.actions;
export const register = ({ firstName, lastName, email, password }) => async (
  dispatch
) => {
  const body = JSON.stringify({ firstName, lastName, email, password });
  try {
    const res = await api.post("user/register", body);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    //return dispatch(registerFail(err.message));
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch(registerFail());
  }
};
