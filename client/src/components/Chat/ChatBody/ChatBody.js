import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./ChatBody.css";
import { chatRoomsSelector } from "../chatSlicer";
import { useSelector } from "react-redux";

const ChatBody = () => {
  const { chatroom, chatrooms } = useSelector(chatRoomsSelector);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    setText("");
  };
  return (
    <div className="chatBody">
      <div className="chatBodyHeader">
        <Avatar />
        <div className="chatBodyHeaderInfo">
          <h3>{chatroom ? chatroom.name : "Please choose a chatroom"}</h3>
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
        <p className="chatMessage">
          <span className="chatMessageName">Shay Levi</span>
          hi everyone
          <span className="chatBodyMiddleTimeStamp">3:53</span>
        </p>
        {/* ********* */}
        <p className="chatMessage sender">
          <span className="chatMessageName">Ortal Levi</span>
          blue blue
          <span className="chatBodyMiddleTimeStamp">3:53</span>
        </p>
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
        {/* <div className="chatBodyFooterInsert"> */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => handleChange(e)}
            // onFocus={(e) => (e.target.placeholder = "")}
            // onBlur={(e) => (e.target.placeholder = "Type a message")}
          />
          <button type="submit"></button>
        </form>
        {/* </div> */}
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
