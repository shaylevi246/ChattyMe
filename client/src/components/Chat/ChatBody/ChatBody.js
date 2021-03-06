import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./ChatBody.css";
import { addMessage, chatRoomsSelector } from "../chatSlicer";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ChatBody = () => {
  const { chatroom } = useSelector(chatRoomsSelector);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatroom && text) {
      dispatch(addMessage({ chatroom, text }));
    } else if (!chatroom) {
      toast.error(
        "Please choose or create a chatroom before you use this function"
      );
    } else {
      toast.error("Sorry, you cannot send an empty message");
    }

    setText("");
  };
  return (
    <div className="chatBody">
      <div className="chatBodyHeader">
        <Avatar />
        <div className="chatBodyHeaderInfo">
          <h3>
            {chatroom ? chatroom.name : "Please choose or create a chatroom"}
          </h3>
          <p>chatroom participents</p>
        </div>
        <div className="chatBodyHeaderRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chatBodyMiddle">
        {!chatroom ? (
          <h2>Please choose or create a chatroom</h2>
        ) : (
          chatroom.messages.map((msg) => (
            <Message
              key={msg._id}
              messageUserId={msg.user}
              messageUserFirstName={msg.firstName}
              messageUserLastName={msg.lastName}
              messageTime={msg.date}
              message={msg.text}
            />
          ))
        )}
      </div>

      <div className="chatBodyFooter">
        <div className="chatBodyFooterLeft">
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit"></button>
        </form>

        <div className="chatBodyFooterRight">
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
