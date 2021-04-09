import React, { useEffect, useState } from "react";
import "./Message.css";
import { loadUser, loginSelector } from "../../Auth/loginSlicer";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Modal from "react-modal";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import download from "downloadjs";

const customStyles = {
  content: {
    zIndex: 1500,
    width: "60vw",
    height: "90vh",
    backgroundColor: "white",
    margin: "40px auto",
    border: "2px solid black",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

Modal.setAppElement("#root");

const Message = ({
  messageUserId,
  messageUserFirstName,
  messageUserLastName,
  messageTime,
  messageText,
  messageImage,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(loginSelector);
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (user === null) {
      if (localStorage.getItem("token") !== null) {
        dispatch(loadUser());
      }
    }
  }, [dispatch, user]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const downloadImage = (file) => {
    download(file);
    setIsOpen(false);
  };
  return (
    <div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
      >
        <IconButton
          onClick={closeModal}
          color="primary"
          style={{ position: "absolute", top: "0", left: "0" }}
        >
          <CancelIcon />
        </IconButton>
        <img className="displayImage" src={messageImage} alt="" />
        <Button
          variant="contained"
          color="primary"
          style={{
            position: "absolute",
            bottom: "10px",
          }}
          download
          onClick={() => downloadImage(messageImage)}
        >
          Download
        </Button>
      </Modal>
      {messageUserId === user._id ? (
        <div className="chatMessage sender">
          <span className="chatMessageName">
            {messageUserFirstName + " " + messageUserLastName}
          </span>
          {messageText ? (
            <div>
              {messageText}
              <span className="chatBodyMiddleTimeStamp">
                <Moment format="hh:mm">{messageTime}</Moment>{" "}
              </span>
            </div>
          ) : (
            <div className="imageMessage">
              <img
                className="imageContainer"
                src={messageImage}
                alt=""
                onClick={openModal}
              />
              <span className="timeStamp">
                <Moment format="hh:mm">{messageTime}</Moment>{" "}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="chatMessage">
          <span className="chatMessageName">
            {messageUserFirstName + " " + messageUserLastName}
          </span>
          {messageText ? (
            <div>
              {messageText}
              <span className="chatBodyMiddleTimeStamp">
                <Moment format="hh:mm">{messageTime}</Moment>{" "}
              </span>
            </div>
          ) : (
            <div className="imageMessage">
              <img
                className="imageContainer"
                src={messageImage}
                alt=""
                onClick={openModal}
              />
              <span className="timeStamp">
                <Moment format="hh:mm">{messageTime}</Moment>{" "}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
