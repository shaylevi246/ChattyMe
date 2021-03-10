import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authRegister from "../components/Auth/registerSlicer";
import authLogin from "../components/Auth/loginSlicer";
import chatroom from "../components/Chat/chatSlicer";

const reducer = combineReducers({
  //here we will add the reducers
  authRegister,
  authLogin,
  chatroom,
});

const store = configureStore({
  reducer,
});

export default store;
