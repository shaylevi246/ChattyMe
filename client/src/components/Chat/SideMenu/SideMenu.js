import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom, chatRoomsSelector, getAllUsers } from "../chatSlicer";
import "../Sidebar/SidebarChat.css";
import { Fragment } from "react";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSelector } from "../../Auth/loginSlicer";
toast.configure();

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(loginSelector);
  const { allUsers, chatrooms, chatroom } = useSelector(chatRoomsSelector);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [getAllUsers]);
  const allUsersButMe = allUsers.filter((me) => me._id !== user._id);

  const [checked, setChecked] = useState([]);
  const [roomName, setRoomName] = useState("");

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
      //   const newChecked = [...checked];
      //   newChecked.push(mainUser);
      //   setChecked(newChecked);
      //   console.log(checked);

      dispatch(addChatroom({ roomName, checked }));
      setChecked([]);
      setRoomName("");
      roomNameExists = false;
    }
  };
  return (
    <Fragment>
      <div className="participantTitle">
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
