import React, { useEffect, useState } from "react";
import { Avatar, Drawer, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import {
  getChatrooms,
  addChatroom,
  chatRoomsSelector,
  getAllUsers,
} from "../chatSlicer";
import { useDispatch, useSelector } from "react-redux";
import CropperImg from "../ImageCropper/CropperImg";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "react-modal";
import { Fragment } from "react";
import { addAvatar, loadUser, loginSelector } from "../../Auth/loginSlicer";
import SideMenu from "../SideMenu/SideMenu";
import _ from "lodash";

const customStyles = {
  content: {
    zIndex: 1500,
    width: "40vw",
    height: "80vh",
    backgroundColor: "white",
    margin: "40px auto",
    border: "2px solid black",
  },
};

Modal.setAppElement("#root");

function Sidebar() {
  const from = "userAvatar";
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(loadUser());
    }
  }, [loadUser]);
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (e) => {
    setState(open);
  };

  let { chatrooms } = useSelector(chatRoomsSelector);
  let { user } = useSelector(loginSelector);

  // const myOrderedArray = [...chatrooms].sort(
  //   (a, b) =>
  //     new Date(a.lastMessage.date).valueOf() >
  //     new Date(b.lastMessage.date).valueOf()
  // );

  // console.log(myOrderedArray);

  useEffect(() => {
    if (localStorage.getItem("change") !== false) {
      dispatch(getChatrooms());
    }
  }, [getChatrooms]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
      >
        <IconButton onClick={closeModal} color="primary">
          <CancelIcon />
        </IconButton>
        <CropperImg modal={(modalDoor) => setIsOpen(modalDoor)} from={from} />
      </Modal>
      <div>
        <Drawer
          className="drawer"
          style={{ zIndex: "500 !important" }}
          anchor={"left"}
          open={state}
        >
          <SideMenu drawer={(door) => setState(door)} />
        </Drawer>
      </div>
      <div className="sidebar">
        <div className="sidebarHeader">
          {/* <IconButton> */}
          <span onClick={openModal} className="avatarInput">
            {user !== null ? <Avatar src={`${user.avatar}`} /> : <Avatar />}
          </span>

          <div className="sidebarHeaderRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton onClick={toggleDrawer(true)}>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebarSearch">
          <div className="searchContainer">
            <SearchIcon />
            <input
              type="text"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "Search or start new chat")
              }
              placeholder="Search or start new chat"
            />
          </div>
        </div>
        <div className="sidebarChatRooms">
          {chatrooms &&
            chatrooms.map((room) => (
              <SidebarChat
                key={room._id}
                id={room._id}
                name={room.name}
                lastMessage={room.lastMessage}
                avatar={room.avatar}
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;
