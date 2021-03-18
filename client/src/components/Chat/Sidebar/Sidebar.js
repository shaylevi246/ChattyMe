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
import { Fragment } from "react";
import { addAvatar, loadUser, loginSelector } from "../../Auth/loginSlicer";
import SideMenu from "../SideMenu/SideMenu";
import _ from "lodash";

function Sidebar() {
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

  const handleAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    dispatch(addAvatar(formData));
  };

  return (
    <Fragment>
      <div>
        <Drawer
          className="drawer"
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
        >
          <SideMenu drawer={(door) => setState(door)} />
        </Drawer>
      </div>
      <div className="sidebar">
        <div className="sidebarHeader">
          <IconButton>
            <span>
              {user !== null ? <Avatar src={`${user.avatar}`} /> : <Avatar />}
            </span>
            <input
              id="avatarInput"
              className="avatarInput"
              onChange={(e) => handleAvatar(e)}
              name="avatarPhoto"
              type="file"
              accept=".png, .jpg, .jpeg"
              encType="multipart/form-data"
            />
          </IconButton>

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
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;
