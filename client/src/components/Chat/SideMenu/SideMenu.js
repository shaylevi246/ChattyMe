import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatroom,
  chatRoomsSelector,
  getAllUsers,
  sendCroppedImg,
} from "../chatSlicer";
import "../Sidebar/Sidebar.css";
import { Fragment } from "react";
import Modal from "react-modal";

import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSelector } from "../../Auth/loginSlicer";
import CropperImg from "../ImageCropper/CropperImg";
import { dataURLtoFile } from "../ImageCropper/dataURLtoFile";
toast.configure();

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

const SideMenu = (props) => {
  const from = "chatroom";
  const dispatch = useDispatch();
  const { user } = useSelector(loginSelector);
  const { allUsers, chatrooms, chatroom, croppedImage } = useSelector(
    chatRoomsSelector
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, [getAllUsers]);
  const allUsersButMe = allUsers.filter((me) => me._id !== user._id);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const formData = new FormData();
  useEffect(() => {
    if (croppedImage !== null) {
      setGroupImage(croppedImage);
    }
  }, [croppedImage]);

  const door = false;
  let roomNameExists = false;
  const handleToggle = (pUser) => () => {
    const currentIndex = checked.indexOf(pUser);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(pUser);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = () => {
    chatrooms.map((room) => {
      if (room.name === roomName) {
        roomNameExists = true;
      }
    });
    if (!roomName || checked.length === 0 || roomNameExists === true) {
      if (!roomName) {
        toast.error("Room name cannot be empty!");
      } else if (checked.length === 0) {
        toast.error("Must choose at least one participants");
      } else if (roomNameExists === true) {
        toast.error("Sorry, the name for this room is already in use");
      }
    } else {
      const convertedUrlToFile = dataURLtoFile(groupImage, "croppedImage.jpeg");

      const formData = new FormData();
      formData.append("avatar", convertedUrlToFile);
      formData.append("roomName", JSON.stringify(roomName));
      formData.append("checked", JSON.stringify(checked));

      dispatch(addChatroom(formData));
      setChecked([]);
      setRoomName("");
      dispatch(sendCroppedImg(null));
      setGroupImage(null);
      roomNameExists = false;
    }
  };

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
      <div className="participantTitle">
        <IconButton
          onClick={() => {
            dispatch(sendCroppedImg(null));
            props.drawer(door);
          }}
          className="backButton"
        >
          <ArrowBackIcon />
        </IconButton>
        <h2>Create a new room</h2>
      </div>
      <input
        type="text"
        placeholder="Please enter the room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button
        className="createRoomButton"
        onClick={() => {
          handleClick();
          return props.drawer(door);
        }}
      >
        Create Room
      </button>
      <div className="addingGroupAvatar">
        <button onClick={openModal} className="createRoomButton">
          Add Group Icon
        </button>

        {groupImage ? (
          <Avatar
            style={{ width: "100px", height: "100px", objectFit: "fit" }}
            src={groupImage}
            alt=""
          />
        ) : (
          <Avatar style={{ width: "100px", height: "100px" }} />
        )}
      </div>
      <div className="participantTitle">
        <h2>Participants</h2>
      </div>
      <List>
        {allUsersButMe.map((pUser) => {
          const labelId = `checkbox-list-label-${pUser._id}`;

          return (
            <ListItem
              className="listItem"
              key={pUser._id}
              role={undefined}
              dense
              button
              onClick={handleToggle(pUser)}
            >
              <ListItemIcon>
                {pUser !== null ? (
                  <Avatar src={`${pUser.avatar}`} />
                ) : (
                  <Avatar />
                )}
              </ListItemIcon>
              <ListItemText
                id={pUser._id}
                primary={pUser.firstName + " " + pUser.lastName}
              />
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  checked={checked.indexOf(pUser) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};

export default SideMenu;
