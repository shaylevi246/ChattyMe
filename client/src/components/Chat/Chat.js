import React, { Fragment } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatBody from "./ChatBody/ChatBody";
import "./Chat.css";

const Chat = () => {
  return (
    <Fragment>
      <div className="chat">
        <Sidebar />
        <ChatBody />
      </div>
    </Fragment>
  );
};

export default Chat;
