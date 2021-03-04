import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authRegister from "../components/Auth/registerSlicer";
import authLogin from "../components/Auth/loginSlicer";

const reducer = combineReducers({
  //here we will add the reducers
  authRegister,
  authLogin,
});

const store = configureStore({
  reducer,
});

export default store;
