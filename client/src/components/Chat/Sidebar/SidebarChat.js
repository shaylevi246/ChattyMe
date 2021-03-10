import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./SidebarChat.css";
import { Fragment } from "react";
import { findChatroomById } from "../chatSlicer";
import { useDispatch } from "react-redux";

const SidebarChat = ({ name, id }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(findChatroomById(id));
  };
  return (
    <Fragment>
      <div className="sidebarChat" onClick={(e) => handleClick(e)}>
        <Avatar />
        <div className="sidebarChatInfo">
          <h3>{name}</h3>
          <p>last message...</p>
        </div>
      </div>
    </Fragment>
  );
};

export default SidebarChat;
