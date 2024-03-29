import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { Fragment } from "react";
import { findChatroomById } from "../chatSlicer";
import { useDispatch } from "react-redux";

const SidebarChat = ({ name, id, lastMessage, avatar }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(findChatroomById(id));
  };
  return (
    <Fragment>
      <div className="sidebarChat" onClick={(e) => handleClick(e)}>
        {avatar ? <Avatar src={avatar} /> : <Avatar />}
        <div className="sidebarChatInfo">
          <h3>{name}</h3>
          <p>{lastMessage ? lastMessage.text : "last message..."}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default SidebarChat;
