import React, { useEffect } from "react";
import "./ChatBody.css";
import { loadUser, loginSelector } from "../../Auth/loginSlicer";
import { useDispatch, useSelector } from "react-redux";

const Message = ({
  messageUserId,
  messageUserFirstName,
  messageUserLastName,
  messageTime,
  message,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(loginSelector);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(loadUser());
    }
  }, [loadUser]);
  return (
    <div>
      {messageUserId === user._id ? (
        <p className="chatMessage sender">
          <span className="chatMessageName">
            {messageUserFirstName + " " + messageUserLastName}
          </span>
          {message}
          <span className="chatBodyMiddleTimeStamp">{messageTime}</span>
        </p>
      ) : (
        <p className="chatMessage">
          <span className="chatMessageName">
            {messageUserFirstName + " " + messageUserLastName}
          </span>
          {message}
          <span className="chatBodyMiddleTimeStamp">{messageTime}</span>
        </p>
      )}
    </div>
  );
};

export default Message;
