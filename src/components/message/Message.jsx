import React, { useContext, useEffect, useRef } from "react";
import "./Message.scss";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

    // Conversion de Firestore Timestamp en un objet JS de type date
    const date = message.date.toDate();

    // Formater l'objet Date en une chaîne lisible
    const timeString = `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <Avatar
          className="avatar"
          alt=""
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
        <span>{timeString}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
