import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const initialState = {
  allUsers: [],
  chatrooms: [],
  chatroom: null,
  loading: true,
  change: localStorage.getItem("change"),
  croppedImage: null,
};

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    getRooms: (state, action) => {
      state.chatrooms = action.payload;
      state.chatroom =
        state.chatroom === null ? state.chatrooms[0] : state.chatroom;
      state.loading = false;
      state.change = localStorage.setItem("change", false);
    },
    createChatroom: (state, action) => {
      state.chatrooms.push(action.payload);
      state.loading = false;
    },
    loadChatroom: (state, action) => {
      state.chatroom = action.payload;
      state.loading = false;
    },
    findAllUsers: (state, action) => {
      state.allUsers = action.payload;
      state.loading = false;
    },
    setCroppedImage: (state, action) => {
      state.croppedImage = action.payload;
    },
  },
});
export default chatroomSlice.reducer;
export const chatRoomsSelector = (state) => state.chatroom;

//Actions
const {
  getRooms,
  createChatroom,
  loadChatroom,
  findAllUsers,
  setCroppedImage,
} = chatroomSlice.actions;

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

export const addChatroomWithImage = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/chat/chatroom/avatar", formData);

    dispatch(createChatroom(res.data));
    localStorage.setItem("change", true);
  } catch (err) {
    console.log(err.msg);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
export const addChatroom = ({ roomName, checked }) => async (dispatch) => {
  const body = JSON.stringify({ roomName, checked });
  try {
    const res = await api.post("/chat/chatroom", body);

    dispatch(createChatroom(res.data));
    localStorage.setItem("change", true);
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

export const addMessage = ({ chatroom, text }) => async (dispatch) => {
  const body = JSON.stringify({ text });
  try {
    const res = await api.post(`/chat/message/${chatroom._id}`, body);
    dispatch(loadChatroom(res.data));
    localStorage.setItem("change", true);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
export const addImageMessage = (chatroom, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/chat/image/${chatroom._id}`, formData);
    dispatch(loadChatroom(res.data));
    localStorage.setItem("change", true);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await api.get("/user/users");
    dispatch(findAllUsers(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

export const sendCroppedImg = (img) => (dispatch) => {
  dispatch(setCroppedImage(img));
};
