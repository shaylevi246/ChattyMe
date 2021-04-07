import React, { useEffect } from "react";
import "./Message.css";
import { loadUser, loginSelector } from "../../Auth/loginSlicer";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

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
  useEffect(() => {
    if (user === null) {
      if (localStorage.getItem("token") !== null) {
        dispatch(loadUser());
      }
    }
  }, [dispatch, user]);
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <span className="chatBodyMiddleTimeStamp">
          <Moment format="DD/MM/YYYY">{messageTime}</Moment>{" "}
        </span>
      </div>
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
              <img className="imageContainer" src={messageImage} alt="" />
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
              <img className="imageContainer" src={messageImage} alt="" />
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
