import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const initialState = {
  chatrooms: [],
  chatroom: null,
  loading: true,
};

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    getRooms: (state, action) => {
      state.chatrooms = action.payload;
      state.loading = false;
    },
    createChatroom: (state, action) => {
      state.chatrooms.push(action.payload);
      state.loading = false;
    },
    loadChatroom: (state, action) => {
      state.chatroom = action.payload;
      state.loading = false;
    },
  },
});
export default chatroomSlice.reducer;
export const chatRoomsSelector = (state) => state.chatroom;

//Actions
const { getRooms, createChatroom, loadChatroom } = chatroomSlice.actions;

export const getChatrooms = () => async (dispatch) => {
  try {
    const res = await api.get("/chat/chatrooms");
    dispatch(getRooms(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

export const addChatroom = ({ roomName }) => async (dispatch) => {
  const body = JSON.stringify({ roomName });
  //   console.log(body);
  try {
    const res = await api.post("/chat/chatroom", body);
    dispatch(createChatroom(res.data));
  } catch (err) {
    console.log(err.msg);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

export const findChatroomById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/chat/${id}`);
    dispatch(loadChatroom(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
