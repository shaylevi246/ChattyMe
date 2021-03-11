import React, { useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { getChatrooms, addChatroom, chatRoomsSelector } from "../chatSlicer";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { loadUser } from "../../Auth/loginSlicer";

function Sidebar() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(loadUser());
    }
  }, [loadUser]);
  const { chatrooms } = useSelector(chatRoomsSelector);
  useEffect(() => {
    dispatch(getChatrooms());
  }, [getChatrooms]);
  const handleClick = (e) => {
    let roomName = prompt("Please enter a name for the chat room");

    if (roomName) {
      dispatch(addChatroom({ roomName }));
    }
  };
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebarHeader">
          <IconButton>
            <Avatar />
          </IconButton>

          <div className="sidebarHeaderRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton onClick={(e) => handleClick(e)}>
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
          {chatrooms.map((room) => (
            <SidebarChat key={room._id} id={room._id} name={room.name} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;
