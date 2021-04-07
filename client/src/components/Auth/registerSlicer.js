import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  token: null,
  isAuth: false,
  isLoading: true,
};

const registerSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      state.isAuth = true;
      state.isLoading = false;

      state.token = action.payload.token;
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.isLoading = false;
      state.token = null;
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
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch(registerFail());
  }
};
