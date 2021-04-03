import React, { useRef, useEffect } from "react";
import "./ChatBody.css";
import { loadUser, loginSelector } from "../../Auth/loginSlicer";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

const Message = ({
  messageUserId,
  messageUserFirstName,
  messageUserLastName,
  messageTime,
  message,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(loginSelector);
  //   const messageRef = useRef();

  //   useEffect(() => {
  //     if (messageRef.current) {
  //       messageRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "end",
  //         inline: "nearest",
  //       });
  //     }
  //   });
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
          <span className="chatBodyMiddleTimeStamp">
            <Moment format="DD/MM/YYYY - hh:mm">{messageTime}</Moment>{" "}
          </span>
        </p>
      ) : (
        <p className="chatMessage">
          <span className="chatMessageName">
            {messageUserFirstName + " " + messageUserLastName}
          </span>
          {message}
          <span className="chatBodyMiddleTimeStamp">
            <Moment format="DD/MM/YYYY - hh:mm">{messageTime}</Moment>{" "}
          </span>
        </p>
      )}
    </div>
  );
};

export default Message;
