import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./ChatBody.css";
import {
  addMessage,
  chatRoomsSelector,
  getChatrooms,
  addImageMessage,
} from "../chatSlicer";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

toast.configure();

const getTime = (first, now) => {
  const begin = parseInt(first);
  const end = parseInt(now);
  const adjustBegin = Math.ceil(begin / 86400000);
  const adjustEnd = Math.ceil(end / 86400000);
  const totalDays = adjustEnd - adjustBegin;
  switch (totalDays) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    case 2:
    case 3:
    case 4:
    case 5:
      return new Date(begin).toString().substring(0, 15); //need to change to full day

    default:
      return new Date(begin).toString().substring(0, 15);
  }
};

const ChatBody = () => {
  const { chatroom } = useSelector(chatRoomsSelector);
  const dispatch = useDispatch();

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
        inline: "nearest",
      });
    }
  });

  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatroom && text) {
      dispatch(addMessage({ chatroom, text }));

      dispatch(getChatrooms());
    } else if (!chatroom) {
      toast.error(
        "Please choose or create a chatroom before you use this function"
      );
    } else {
      toast.error("Sorry, you cannot send an empty message");
    }

    setText("");
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    dispatch(addImageMessage(chatroom, formData));
    dispatch(getChatrooms());
  };
  return (
    <Fragment>
      <div className="chatBody">
        <div className="chatBodyHeader">
          {chatroom && chatroom.avatar ? (
            <Avatar src={chatroom.avatar} />
          ) : (
            <Avatar />
          )}
          <div className="chatBodyHeaderInfo">
            <h3>
              {chatroom ? chatroom.name : "Please choose or create a chatroom"}
            </h3>
            <div className={"participantList"}>
              {chatroom &&
                chatroom.participants.map((pUser, index) => (
                  <p key={index}>{pUser.firstName + " " + pUser.lastName}</p>
                ))}
            </div>
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
            chatroom.messages.map((msg) =>
              msg.messageDate ? (
                <div key={uuidv4()}>
                  <div key={uuidv4()} className="dateContainer">
                    {getTime(msg.messageDate, new Date().getTime().toString())}
                  </div>
                  <Message
                    key={msg._id}
                    messageUserId={msg.user}
                    messageUserFirstName={msg.firstName}
                    messageUserLastName={msg.lastName}
                    messageTime={msg.date}
                    messageText={msg.text}
                    messageImage={msg.image}
                  />
                </div>
              ) : (
                <Message
                  key={msg._id}
                  messageUserId={msg.user}
                  messageUserFirstName={msg.firstName}
                  messageUserLastName={msg.lastName}
                  messageTime={msg.date}
                  messageText={msg.text}
                  messageImage={msg.image}
                />
              )
            )
          )}
          <div>
            <p ref={messageRef}></p>
          </div>
        </div>

        <div className="chatBodyFooter">
          <div className="chatBodyFooterLeft">
            <IconButton>
              <InsertEmoticonIcon />
            </IconButton>
            <div>
              <input
                // onChange={(e) => handleImageChange(e)}
                onChange={(e) => handleSubmitImage(e)}
                accept="image/*"
                id="button-file"
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  // onClick={(e) => handleSubmitImage(e)}
                >
                  <AttachFileIcon />
                </IconButton>
              </label>
            </div>
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
    </Fragment>
  );
};

export default ChatBody;
